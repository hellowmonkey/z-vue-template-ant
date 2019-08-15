<template>
    <div class="index-page">
        <a-layout :style="{height:height}">
            <a-layout-sider
                :trigger="null"
                collapsedWidth="0"
                collapsible
                v-model="siderCollapsed"
                :width="isSmWidth ? '75%' : 220"
                class="overflow"
            >
                <div class="logo bg-cover" />
                <div class="text-center pad-b-10" v-if="user">
                    <router-link class="font-light" to="/user/account">{{user.username}}</router-link>
                </div>
                <a-menu theme="dark" :selectedKeys="eachKey('selected')" :defaultOpenKeys="eachKey('open')" mode="inline">
                    <template v-for="item in menus">
                        <a-sub-menu :title="item.title" :key="item.title" v-if="item.children">
                            <template v-for="child in item.children">
                                <a-menu-item :key="child.name" @click="$router.push({name: child.name})">{{child.title}}</a-menu-item>
                            </template>
                        </a-sub-menu>
                        <a-menu-item :key="item.name" v-else @click="$router.push({name: item.name})">
                            <span class="nav-text">{{item.title}}</span>
                        </a-menu-item>
                    </template>
                </a-menu>
                <div class="btn-group text-center pad-t-10">
                    <a-tooltip title="修改密码">
                        <a-button ghost size="large" class="mar-r-10"><a-icon type="user" /></a-button>
                    </a-tooltip>
                    <a-tooltip title="退出登录">
                        <a-button ghost size="large"><a-icon type="poweroff" /></a-button>
                    </a-tooltip>
                </div>
            </a-layout-sider>
            <router-view class="pos-rel" :style="{'min-width': isSmWidth ? '100%' : 'auto'}" />
        </a-layout>
        <transition name="slider-top">
            <a-button icon="up" size="large" id="backtop" @click="handleGoTop" shape="circle" class="btn-backtop" v-show="scrollTop > 200"></a-button>
        </transition>
    </div>
</template>

<script>
// import { roleIndex, menus } from '../config/menus'
import { mapState } from 'vuex'
import config from '../config'
import createMenu from '../util/createMenu'

export default {
    data () {
        return {
            height: config.isSmWidth ? 'auto' : config.winHeight + 'px',
            menus: []
        }
    },
    watch: {
    },
    computed: {
        ...mapState(['siderCollapsed', 'scrollTop']),
        mainheight () {
            return config.isSmWidth ? 'auto' : this.height
        }
    },
    methods: {
        handleGoTop () {
            let timer = null
            const box = document.querySelector('.content')
            if (!box) return
            let top = box.scrollTop
            timer = setInterval(() => {
                const speed = top / 4
                top -= Math.max(speed, 4)
                if (top <= 4) {
                    top = 0
                    clearInterval(timer)
                }
                box.scrollTop = top
            }, 30)
        },
        eachKey (key = 'open') {
            let open = []
            this.menus.map(item => {
                if (item.children) {
                    item.children.map(child => {
                        if (child.name === this.$route.name) {
                            open = [key === 'open' ? item.title : child.name]
                        }
                    })
                }
            })
            return open
        }
    },
    mounted () {
        this.menus = createMenu().map(item => {
            item.role = Array.from(new Set(item.role))
            return item
        })
        window.addEventListener('resize', () => {
            this.height = window.innerHeight + 'px'
        })
        window.onload = () => {
            this.height = config.winHeight + 'px'
        }
    }
}
</script>

<style lang="less" scoped>
.ant-layout-sider{
    height: 100%;
    // overflow: hidden;
    .ant-menu{
        height: calc(100% - 190px);
        overflow-y: auto;
    }
}
.logo{
    width: 75px;
    height: 75px;
    // background-image: url('../assets/images/logo/logo.png');
    margin: 20px auto 10px auto;
    border-radius: 50%;
}
.ant-btn-background-ghost.ant-btn{
    border: 0;
    font-size: 1.3em;
    font-weight: bold;
    // padding: 0;
    height: auto;
    opacity: .5;
}
.ant-btn.btn-backtop{
    position: fixed;
    background-color: rgba(0, 0, 0, .5);
    color: #fff;
    border: 0;
    right: 20px;
    bottom: 60px;
}
</style>
