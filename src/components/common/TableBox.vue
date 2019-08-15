<template>
    <div class="table-data">
        <div class="ant-table ant-table-scroll-position-left ant-table-default ant-table-bordered" :class="{'ant-table-empty': !countData}" v-if="!$slots.mobile || !isSmWidth">
            <div class="ant-table-content">
                <div class="ant-table-body">
                    <table>
                        <thead class="ant-table-thead">
                            <slot name="thead" v-if="$slots.thead"></slot>
                            <tr v-else-if="columns && columns.length">
                                <th v-for="item in columns" :key="item" :width="item.width || 'auto'">
                                    <div v-html="typeof item !== 'object' ? item : item.content"></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="ant-table-tbody">
                            <slot v-if="!!countData" />
                        </tbody>
                    </table>
                </div>
                <div class="ant-table-placeholder" v-if="!countData">暂无数据</div>
            </div>
        </div>
        <template v-else>
            <slot name="mobile"></slot>
            <div class="noner" v-if="!countData">暂无数据</div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'table-box',
    props: {
        data: {
            type: Array
        },
        count: {
            type: Number,
            default: 0
        },
        columns: {
            type: Array
        }
    },
    data () {
        return {

        }
    },
    computed: {
        countData () {
            return (this.data && this.data.length) || this.count
        }
    }
}
</script>

<style lang="less" scoped>
.ant-table-thead>tr,.ant-table-tbody>tr{
    &>th,&>td{
        text-align: center;
        word-break: break-all;
    }
}
.noner{
    position: absolute;
    color: #888;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
