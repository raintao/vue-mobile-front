// dev config
export default {
    version: '1.0.0',
    env: 'dev',
    api: {
        host: 'http://192.168.1.20:5000',    // 内网环境(本机调试)
        host_point:'http://192.168.1.23:5060', //埋点
        secret: '',
        key: ''
    }
}
