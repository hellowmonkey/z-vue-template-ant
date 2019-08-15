import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
import store from '../store'

Vue.prototype.$moment = moment
store.$moment = moment

export default moment
