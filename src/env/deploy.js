import base from './dev'

base.env = 'deploy'

// 正式环境 V1.0.0
base.api.host = 'http://deploy.com'      // sit
base.api.host_point = 'http://point.com'  //埋点



export default base
