import Vue from 'src/views/base'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { Store } from 'store/modules/login'


@Component({
    name: 'login',
    metaInfo: {
        title: '登录'
    },
    components: {

    }
})
export default class Login extends Vue {
    userName = ''
    passWord = ''

    @Store.action('setUserMsg') setUserMsg

    async submit() {
        let data = {
            login: this.userName,
            password: this.passWord
        }
        if (this.$route.query.token) {
            data = { token: this.$route.query.token }
        } else {
            if (!this.userName) {
                this.toastMsg('用户名不能为空')
                return         
            }
            if (this.passWord.length === 0) {
                this.toastMsg('密码为1-14位字符')
                return
            }
        }
        this.showLoading()
        try {
            // let resultData = await this.api.login.userLogin(data)
            let resultData = {
                token: '27b-2591-4c33-8c8a-fd8a8ad6da3d'
            }
            this.setUserMsg(resultData)
            this.hideLoading()
      
            let path = this.$route.query.redirect
            if (!path) path= '/demo'
            this.goTo(path)
        } catch(err) {
            console.log('err')  
            this.hideLoading()                   
        }
    }

    get allHeight() {
        return document.documentElement.clientHeight
    }

    initData() {
        var loginData = this.getUserMsg('loginMsg')
        if (loginData) {
            this.userName = loginData.login
            this.passWord = loginData.password
        }
    }

    // 约定放置于底部
    created() {
        // alert('login：' + window.location.href)
        this.initData()
        // app进入的时候有token就直接调取获取此人 账户信息
        if (this.$route.query.token) { 
            alert('存在token')
            this.submit() 
        }    
    }
}