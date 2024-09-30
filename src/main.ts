import { createSSRApp } from 'vue';
import App from './App.vue';
import store from './store';
import { prototypeInterceptor, routeInterceptor } from './interceptors';
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue';
import './app.config.ts';

// 引入 unocss
import 'virtual:uno.css';

export function createApp() {
  const app = createSSRApp(App);

  app.use(store);
  app.use(prototypeInterceptor);
  app.use(routeInterceptor);

  // 全局组件注册
  app.component('TnIcon', TnIcon);

  return {
    app,
  };
}
