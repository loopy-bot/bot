import Layout from "@/layouts";

export const route = [
	{
		path: "/visualization",
		component: Layout,
		redirect: "/analysis",
		meta: {
			title: "visualization",
			remixIcon: "ri-dashboard-2-line",
		},
		children: [
			{
				path: "analysis",
				name: "DataAnalysis",
				component: () => import("@/pages/basePages/visualization/data-analysis/index.vue"),
				meta: { title: "analysis", cachePage: true, icon: "airplane" },
			},
			{
				path: "dimension",
				name: "dimension",
				component: () =>
					import("@/pages/basePages/visualization/multi-dimension-data-analysis/index.vue"),
				meta: { title: "dimension", cachePage: true, arcoIcon: "IconBook" },
			},
		],
	},
];

export default route;
