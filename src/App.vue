<template>
  <!-- Ant Design Vue 全局配置 -->
  <ConfigProvider :locale="zhCN">
    <div id="app">
      <router-view />
    </div>
  </ConfigProvider>
</template>

<script>

// 导入中文语言包
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { ConfigProvider } from 'ant-design-vue'

export default {
  components: { ConfigProvider },
  data () {
    return {
      zhCN
    }
  }
}
</script>
