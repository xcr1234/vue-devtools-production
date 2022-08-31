/**
 * 此文件是vue3 的vuex注册方式，是直接从vue源码里面复制过来的，并且把es6转成了es5
 * 源文件：
 * https://github.com/vuejs/vuex/blob/main/src/plugins/devtool.js
 * 我复制时的Git commit id:d0409cb
 * es6转es5工具： https://es6console.com/
 */
import {setupDevtoolsPlugin} from "@vue/devtools-api";

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}

function makeLocalGetters(store, namespace) {
    if (!store._makeLocalGettersCache[namespace]) {
        (function () {
            var gettersProxy = {};
            var splitPos = namespace.length;
            Object.keys(store.getters).forEach(function (type) {
                // skip if the target getter is not match this namespace
                if (type.slice(0, splitPos) !== namespace) return;

                // extract local getter type
                var localType = type.slice(splitPos);

                // Add a port to the getters proxy.
                // Define as getter property because
                // we do not want to evaluate the getters in this time.
                Object.defineProperty(gettersProxy, localType, {
                    get: function get() {
                        return store.getters[type];
                    },
                    enumerable: true
                });
            });
            store._makeLocalGettersCache[namespace] = gettersProxy;
        })();
    }

    return store._makeLocalGettersCache[namespace];
}

var LABEL_VUEX_BINDINGS = 'vuex bindings';
var MUTATIONS_LAYER_ID = 'vuex:mutations';
var ACTIONS_LAYER_ID = 'vuex:actions';
var INSPECTOR_ID = 'vuex';

var actionId = 0;

export function addDevtools(app, store) {
    setupDevtoolsPlugin({
        id: 'org.vuejs.vuex',
        app: app,
        label: 'Vuex',
        homepage: 'https://next.vuex.vuejs.org/',
        logo: 'https://vuejs.org/images/icons/favicon-96x96.png',
        packageName: 'vuex',
        componentStateTypes: [LABEL_VUEX_BINDINGS]
    }, function (api) {
        api.addTimelineLayer({
            id: MUTATIONS_LAYER_ID,
            label: 'Vuex Mutations',
            color: COLOR_LIME_500
        });

        api.addTimelineLayer({
            id: ACTIONS_LAYER_ID,
            label: 'Vuex Actions',
            color: COLOR_LIME_500
        });

        api.addInspector({
            id: INSPECTOR_ID,
            label: 'Vuex',
            icon: 'storage',
            treeFilterPlaceholder: 'Filter stores...'
        });

        api.on.getInspectorTree(function (payload) {
            if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
                if (payload.filter) {
                    var nodes = [];
                    flattenStoreForInspectorTree(nodes, store._modules.root, payload.filter, '');
                    payload.rootNodes = nodes;
                } else {
                    payload.rootNodes = [formatStoreForInspectorTree(store._modules.root, '')];
                }
            }
        });

        api.on.getInspectorState(function (payload) {
            if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
                var modulePath = payload.nodeId;
                makeLocalGetters(store, modulePath);
                payload.state = formatStoreForInspectorState(getStoreModule(store._modules, modulePath), modulePath === 'root' ? store.getters : store._makeLocalGettersCache, modulePath);
            }
        });

        api.on.editInspectorState(function (payload) {
            if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
                (function () {
                    var modulePath = payload.nodeId;
                    var path = payload.path;
                    if (modulePath !== 'root') {
                        path = [].concat(_toConsumableArray(modulePath.split('/').filter(Boolean)), _toConsumableArray(path));
                    }
                    store._withCommit(function () {
                        payload.set(store._state.data, path, payload.state.value);
                    });
                })();
            }
        });

        store.subscribe(function (mutation, state) {
            var data = {};

            if (mutation.payload) {
                data.payload = mutation.payload;
            }

            data.state = state;

            api.notifyComponentUpdate();
            api.sendInspectorTree(INSPECTOR_ID);
            api.sendInspectorState(INSPECTOR_ID);

            api.addTimelineEvent({
                layerId: MUTATIONS_LAYER_ID,
                event: {
                    time: Date.now(),
                    title: mutation.type,
                    data: data
                }
            });
        });

        store.subscribeAction({
            before: function before(action, state) {
                var data = {};
                if (action.payload) {
                    data.payload = action.payload;
                }
                action._id = actionId++;
                action._time = Date.now();
                data.state = state;

                api.addTimelineEvent({
                    layerId: ACTIONS_LAYER_ID,
                    event: {
                        time: action._time,
                        title: action.type,
                        groupId: action._id,
                        subtitle: 'start',
                        data: data
                    }
                });
            },
            after: function after(action, state) {
                var data = {};
                var duration = Date.now() - action._time;
                data.duration = {
                    _custom: {
                        type: 'duration',
                        display: duration + 'ms',
                        tooltip: 'Action duration',
                        value: duration
                    }
                };
                if (action.payload) {
                    data.payload = action.payload;
                }
                data.state = state;

                api.addTimelineEvent({
                    layerId: ACTIONS_LAYER_ID,
                    event: {
                        time: Date.now(),
                        title: action.type,
                        groupId: action._id,
                        subtitle: 'end',
                        data: data
                    }
                });
            }
        });
    });
}

