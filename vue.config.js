const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './', // 设置为相对路径
  outputDir: 'dist', // 打包输出目录
  assetsDir: 'static', // 静态资源目录
})
