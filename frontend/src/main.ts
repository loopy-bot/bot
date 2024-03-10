import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import settings from "@/settings";
// 多语言
import i18n from "@/locale";
// 主题
import "@/themes/darkblue.css";
import "@/themes/darkmenu.css";
import "@/themes/themes.css";
// 各种组件配置
import installCompo from "@/modules/components";
// 导入代码高亮文件
import installHignlight from "@/modules/highlight";
// 3d组件
import installPlugin from "@/modules/plugin";
// 自定义指令
import directive from "@/directive";
// 全局样式
import "@/styles/index.scss";
// 权限拦截
// import "./permission";

const app = createApp(App);

// pinia
app.use(createPinia() as any);

// 安装组件库
installCompo(app, settings);


// 代码高亮
installHignlight(app);

// 3d
installPlugin(app);


// 自定义指令
directive(app);

app.use(i18n);
app.use(router as any);
app.mount("#app");
