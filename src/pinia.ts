import {setupDevtoolsPlugin} from '@vue/devtools-api'
import type {CustomInspectorState, PluginDescriptor} from '@vue/devtools-api'
import type {Vue3App} from './vue3'

type StoreState = Record<string, unknown>

interface PiniaStore {
    $state: StoreState
    $subscribe?(callback: () => void, options: {detached: boolean, flush: 'sync'}): () => void
    $reset?(): void
    _getters?: string[]
    _customProperties?: Set<string>
    [key: string]: unknown
}

export interface PiniaInstance {
    state: {value: Record<string, StoreState>}
    _s?: Map<string, PiniaStore>
    use?(plugin: (context: {store: PiniaStore}) => void): unknown
}

const INSPECTOR_ID = 'pinia-production'
const ROOT_ID = '_root'
const registrations = new WeakMap<PiniaInstance, () => void>()

const readValue = (store: PiniaStore, key: string): unknown => {
    try {
        return store[key]
    } catch (error) {
        return String(error)
    }
}

const getGetters = (store: PiniaStore) => {
    const keys = new Set(store._getters ?? [])
    // Production stores omit _getters. Descriptors expose computed refs without
    // importing Vue or evaluating every property on the store.
    for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(store))) {
        const value = descriptor.value
        if (value && typeof value === 'object' && value.__v_isRef === true && 'effect' in value) {
            keys.add(key)
        }
    }
    return Array.from(keys, key => ({key, editable: false, value: readValue(store, key)}))
}

/** Inspect the page's existing stores without loading a second Pinia/Vue runtime. */
export const registerPiniaDevtools = (app: Vue3App, pinia: PiniaInstance): (() => void) => {
    const registered = registrations.get(pinia)
    if (registered) return registered

    let disposed = false
    const subscriptions = new Map<PiniaStore, () => void>()
    const dispose = () => {
        disposed = true
        subscriptions.forEach(stop => stop())
        subscriptions.clear()
        registrations.delete(pinia)
    }
    registrations.set(pinia, dispose)

    setupDevtoolsPlugin<PluginDescriptor>({
        id: 'vue-devtools-production.pinia',
        label: 'Pinia',
        app,
        homepage: 'https://github.com/xcr1234/vue-devtools-production',
    }, api => {
        if (disposed) return

        const refresh = () => {
            if (disposed) return
            api.sendInspectorTree(INSPECTOR_ID)
            api.sendInspectorState(INSPECTOR_ID)
        }
        const subscribe = (store: PiniaStore) => {
            if (disposed || subscriptions.has(store) || !store.$subscribe) return
            subscriptions.set(store, store.$subscribe(refresh, {detached: true, flush: 'sync'}))
        }
        const syncStores = () => {
            const stores = new Set(pinia._s?.values())
            for (const [store, stop] of subscriptions) {
                if (!stores.has(store)) {
                    stop()
                    subscriptions.delete(store)
                }
            }
            stores.forEach(subscribe)
        }
        const storeIds = () => Array.from(new Set([
            ...Object.keys(pinia.state.value),
            ...(pinia._s?.keys() ?? []),
        ]))
        const storeState = (id: string) => pinia._s?.get(id)?.$state ?? pinia.state.value[id]

        api.addInspector({
            id: INSPECTOR_ID,
            label: 'Pinia',
            icon: 'storage',
            treeFilterPlaceholder: 'Search stores',
            nodeActions: [{
                icon: 'restore',
                tooltip: 'Reset this store',
                action: id => {
                    if (disposed || id === ROOT_ID) return
                    pinia._s?.get(id)?.$reset?.()
                    refresh()
                },
            }],
        })

        api.on.getInspectorTree(payload => {
            if (disposed || payload.app !== app || payload.inspectorId !== INSPECTOR_ID) return
            syncStores()
            const nodes = [
                {id: ROOT_ID, label: '🍍 Pinia (root)'},
                ...storeIds().map(id => ({id, label: id})),
            ]
            payload.rootNodes = nodes.filter(node => node.label.toLowerCase().includes(payload.filter.toLowerCase()))
        })

        api.on.getInspectorState(payload => {
            if (disposed || payload.app !== app || payload.inspectorId !== INSPECTOR_ID) return
            if (payload.nodeId === ROOT_ID) {
                payload.state = {
                    state: storeIds().map(id => ({key: id, editable: true, value: storeState(id)})),
                }
                return
            }

            const state = storeState(payload.nodeId)
            if (!state) return
            const result: CustomInspectorState = {
                state: Object.keys(state).map(key => ({key, editable: true, value: state[key]})),
            }
            const store = pinia._s?.get(payload.nodeId)
            if (store) {
                const getters = getGetters(store)
                if (getters.length) result.getters = getters
                if (store._customProperties?.size) {
                    result.customProperties = Array.from(store._customProperties, key => ({
                        key, editable: true, value: readValue(store, key),
                    }))
                }
            }
            payload.state = result
        })

        api.on.editInspectorState(payload => {
            if (disposed || payload.app !== app || payload.inspectorId !== INSPECTOR_ID) return
            let target: StoreState | undefined
            if (payload.nodeId === ROOT_ID && payload.type === 'state') {
                target = pinia.state.value
            } else if (payload.type === 'state') {
                target = storeState(payload.nodeId)
            } else if (payload.type === 'customProperties') {
                const store = pinia._s?.get(payload.nodeId)
                if (store?._customProperties?.has(payload.path[0])) target = store
            }
            if (target) {
                payload.set(target, payload.path, payload.state.value)
                refresh()
            }
        })

        syncStores()
        // Pinia's public plugin API also covers stores created after injection.
        pinia.use?.(({store}) => {
            if (disposed) return
            subscribe(store)
            refresh()
        })
    })
    return dispose
}
