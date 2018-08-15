/**
 * Col
 * @author LuoYongjiang <185832959@qq.com>
 * @date 2017-11-24 11:34:32
 * @since 1.0.0
 */

import Vue from 'src/views/base'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'components-basic-col'
})
export default class Col extends Vue {
    // span：最大合计值为24
    @Prop({ default: 2 })
    span
    // align: left | center | right
    @Prop({ default: 'left' })
    align

    spanWidth = 4.16666667
}
