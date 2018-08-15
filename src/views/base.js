import Vue from 'vue'
import api from 'api'
import config from 'common/config'
import { Toast, Indicator } from 'mint-ui'
import canvas from 'common/canvas'
import storage from 'src/unit/storage'


export default class Base extends Vue {
    api = api
    config = config
    canvas = canvas

    // 页面跳转
    goTo(options) {
        this.$router.push(options)
    }

    //提示信息 自动消失
    toastMsg(msg) {
        Toast({
          message: msg,
          position: 'middle',
          duration: 2500
        })
    }

    //加载等待
    async showLoading(msg = '加载中…') {
        await this.sleep(100)
        Indicator.open({
            text: msg,
            spinnerType: 'fading-circle'
        })
    }

    //加载等待关闭
    async hideLoading() {
        await this.sleep(100)
        Indicator.close()
    }

    // 获取用户信息 storage的存取
    getUserMsg(val) {
        return storage.get(val)
    }

    setUserMsg(val) {
        storage.set(val)
    }

    /**
     * 金额格式化 val  true表示以元为单位
     * @param {string} str
     * @param {boolean} val
     */
    moneyFormate(str, val) {
        if(str == 0) {
            return {
                unit: '万',
                money: '0.00'
            }

        }
        let resultObj = {}, plus = ''
        if(str < 0) {
            str = -str
            plus = '-'
        }
        if(str >= 10000 && !val) {
            resultObj.unit = "万"
            str = (str/10000).toFixed(2)
        }else {
            resultObj.unit = "元"
        }      
        str= String(str).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        // if(resultObj.unit == '万') {
        //     let a = str.indexOf('.')
        //     let i = a > -1 ? a  : str.length
        //     str = str.substr(0 , i + 3)
        // }
        resultObj.money = plus + str
        return resultObj
    }
    

    /**
     * 将 map 转换成 select 选项
     * @param {*} obj
     */
    mapToOptions(obj) {
        let res = []
        Object.keys(obj).forEach((key) => {
            res.push({
                value: String(key),
                label: obj[key]
            })
        })
        return res
    }

    /**
     * sleep 定时器
     * @param {number} time
     * @returns {Promise}
     */
    sleep(time = 0) {
        return new Promise((resolve) => {
            let timeId = setTimeout(function () {
                resolve(timeId)
            }, time)
        })
    }

}
