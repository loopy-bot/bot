import NProgress from "nprogress";
import router from "@/router";
import { getToken, setToken } from "@/utils/auth";
import "nprogress/nprogress.css";
import getPageTitle from "@/utils/getPageTitle";
import settings from "@/settings";
// import { usePermissionStore } from "./store/app/permission";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login", "/404", "/403"];
const registerAsyncRoutes = ref(true); // 标记是否加载动态路由

router.beforeEach(async (to: any, _: any, next: any) => {
    if (settings.openProgress) NProgress.start();
    document.title = getPageTitle(to.meta.title);
    if (!settings.needLogin) setToken("1");
    if (whiteList.indexOf(to.path) !== -1) {
        next();
    }

    // 控制跳转菜单，只使用一次，用完就删除避免影响系统内部的重定向
    const name = localStorage.getItem("route");
    localStorage.removeItem("route");

    const hasToken = getToken();

    if (hasToken) {
        if (registerAsyncRoutes.value) {
            // const permission = usePermissionStore();
            // await permission.buildRoutesAction();
            registerAsyncRoutes.value = false;
            if (name) next({ name });
            else next(to);
        } else next();
    } else {
        next({
            path: `/login?redirect=${to.path}`,
        });
    }

    if (settings.openProgress) NProgress.done();
});
