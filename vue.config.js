const path = require('path')
const resolve = dir => path.join(__dirname, dir) 
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
    publicPath: process.env.VUE_APP_HOST, // 默认'/'，部署应用包时的基本 URL
    // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
    // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: false,
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: !IS_PROD, // 生产环境的 source map
    devServer: {
        open: true, // 是否打开浏览器
        host: "localhost",
        port: "8080",
        https: false,
        hotOnly: false,
    },

    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
            .set("vue$", "vue/dist/vue.esm.js")
            .set("@", resolve("src"))
            .set("@assets", resolve("src/assets"))
            .set("@components", resolve("src/components"))
            .set("@pages", resolve("src/pages"))
            .set("@static", resolve("src/static"));
    }
}