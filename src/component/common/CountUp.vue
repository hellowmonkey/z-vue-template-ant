<template>
    <span ref="countEl" :style="countOpts.style">0</span>
</template>

<script>
import { CountUp } from 'countup.js'

export default {
    name: 'count-up',
    props: {
        value: {
            type: [Number, String],
            default: 0
        },
        options: {
            type: Object,
            default () {
                return {
                    duration: 0.8
                }
            }
        },
        countStyle: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            countUp: null
        }
    },
    computed: {
        countOpts () {
            const valStr = String(this.value).trim()
            const leg = valStr.length
            const decimal = valStr.split('.')[1]
            let fontSize = '1em'
            if (leg > 6) {
                fontSize = `${Math.min(1, (7 / (leg - leg / 4.5)))}em`
            }
            return {
                value: Number(this.value),
                leg,
                style: {
                    'font-size': fontSize,
                    ...this.countStyle
                },
                options: {
                    decimalPlaces: decimal ? decimal.length : 0,
                    ...this.options
                }
            }
        }
    },
    watch: {
        value () {
            this.countFn()
        }
    },
    methods: {
        countFn () {
            const countOpts = this.countOpts
            if (!countOpts.value) return
            if (this.countUp) {
                this.countUp.update(countOpts.value)
            } else {
                this.countUp = new CountUp(this.$refs.countEl, countOpts.value, countOpts.options)
                this.countUp.start()
            }
        }
    },
    mounted () {
        this.countFn()
    }
}
</script>
