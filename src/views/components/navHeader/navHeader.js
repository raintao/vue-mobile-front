/* 组件：头部 */
import Vue from 'src/views/base';
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'navHeader',
    components: {
    }
})
export default class NavHeader extends Vue {
    @Prop({ 
        default: '标题' 
    })
    title
    
}