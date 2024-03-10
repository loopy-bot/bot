import { defineStore } from "pinia";
import { constantRoutes } from "@/router";
import { ServiceMenuInfo } from "@/types/route";
// import { queryAllowedAppMenus } from "@/services/common";
// import Layout from "@/layouts/Layout.vue";
// import router from "@/router";

// const modules = import.meta.glob("@/pages/**/*.vue");

export const usePermissionStore = defineStore("permission", {
	state: () => ({
		routes: [...constantRoutes],
		addRoutes: [] as ServiceMenuInfo[],
	}),
	getters: {
		getRoute(): ServiceMenuInfo[] {
			return [...this.routes, ...this.addRoutes];
		},
	},
	// 动态路由的构建
	// actions: {
	// 	setAsyncRoutes(routes: ServiceMenuInfo[]) {
	// 		this.addRoutes = routes;
	// 	},
	// 	async buildRoutesAction() {
	// 		const asyncRoutes = (await queryAllowedAppMenus()) as ServiceMenuInfo[];

	// 		const buildIcon = (icon: string) => {
	// 			const [prefix, suffix] = icon.split("#");
	// 			return {
	// 				[prefix + "Icon"]: suffix,
	// 			};
	// 		};

	// 		const buildComponent = (routes: ServiceMenuInfo[]): ServiceMenuInfo[] => {
	// 			return routes.map((route) => {
	// 				const updatedRoute: ServiceMenuInfo = { ...route };
	// 				// 构建icon
	// 				Object.assign(updatedRoute.meta, buildIcon(updatedRoute.meta.icon));
	// 				// 构建组件
	// 				updatedRoute.component =
	// 					updatedRoute.component === "layout/RouterView"
	// 						? Layout
	// 						: modules[`/src${updatedRoute.component}`];
	// 				if (updatedRoute.children) {
	// 					updatedRoute.children = buildComponent(updatedRoute.children);
	// 				}
	// 				return updatedRoute;
	// 			});
	// 		};

	// 		const routes = buildComponent(asyncRoutes);
	// 		console.log(routes, "routes");
	// 		for (let route of routes) {
	// 			router.addRoute(route as any);
	// 		}
	// 		router.addRoute({ path: "/:pathMatch(.*)", redirect: "/404", hidden: true } as any);
	// 		this.setAsyncRoutes(routes);
	// 	},
	// },
});
