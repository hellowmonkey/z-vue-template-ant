<template>
    <a-layout :class="{blur: isSmWidth && !siderCollapsed}">
        <a-layout-header class="header" :class="{'pad-l':isSmWidth}">
            <a-button :icon="siderCollapsed ? 'menu-unfold' : 'menu-fold'" size="small" ghost type="primary" class="btn-icon" v-if="isSmWidth" @click="handleCollapsed"></a-button>
            <a-tooltip title="返回" v-if="!isSmWidth && historyLength > 3 && showBack">
                <a-button icon="arrow-left" class="pull-left mar-r-10" @click="$router.back()" shape="circle"></a-button>
            </a-tooltip>
            <slot name="header" v-if="$slots.header"></slot>
            <div v-else>
                <div class="pull-left">
                    <slot name="title" v-if="$slots.title"></slot>
                    <span v-else>{{titleStr}}</span>
                    <span v-if="data.totalCount !== undefined || !!count">（共<strong class="font-blue font-lg"> {{data.totalCount || count}} </strong>条记录）</span>
                </div>
                <span class="tip pull-left font-gray" v-if="$slots.tip">
                    <slot name="tip"></slot>
                </span>
                <div class="center" v-if="$slots.center">
                    <slot name="center"></slot>
                </div>
                <a-button :icon="searchIcon" v-if="$slots.search && isSmWidth" class="pull-right" @click="searchDialog = !searchDialog"></a-button>
                <div class="right pull-right" v-if="$slots.right">
                    <slot name="right"></slot>
                </div>
            </div>
        </a-layout-header>
        <a-layout-content class="content" ref="content" :class="{noFooter: !$slots.footer}" @scroll="handleScroll">
            <transition name="slider-bottom">
                <div class="search" :class="{fixed: isSmWidth}" v-if="$slots.search" v-show="searchDialog">
                    <div class="bm">
                        <slot name="search"></slot>
                    </div>
                </div>
            </transition>
            <slot name="default"></slot>
            <transition name="fade">
                <div class="mask" v-show="showDialog" @click="searchDialog = false"></div>
            </transition>
        </a-layout-content>
        <a-layout-footer class="footer" :class="`text-${footerAlign}`" v-show="$slots.footer || pageFooter">
            <slot name="footer"></slot>
            <a-pagination v-if="pageFooter && !$slots.footer" :simple="isSmWidth" v-model="data.currentPage" :total="data.totalCount" :pageSize="data.perPage" showSizeChanger showQuickJumper @change="handlePageChange" @showSizeChange="handlePageChange"></a-pagination>
        </a-layout-footer>
        <transition name="fade">
            <div class="shadow" v-show="isSmWidth && !siderCollapsed" @click="handleCollapsed"></div>
        </transition>
    </a-layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

let timer = null

export default {
    name: 'main-box',
    props: {
        title: String,
        data: {
            type: Object,
            default: () => ({})
        },
        footerAlign: {
            type: String,
            default: 'right'
        },
        pageFooter: Boolean,
        count: {
            type: Number,
            default: 0
        },
        searchIcon: {
            type: String,
            default: 'search'
        },
        showBack: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            searchDialog: true
        }
    },
    computed: {
        ...mapState(['siderCollapsed']),
        titleStr () {
            return this.title || this.$store.state.title
        },
        historyLength () {
            return window.history.length
        },
        showDialog () {
            return this.searchDialog && this.isSmWidth
        }
    },
    methods: {
        ...mapMutations(['setCollapsed', 'setScrollTop']),
        handleCollapsed () {
            this.setCollapsed(!this.siderCollapsed)
        },
        handlePageChange (page, per_page) {
            const backtop = document.getElementById('backtop')
            backtop && backtop.click()
            this.$emit('on-page-change', page, per_page)
        },
        handleScroll (e) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                this.setScrollTop(e.target.scrollTop)
            }, 60)
        }
    },
    mounted () {
        this.searchDialog = !this.isSmWidth
        this.setScrollTop(this.$refs.content.$el.scrollTop)
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/var.less';
.mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 0;
}
.header{
    background-color: @bg-color;
    border-bottom: 1px solid @border-color-split;
    padding: 10px;
    height: 50px;
    line-height: 30px;
    position: relative;
    z-index: 5;
    &.pad-l{
        padding-left: 50px;
    }
    .center{
        position: absolute;
        left: 50%;
        transform: translate(-50%,0);
    }
    .btn-icon{
        font-size: 1.1em;
        height: auto;
        position: absolute;
        left: 10px;
        top: 12px;
    }
}
.footer{
    padding: 10px;
    height: 50px;
    background-color: @bg-color;
    border-top: 1px solid @border-color-split;
}
.content{
    padding: 10px;
    height: calc(100% - 100px);
    overflow-y: auto;
    &.noFooter{
        height: calc(100% - 50px);
    }
    -webkit-overflow-scrolling: touch;
}
.tip{
    margin-left: 10px;
}
.search{
    background-color: @bg-color;
    margin: -10px;
    margin-bottom: 10px;
    padding: 10px;
    border-bottom: 1px solid @border-color-split;
    max-height: 350px;
    overflow-y: auto;
    &.fixed{
        position: absolute;
        left: 0;
        top: 50px;
        width: 100%;
        z-index: 2;
        margin: 0;
    }
    .bm{
        margin-bottom: -10px;
    }
}
</style>
