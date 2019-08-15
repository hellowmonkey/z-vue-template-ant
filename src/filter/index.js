import Vue from 'vue'

Vue.filter('dateFilter', (data, format = 'YYYY年MM月DD日 HH:mm:ss') => {
    if (!data) return '-'
    if (typeof data === 'number') data = data * 1000
    return Vue.prototype.$moment(data).format(format)
})
