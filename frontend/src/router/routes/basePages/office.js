import Layout from "@/layouts";

export const route = [
	{
		path: "/office",
		component: Layout,
		redirect: "/word",
		meta: {
			title: "office",
			remixIcon: "ri-folder-line",
		},
		children: [
			{
				path: "word",
				name: "word",
				component: () => import("@/pages/basePages/office/word/index.vue"),
				meta: { title: "word", cachePage: false, remixIcon: "ri-file-word-line" },
			},
			{
				path: "pdf",
				name: "pdf",
				component: () => import("@/pages/basePages/office/pdf/index.vue"),
				meta: { title: "pdf", cachePage: false, remixIcon: "ri-file-pdf-line" },
			},
		],
	},
];

export default route;
