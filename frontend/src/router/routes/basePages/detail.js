import Layout from "@/layouts";

export const route = [
	{
		path: "/detail",
		component: Layout,
		redirect: "",
		meta: {
			title: "detail",
		},
		children: [
			{
				path: "",
				name: "detail",
				component: () => import("@/pages/basePages/detail/index.vue"),
				meta: { title: "detail", cachePage: true, remixIcon: "ri-slideshow-line" },
			},
		],
	},
];

export default route;
