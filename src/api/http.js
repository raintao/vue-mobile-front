import axios from 'axios'
import * as md5 from 'md5'
import stringify from 'qs/lib/stringify'
import config from 'common/config'
import storage from 'src/unit/storage'
import store from 'store'
import { Toast } from 'mint-ui'

const host = config.api.host  //全网ip
const host_point = config.api.host_point //埋点的ip

// build http header
function buildHeader(option) {
    let headers = {
        'X-Application-Key': config.api.key,
        'X-Request-Sign': '',
    }
    if (option) {
        headers = { ...headers, ...option }
    }
    return headers
}

function handleError (err) {
    // 如果是手动取消的请求，不显示错误信息
    if (axios.isCancel(err)) {
        console.log(err)
    } else {
        // 错误处理
        let msg = err || 'Unknow Error'
        if (('' + msg).indexOf('timeout') > -1) {
            msg = '加载超时！请检查你的网络设备'
            
        }
        Toast(msg)
        console.error(msg)
    }
}

function processData(apiData = {}) {
    let data = { ...apiData }
    let token = store.state.login.token
    if (!token) {
        return data
    }
    if (data instanceof FormData) {
        data.append('token', token)
    } else {
        data.token = token
    }
    return data
}

function transformResponse(data) {
    if (data) {
        if (data.code === 0) {
            let res = data.data
            return res
        } else if (data && (data.code === 2 || data.code === 3)) {
            // 登录过期
            Toast('登录过期，请重新登录')
            // 执行一次登出操作，清除登录信息
            store.dispatch('login/logout')
            throw new axios.Cancel('登录过期')
        } else if(data && data.code === 104) {
            return {approve: [], msg: data.msg}
        } else {
            let msg = data.msg || 'Unknow Error'
            throw new Error(msg)
        }
    } else {
        let msg = '未知错误'
        throw new Error(msg)
    }
}

function processFormData(formData = {}) {
    // let data = processData(formData)
    let data = formData
    let form = new FormData()
    // if (data.file) {
    //     data.file = formData.file
    // }
    Object.keys(data).forEach(k => {
        if (k === 'files') {
            for (let i in data[k]) {
                form.append(k + i, data[k][i])
            }
        } else {
            form.append(k, data[k])
        }
    })
    let token = store.state.login.token
    form.append('token', token)
    return form
}

// 上传form-data表格，用于带文件的上传
export let axForm = axios.create({
    baseURL: host,
    headers: buildHeader({ 'Content-Type': 'multipart/form-data' }),
    timeout: 10000,
    responseType: 'json',
    transformRequest: [function (data) {
        if (data instanceof FormData) return data
        return stringify(data)
    }],
    transformResponse: [function (data) {
        return transformResponse(data)
    }]
})

// http post form-data method
export function postFormData(url, data) {
    return axForm.post(url, processFormData(data))
        .then((res) => {
            return res.data
        }).catch((err) => {
            handleError(err)
            throw err
        })
}

export let ax = axios.create({
    baseURL: host,
    headers: buildHeader(),
    timeout: 10000,
    responseType: 'json',
    transformRequest: [function (data) {
        if (data instanceof FormData) return data
        return stringify(data)
    }],
    transformResponse: [function (data) {
       return transformResponse(data)
    }]
})

// http get method
export function get(url, data) {
    let newData = '?data=' + JSON.stringify(processData(data))
    return ax.get(decodeURI(url + newData))
    .then((res) => {
        return res.data
    }).catch((err) => {
        handleError(err)
        throw err
    })
}

// http post method
export function post(url, data) {
    return ax.post(url, {
        data: JSON.stringify(processData(data))
    })
    .then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
        handleError(err)
        throw err
    })
}

 function myBrowser() {
    let userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.indexOf('micromessenger') > -1) {
        return '微信端'
    } else if(userAgent.indexOf('mobile') > -1){
        return 'APP端'
    } else {
        return '浏览器端'
    }
}

let app_name = myBrowser()


//专为埋点
export function getPoint(url, data) {
    data.app_name = app_name
    data.uid =  store.state.login.userMsg.id
    let newData = '?data=' + JSON.stringify(processData(data))
    return axios.create({
        baseURL: host_point,
        headers: buildHeader(),
        timeout: 10000,
        responseType: 'json',
        transformRequest: [function (data) {
            if (data instanceof FormData) return data
            return stringify(data)
        }]
    }).get(decodeURI(url + newData))
    .then((res) => {
        return res.data
    }).catch((err) => {
        handleError(err)
        throw err
    })
}
