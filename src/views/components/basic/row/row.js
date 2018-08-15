/**
 * Row
 * @author LuoYongjiang <185832959@qq.com>
 * @date 2017-11-24 11:29:29
 * @since 1.0.0
 */

import Vue from 'src/views/base'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'components-basic-row'
})
export default class Row extends Vue {
    // type: flex
    @Prop({ default: '' })
    type
    // gutter: 
    @Prop({ default: '' })
    gutter
    // flex 布局下的水平排列方式
    // justify: start | center | end | space-between | space-around
    @Prop({ default: '' })
    justify
    // flex 布局下的垂直排列方式
    // align: top | middle | bottom
    @Prop({ default: '' })
    align

}
