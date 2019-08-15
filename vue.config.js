module.exports = {
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#277bca',
                    'layout-body-background': '#ffffff'
                },
                javascriptEnabled: true
            }
        }
    },
    configureWebpack: {
        entry: ['babel-polyfill', './src/main.js']
    }
}
