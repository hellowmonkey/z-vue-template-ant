<template>
    <a-popconfirm :title="title" :visible="visible" @confirm="handleConfirm" @cancel="handleCancel" @visibleChange="handleVisibleChange">
        <slot />
    </a-popconfirm>
</template>

<script>
import config from '../../config'

export default {
    name: 'confirm',
    props: {
        title: String
    },
    data () {
        return {
            visible: false
        }
    },
    methods: {
        handleConfirm () {
            this.$emit('confirm')
        },
        handleVisibleChange (visible) {
            if (visible && config.isSmWidth) {
                const that = this
                this.$confirm({
                    title: this.title,
                    onOk () {
                        that.handleConfirm()
                    }
                })
                this.visible = false
            } else {
                this.visible = visible
            }
        },
        handleCancel () {
            this.visible = false
        }
    }
}
</script>
