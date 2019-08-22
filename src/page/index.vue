<template>
    <main-box>
        <a-button>Hi</a-button>
    </main-box>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    methods: {
        ...mapActions('user', ['getTest'])
    },
    mounted () {
        // this.getTest()
    }
}
</script>