// extracted from tailwind palette
var COLOR_LIME_500 = 0x84cc16;
var COLOR_DARK = 0x666666;
var COLOR_WHITE = 0xffffff;

var TAG_NAMESPACED = {
    label: 'namespaced',
    textColor: COLOR_WHITE,
    backgroundColor: COLOR_DARK
};

/**
 * @param {string} path
 */
function extractNameFromPath(path) {
    return path && path !== 'root' ? path.split('/').slice(-2, -1)[0] : 'Root';
}

/**
 * @param {*} module
 * @return {import('@vue/devtools-api').CustomInspectorNode}
 */
function formatStoreForInspectorTree(module, path) {
    return {
        id: path || 'root',
        // all modules end with a `/`, we want the last segment only
        // cart/ -> cart
        // nested/cart/ -> cart
        label: extractNameFromPath(path),
        tags: module.namespaced ? [TAG_NAMESPACED] : [],
        children: Object.keys(module._children).map(function (moduleName) {
            return formatStoreForInspectorTree(module._children[moduleName], path + moduleName + '/');
        })
    };
}

/**
 * @param {import('@vue/devtools-api').CustomInspectorNode[]} result
 * @param {*} module
 * @param {string} filter
 * @param {string} path
 */
function flattenStoreForInspectorTree(result, module, filter, path) {
    if (path.includes(filter)) {
        result.push({
            id: path || 'root',
            label: path.endsWith('/') ? path.slice(0, path.length - 1) : path || 'Root',
            tags: module.namespaced ? [TAG_NAMESPACED] : []
        });
    }
    Object.keys(module._children).forEach(function (moduleName) {
        flattenStoreForInspectorTree(result, module._children[moduleName], filter, path + moduleName + '/');
    });
}

/**
 * @param {*} module
 * @return {import('@vue/devtools-api').CustomInspectorState}
 */
function formatStoreForInspectorState(module, getters, path) {
    getters = path === 'root' ? getters : getters[path];
    var gettersKeys = Object.keys(getters);
    var storeState = {
        state: Object.keys(module.state).map(function (key) {
            return {
                key: key,
                editable: true,
                value: module.state[key]
            };
        })
    };

    if (gettersKeys.length) {
        (function () {
            var tree = transformPathsToObjectTree(getters);
            storeState.getters = Object.keys(tree).map(function (key) {
                return {
                    key: key.endsWith('/') ? extractNameFromPath(key) : key,
                    editable: false,
                    value: canThrow(function () {
                        return tree[key];
                    })
                };
            });
        })();
    }

    return storeState;
}

function transformPathsToObjectTree(getters) {
    var result = {};
    Object.keys(getters).forEach(function (key) {
        var path = key.split('/');
        if (path.length > 1) {
            (function () {
                var target = result;
                var leafKey = path.pop();
                path.forEach(function (p) {
                    if (!target[p]) {
                        target[p] = {
                            _custom: {
                                value: {},
                                display: p,
                                tooltip: 'Module',
                                abstract: true
                            }
                        };
                    }
                    target = target[p]._custom.value;
                });
                target[leafKey] = canThrow(function () {
                    return getters[key];
                });
            })();
        } else {
            result[key] = canThrow(function () {
                return getters[key];
            });
        }
    });
    return result;
}

function getStoreModule(moduleMap, path) {
    var names = path.split('/').filter(function (n) {
        return n;
    });
    return names.reduce(function (module, moduleName, i) {
        var child = module[moduleName];
        if (!child) {
            throw new Error('Missing module "' + moduleName + '" for path "' + path + '".');
        }
        return i === names.length - 1 ? child : child._children;
    }, path === 'root' ? moduleMap : moduleMap.root._children);
}

function canThrow(cb) {
    try {
        return cb();
    } catch (e) {
        return e;
    }
}
