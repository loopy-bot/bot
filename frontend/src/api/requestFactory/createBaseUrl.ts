import { useAppStore } from "@/store/app/settings";

export default (hosts: any) => {
	return (): string => {
		let active: "DEV" | "UAT" | "PRO" = "UAT";
		const appStore = useAppStore();
		const isProduct = appStore.settings.isProduct; // 如果是生产版，不允许修改api
		const apiHost = localStorage.getItem("apiHost");

		if (isProduct) active = "PRO";

		return apiHost && !isProduct ? `${apiHost}` : hosts[active];
	};
};
