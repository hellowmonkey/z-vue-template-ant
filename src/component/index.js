import Vue from 'vue'
import store from '../store'

import {
    // Affix,
    // Anchor,
    // AutoComplete,
    Alert,
    // Avatar,
    // BackTop,
    Badge,
    // Breadcrumb,
    Button,
    // Calendar,
    Card,
    // Collapse,
    // Carousel,
    // Cascader,
    Checkbox,
    Col,
    DatePicker,
    // Divider,
    // Dropdown,
    Form,
    Icon,
    Input,
    // InputNumber,
    Layout,
    // List,
    LocaleProvider,
    message,
    Menu,
    Modal,
    notification,
    Pagination,
    Popconfirm,
    Popover,
    // Progress,
    Radio,
    Rate,
    Row,
    Select,
    // Slider,
    // Spin,
    // Steps,
    Switch,
    Table,
    Transfer,
    Tree,
    // TreeSelect,
    Tabs,
    Tag,
    // TimePicker,
    Timeline,
    Tooltip,
    // Mention,
    Upload,
    // version,
    // Drawer,
    // Skeleton,
    // Comment,
    ConfigProvider
} from 'ant-design-vue'
import VueImageSwipe from 'vue-image-swipe'

import MainBox from '../components/common/MainBox'
import TableBox from '../components/common/TableBox'
import Confirm from '../components/common/Confirm'
import Verify from '../components/common/Verify'
import CountUp from '../components/common/CountUp'

Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$loading = (msg = '数据加载中...') => {
    return message.loading(msg, 0)
}
store.$message = message
store.$error = Modal.error

/* v1.1.3+ registration methods */
// Vue.use(Affix)
// Vue.use(Anchor)
// Vue.use(AutoComplete)
Vue.use(Alert)
// Vue.use(Avatar)
// Vue.use(BackTop)
Vue.use(Badge)
// Vue.use(Breadcrumb)
Vue.use(Button)
// Vue.use(Calendar)
Vue.use(Card)
// Vue.use(Collapse)
// Vue.use(Carousel)
// Vue.use(Cascader)
Vue.use(Checkbox)
Vue.use(Col)
Vue.use(DatePicker)
// Vue.use(Divider)
// Vue.use(Drawer)
// Vue.use(Dropdown)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Input)
// Vue.use(InputNumber)
Vue.use(Layout)
// Vue.use(List)
Vue.use(LocaleProvider)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Pagination)
Vue.use(Popconfirm)
Vue.use(Popover)
// Vue.use(Progress)
Vue.use(Radio)
Vue.use(Rate)
Vue.use(Row)
Vue.use(Select)
// Vue.use(Slider)
// Vue.use(Spin)
// Vue.use(Steps)
Vue.use(Switch)
Vue.use(Table)
Vue.use(Transfer)
Vue.use(Tree)
// Vue.use(TreeSelect)
Vue.use(Tabs)
Vue.use(Tag)
// Vue.use(TimePicker)
Vue.use(Timeline)
Vue.use(Tooltip)
Vue.use(Upload)
// Vue.use(Skeleton)
// Vue.use(Comment)
Vue.use(ConfigProvider)

Vue.use(VueImageSwipe)

// const IconFont = Icon.createFromIconfontCN({
//     scriptUrl: '//at.alicdn.com/t/font_1170166_p5mfwv2au8.js'
// })

Vue.component(MainBox.name, MainBox)
Vue.component(TableBox.name, TableBox)
// Vue.component('icon-font', IconFont)
Vue.component(Confirm.name, Confirm)
Vue.component(Verify.name, Verify)
Vue.component(CountUp.name, CountUp)
