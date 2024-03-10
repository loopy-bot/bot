import Layout from "@/layouts";

export const route = [
	{
		path: "/form",
		component: Layout,
		redirect: "/group",
		meta: {
			title: "form",
			remixIcon: "ri-survey-line",
		},
		children: [
			{
				path: "group",
				name: "group",
				component: () => import("@/pages/basePages/form/group/index.vue"),
				meta: { title: "group", cachePage: true, arcoIcon: "IconInfo" },
			},
			{
				path: "step",
				name: "step",
				component: () => import("@/pages/form/basePages/step/index.vue"),
				meta: { title: "step", cachePage: true, arcoIcon: "IconPalette" },
			},
		],
	},
];

export default route;
