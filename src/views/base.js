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
     * 日期转换 n 根据项目类型取 1 || 3
     * @param {date} val
     * @param {number} n
     */
    dateFormate(val, n) {  
        val = String(val).substr(0, 10).replace(/\-/g, "/")
        let s = new Date(val).getDay()
        let num = 0
        if(n == 3) {
            switch(s) {
                case 1: num = 3; break;
                case 2: num = 3; break;
                case 3: num = 5; break;
                case 4: num = 5; break;
                case 5: num = 5; break;
                case 6: num = 4; break;
                case 0: num = 3; break;
            }
        }else {
            switch(s) {
                case 1: num = 1; break;
                case 2: num = 1; break;
                case 3: num = 1; break;
                case 4: num = 1; break;
                case 5: num = 3; break;
                case 6: num = 2; break;
                case 0: num = 1; break;
            }
        }
       
        let endDate = new Date(val).getTime() + num*24*3600*1000
        let d = Math.ceil((endDate - new Date().getTime())/(24*3600*1000))
        let str = ''
        switch(d) {
            case 0: str = '今天'; break;
            case 1: str = '明天'; break;
            case 2: str = '后天'; break;
            default: 
                let dateStr = new Date(endDate);
                if(dateStr.getTime() < new Date().getTime()) {
                    str = '今天'
                }else {
                    str = (dateStr.getMonth() + 1) + '月' + dateStr.getDate() + '号'
                }
        }
        // console.log(val, d, str)
        return str
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
    
    //获取时间
    getNowTime() {
        var _this = this, date = {M:'',d:'',h:0,m:0,s:0,q:'',S:'',w:'',Y:''}, _date = new Date();
        date.Y = _date.getFullYear();   //年
        date.M = _date.getMonth()+1; //月份
        date.d = _date.getDate(); //日
        date.h = _date.getHours(); //小时
        date.m = _date.getMinutes(); //分
        date.s = _date.getSeconds(); //秒
        date.q = Math.floor((_date.getMonth()+3)/3); //季度
        date.S = _date.getMilliseconds(); //毫秒
        date.w = _date.getDay(); //获取当前星期X(0-6,0代表星期天)  
        date.w = date.w==0?'星期天':date.w==1?'星期一':date.w==2?'星期二':date.w==3?'星期三':date.w==4?'星期四':date.w==5?'星期五':'星期六'
        return date;
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

    /**
     * 获取风险级别和对应颜色
     * @param {number} lv
     * @returns {*} obj
     */
    getRiskLv(lv = 0) {
        let res = null
        if (!lv) return res
        let riskLv = this.mapToOptions(this.config.riskLv)
        riskLv.forEach(e => e.value = parseInt(e.value))
        riskLv.sort((a, b) => a.value - b.value)
        riskLv.forEach(e => {
            if (lv >= e.value) res = e
        })
        return this.config.riskLv['' + res.value]
    }
}
