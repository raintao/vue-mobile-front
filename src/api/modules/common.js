
import { post, get, getPoint } from '../http'

export default {
    // 数据字典
    getDict(data) {
        return get('/data_dict', data)
    },
    //埋点
    buryingPoint(data) {
        return getPoint('/add_event_log', data)
    }
}
