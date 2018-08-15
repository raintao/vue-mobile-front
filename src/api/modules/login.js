
import {post, get} from '../http'

export default {
    // 提交信息
    userLogin(data) {
        return post('/login', data)
    },

    // 退出登陆的时候把token取消
    userlogout(data) {
        return post('/logout', data)
    }
    
}
