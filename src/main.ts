import { createSSRApp } from 'vue';
import App from './App.vue';
import store from './store';
import { prototypeInterceptor, routeInterceptor } from './interceptors';
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue';

// 非 H5 平台将全局配置写入 uni 全局对象
// #ifndef H5
import './app.config';
// #endif

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
