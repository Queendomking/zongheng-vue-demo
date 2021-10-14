/**
 * ==================================
 * 不使用纵横的打包方案
 * ==================================
 */
module.exports = {

  // 开起显示转译纵横(必须)
  transpileDependencies: ['@zt/zongheng-pro'],

  // 开发环境端口号
  devServer: {
    port: 6930
  },

  // webpack 配置
  configureWebpack: {
    resolve: {
      alias: {
        // 配置纵横框架别名(别名可以随意，但必须与 import 保持一致)
        'zongheng-pro': '@zt/zongheng-pro/framework'
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        // 必须
        javascriptEnabled: true
      }
    }
  }
}