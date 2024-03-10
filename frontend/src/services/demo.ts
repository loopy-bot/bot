import { request } from "@/api/apiConfig";

export const getFile = async (params: any = {}) => {
	const data = await request({
		url: params?.url,
	});
	return data;
};
