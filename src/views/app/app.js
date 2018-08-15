import Vue from 'src/views/base'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'app',
    components: {
    }
})
export default class App extends Vue {
    transitionName = 'slide-right'
}