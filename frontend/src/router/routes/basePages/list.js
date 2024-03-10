import Layout from "@/layouts";

export const route = [
	{
		path: "/list",
		component: Layout,
		redirect: "/card",
		meta: {
			title: "list",
			remixIcon: "ri-list-unordered",
		},
		children: [
			{
				path: "card",
				name: "card",
				component: () => import("@/pages/basePages/list/card/base/index.vue"),
				meta: { title: "card", cachePage: true, arcoIcon: "IconSkin" },
			},
			{
				path: "table",
				// 与组件名对应才能缓存
				name: "search_table",
				cachePage: false,
				component: () => import("@/pages/basePages/list/table/index.vue"),
				meta: { title: "table", arcoIcon: "IconSelectAll" },
			},
		],
	},
];

export default route;
