import env from 'src/env'
import storage from '../../unit/storage'
import * as deepExtend from 'deep-extend'

if (env.env !== 'deploy') {
    console.log('version:' + env.version)
}

export default deepExtend(env, {
    token: storage.get('token')
    
})