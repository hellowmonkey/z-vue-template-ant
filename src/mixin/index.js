import Vue from 'vue'
import config from '../config'
import { mapState } from 'vuex'

Vue.mixin({
    data () {
        return {
            config,
            isSmWidth: config.isSmWidth
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
    }
})
