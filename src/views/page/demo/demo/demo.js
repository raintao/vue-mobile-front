import Vue from 'src/views/base'
import { Component, Prop, Watch } from 'vue-property-decorator'

import storage from 'src/unit/storage'
import { Store } from 'store/modules/demo'

import NavHeader from 'components/navHeader'
import NavFooter from 'components/navFooter'

@Component({
    name: 'demo',
    metaInfo: {
        title: 'demo'
    },
    components: {
        NavHeader,
        NavFooter
    }
})
export default class Demo extends Vue {
    listLoading = false
    title = '头部组件'
    msg = '项目页'
    list = []
    txt = ''
    // 底部选项
    footerItem = [
        '底部选项1',
        '底部选项2',
        '底部选项3'
    ]
    storTest = ''

    set testTxt(txt) {
        this.txt = txt
    }
    get testTxt() {
        return this.txt + '-t'
    }


    // Store
    @Store.state('isLoading') isLoading
    @Store.action('getTmpList') getTmpList
    @Store.action('pageLoading') pageLoading


    // 改变标题
    changeTitle() {
        this.title = '标题已改变'
    }

    // 点击底部选项
    clickButtonItem(itemName) {
        console.log('点击选项：' + itemName)
    }

    // 改变加载中状态
    changeLoading() {
        this.pageLoading(true)
        let self = this;
        setTimeout(() => {
            self.pageLoading(false)
        }, 2000)
    }
    
    // 独立获取数据
    async getList(data) {
        this.listLoading = true;
        try {
            this.list = await this.api.demo.getList(data)
            console.log('列表加载成功!')
            this.listLoading = false
        } catch (err) {
            this.listLoading = false
        }
    }

    // storage test ------------------------
    // 写入storage
    setStorageTest() {
        storage.set('stoageTest', 'test')
        this.storTest = storage.get('stoageTest')
    }

    // 删除storage
    removeStorageTest() {
        storage.remove('stoageTest')
        if (!storage.get('stoageTest')) {
            this.storTest = ''
        }
    }

    // 监听信息
    @Watch('msg', { deep: true })
    changeMsg(val) {
        console.log(val)
    }

    // 约定放置于底部
    created() {
        console.log(this.isLoading)
        // this.getTmpList()
    }
}