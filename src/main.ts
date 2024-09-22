import { createSSRApp } from 'vue'
import App from './App.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

// 引入 unocss
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)

  app.component('TnIcon', TnIcon)

  return {
    app,
  }
}
