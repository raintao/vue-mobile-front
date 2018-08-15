import base from './dev'

base.env = 'sit'

// 外网测试环境
base.api.host = 'http://test.com'      // sit
base.api.host_point = 'http://testpoint.com' //埋点

export default base
