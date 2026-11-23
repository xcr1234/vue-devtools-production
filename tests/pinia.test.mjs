import assert from 'node:assert/strict'
import {test} from 'node:test'
import vm from 'node:vm'
import {build} from 'vite'

process.env.NODE_ENV = 'production'
const {createPinia, defineStore} = await import('pinia')
const {createApp, ref, computed} = await import('vue')

// Exercise the release bundle, including its real Devtools API registration.
const output = await build({logLevel: 'silent', build: {write: false}})
const bundle = [output].flat().flatMap(result => result.output)
    .find(file => file.type === 'chunk' && file.fileName === 'main.js')
const inspectorId = 'pinia-production'

function fixture(t, {registry = true} = {}) {
    const app = createApp({})
    const pinia = createPinia()
    app.use(pinia)
    const store = defineStore('app', {
        state: () => ({menu: true, count: 2, settings: {theme: 'light'}}),
        getters: {double: state => state.count * 2},
    })(pinia)
    const auth = defineStore('authStore', {state: () => ({userInfo: {name: 'test'}})})(pinia)
    if (!registry) delete pinia._s

    const handlers = {}
    const notifications = []
    let inspector
    let unmounted = false
    app.unmount = () => { unmounted = true }
    const hook = {
        emit(event, descriptor, setup) {
            if (event !== 'devtools-plugin:setup') return
            setup({
                addInspector(options) { inspector = options },
                sendInspectorTree(id) { notifications.push(['tree', id]) },
                sendInspectorState(id) { notifications.push(['state', id]) },
                on: new Proxy({}, {get: (_, event) => callback => { handlers[event] = callback }}),
            })
        },
    }
    const window = {app: {__vue_app__: app}, __VUE_DEVTOOLS_GLOBAL_HOOK__: hook}
    vm.runInNewContext(bundle.code, {window, self: window, top: window, navigator: {}, console: {log() {}}})
    t.after(() => {
        app.unmount()
        pinia._e.stop()
    })

    return {
        app, pinia, store, auth, handlers, notifications, inspector,
        get unmounted() { return unmounted },
        tree(filter = '') {
            const payload = {app, inspectorId, filter}
            handlers.getInspectorTree(payload)
            return payload.rootNodes
        },
        state(nodeId) {
            const payload = {app, inspectorId, nodeId}
            handlers.getInspectorState(payload)
            return payload.state
        },
        edit(nodeId, path, value, type = 'state') {
            handlers.editInspectorState({
                app, inspectorId, nodeId, path, type, state: {value},
                set(target, path, value) {
                    for (const key of path.slice(0, -1)) target = target[key]
                    target[path.at(-1)] = value
                },
            })
        },
    }
}

test('the release bundle contains neither Pinia nor Vue runtime modules', () => {
    const runtimeModules = Object.keys(bundle.modules).filter(id =>
        /\/node_modules\/(?:pinia|vue|vue-demi|@vue\/(?:reactivity|runtime-core|runtime-dom|shared))\//.test(id.replaceAll('\\', '/')))
    assert.deepEqual(runtimeModules, [])
})

test('production stores show root and individual state without debug metadata', t => {
    const f = fixture(t)
    assert.equal(f.store._customProperties, undefined)
    assert.equal(f.store._getters, undefined)
    assert.deepEqual(Array.from(f.tree(), node => node.id), ['_root', 'app', 'authStore'])
    assert.deepEqual(Array.from(f.tree('AUTH'), node => node.id), ['authStore'])
    assert.equal(f.state('_root').state.find(entry => entry.key === 'app').value, f.store.$state)
    assert.equal(f.state('app').state.find(entry => entry.key === 'menu').value, true)
    assert.equal(f.state('authStore').state.find(entry => entry.key === 'userInfo').value.name, 'test')
    assert.equal(f.state('missing'), undefined)
    assert.equal(f.store._customProperties, undefined)
})

test('single fields, nested fields and root edits update the existing page store', t => {
    const f = fixture(t)
    f.edit('app', ['menu'], false)
    f.edit('app', ['settings', 'theme'], 'dark')
    f.edit('_root', ['app', 'count'], 5)
    assert.equal(f.store.menu, false)
    assert.equal(f.store.settings.theme, 'dark')
    assert.equal(f.store.count, 5)
    assert.equal(f.store.double, 10)
    assert.equal(f.pinia.state.value.app.count, 5)
})

test('getters work in options and setup stores and a throwing getter stays isolated', t => {
    const f = fixture(t)
    const setup = defineStore('setup', () => {
        const count = ref(3)
        const double = computed(() => count.value * 2)
        const broken = computed(() => { throw new Error('getter failed') })
        return {count, double, broken}
    })(f.pinia)
    assert.equal(f.state('app').getters.find(entry => entry.key === 'double').value, 4)
    const state = f.state('setup')
    assert.equal(state.state.find(entry => entry.key === 'count').value, 3)
    assert.equal(state.getters.find(entry => entry.key === 'double').value, 6)
    assert.match(state.getters.find(entry => entry.key === 'broken').value, /getter failed/)
    f.edit('setup', ['double'], 99, 'getters')
    assert.equal(setup.double, 6)
})

test('optional plugin properties remain visible and editable', t => {
    const f = fixture(t)
    f.store._customProperties = new Set(['pluginValue'])
    f.store.pluginValue = 'before'
    assert.equal(f.state('app').customProperties[0].value, 'before')
    f.edit('app', ['pluginValue'], 'after', 'customProperties')
    assert.equal(f.store.pluginValue, 'after')
    f.edit('app', ['unregistered'], true, 'customProperties')
    assert.equal(f.store.unregistered, undefined)
})

test('store mutations and stores created later refresh the inspector', t => {
    const f = fixture(t)
    f.notifications.length = 0
    f.store.count++
    assert.ok(f.notifications.some(([event]) => event === 'state'))
    const late = defineStore('late', {state: () => ({ready: true})})(f.pinia)
    assert.ok(f.tree().some(node => node.id === 'late'))
    f.notifications.length = 0
    late.ready = false
    assert.ok(f.notifications.some(([event]) => event === 'state'))
    assert.equal(f.state('late').state[0].value, false)
})

test('state inspection and editing fall back to root state without a store registry', t => {
    const f = fixture(t, {registry: false})
    assert.equal(f.state('app').state.find(entry => entry.key === 'menu').value, true)
    f.edit('app', ['menu'], false)
    assert.equal(f.store.menu, false)
})

test('inspector hooks ignore unrelated apps and inspectors', t => {
    const f = fixture(t)
    for (const scope of [{app: {}, inspectorId}, {app: f.app, inspectorId: 'other'}]) {
        const payload = {...scope, nodeId: 'app', filter: ''}
        f.handlers.getInspectorTree(payload)
        f.handlers.getInspectorState(payload)
        f.handlers.editInspectorState({...payload, type: 'state', path: ['menu'], state: {value: false}, set() { assert.fail('unrelated edit') }})
        assert.equal(payload.rootNodes, undefined)
        assert.equal(payload.state, undefined)
    }
})

test('reset uses the page store and unmount stops subscriptions', t => {
    const f = fixture(t)
    f.store.count = 5
    f.inspector.nodeActions[0].action('app')
    assert.equal(f.store.count, 2)
    f.app.unmount()
    assert.equal(f.unmounted, true)
    f.notifications.length = 0
    f.store.count++
    assert.equal(f.notifications.length, 0)
    assert.equal(f.state('app'), undefined)
})
