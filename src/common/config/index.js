import env from 'src/env'
import storage from '../../unit/storage'
import * as deepExtend from 'deep-extend'

if (env.env !== 'deploy') {
    console.log('version:' + env.version)
}

export default deepExtend(env, {
    token: storage.get('token'),
    // 风险级别（项目列表筛选请求用）
    risks: {
        '6,7': '高危风险',
        '4,5': '高风险',
        '1,2,3': '一般风险'
    },
    // 风险级别（分级，以一个等级内的最低值为界限）
    riskLv: {
        '6': { name: '高危风险', color: '#DA1B1B' },
        '4': { name: '高风险', color: '#FF6000' },
        '1': { name: '一般风险', color: '#FFB600' }
    },
    // 工程类型排序
    contractTypeSort: {
        'project': 0,       // 工程
        'maintenance': 1,   // 维保
        'sale': 2,          // 销售
        'detection': 3,     // 检测
        'service': 4,       // 服务
    }
})