import {GmFunctions, RunAt, UserScript} from "./UserScript";
import build from "./build";
import * as fs from 'fs'

//读取png图片为base64格式
const base64str = fs.readFileSync('header/Vue.png','base64')

const script: UserScript = {
    name: 'Vue生产环境（production） Devtools 调试',
    namespace: 'https://github.com/xcr1234/vue-devtools-production',
    homepage: 'https://github.com/xcr1234/vue-devtools-production',
    description: '使用本脚本支持直接调试生产环境的Vue项目 完美支持Vue2、Vue3！',
    icon: 'data:image/jpeg;base64,' + base64str,
    version: '1.2.1',
    includes: [
        '*'
    ],
    runAt: RunAt.document_end,
    grants: "none"
}

build(script,'app_header.js')
