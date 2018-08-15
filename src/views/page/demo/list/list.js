import Vue from 'src/views/base'
import { Component, Prop, Watch } from 'vue-property-decorator'

import NavHeader from 'components/navHeader'  // 引入头部组件
import NavFooter from 'components/navFooter'  // 引入底部组件

@Component({
    name: 'list',
    components: {
        NavHeader,
        NavFooter
    }
})
export default class List extends Vue {
    title = '列表页面'
    // 底部选项
    footerItem = [
        '底部选项1',
        '底部选项2',
        '底部选项3'
    ]

    created() {
        console.log(this.title)
    }
}