import {GmFunctions, RunAt, UserScript} from "./UserScript";
import build from "./build";

const script: UserScript = {
    name: 'Vue生产环境（production） Devtools 调试',
    namespace: 'https://github.com/xcr1234/vue-devtools-production',
    description: '使用本脚本支持直接调试生产环境的Vue项目 完美支持Vue2、Vue3！',
    version: '1.2.0',
    includes: [
        '*'
    ],
    runAt: RunAt.document_end,
    grants: "none"
}

build(script,'app_header.js')
