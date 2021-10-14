import router from 'zongheng-pro/router'
import storage from '@zenith/vue-commons/utils/storage'

import encryptor from '@zenith/vue-commons/encryptor/aes'
import store from '@zt/zongheng-pro/framework/store'
store.setAppConfig({
  _appName: '纵横', // 应用名称，改名称会在浏览器标签显示
  // _menuHeadName, // 左侧菜单头部标题(默认同 $appName)
  // _menuHeadLogo: require('@/assets/logo.png'), // 左侧菜单头部图标（需用require加载logo）
  // _syncOff: '1', // 同步开关
  // _loginCaptcha: true, // 启用登录验证码，无需登录证码时去掉该配置项
  // _defaultNavTheme: 'dark | light', // 默认菜单主题
  // _encryptor: encryptor.setSecretKey('秘钥') // http加密传输，无需加密时去掉该配置项
})

// 配置登录页
router.registStaticRoutes([{
  path: '/login',
  name: 'login',
  hidden: true,
  component: () => import('@/views/Login')
}])

// 配置重定向登录地址
router.redirectLogin = (redirectURL) => {
  if (router.currentRoute.path == '/login') {
    return
  }
  if (!redirectURL || redirectURL == '/login') {
    redirectURL = '/'
  }
  storage.removeToken()
  location.replace(`/login?redirect=${encodeURIComponent(redirectURL || (location.pathname + location.search))}`)
}

// 注册 views 页面
/**
 * 将所有 @/views 目录下所有 vue 文件注册到路由页面管理器中
 * 动态路由会根据菜单中配置的页面组件地址来匹配页面
 */
const fileList = require.context('@/views', true, /\.vue$/),
  views = {}
fileList.keys().forEach((key) => {
  views[key.split('.')[1]] = fileList(key).default
})
router.registViews(views)

// 注册 root 子路由
router.registRootChildren([{
  path: '/test',
  name: 'test',
  component: 'RouteView',
  redirect: '/test/list',
  hideChildrenInMenu: true,
  meta: {
    title: '测试'
  },
  children: [{
    path: '/test/list',
    name: 'test-list',
    component: () => import('@/views/demo/DemoList'),
    meta: {
      title: '列表页'
    }
  }, {
    path: '/test/edit',
    name: 'test-edit',
    component: () => import('@/views/demo/DemoEdit'),
    meta: {
      title: '编辑页'
    }
  }]
}])