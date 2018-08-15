/* 组件：底部 */
import Vue from 'src/views/base';
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'navFooter',
    components: {
    }
})
export default class NavFooter extends Vue {
    @Prop({
        default: [
            '选项1',
            '选项2',
            '选项3'
        ]
    })
    items

    //点击选项
    clickItem(item) {
        this.$emit('clickItem', item)
    }

    created() {
    }
}