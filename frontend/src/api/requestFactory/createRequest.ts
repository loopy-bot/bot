import Fly from "flyio/dist/npm/fly";
import { Notification } from "@arco-design/web-vue";
import { API, REQUEST } from "@/types/index";
import { getToken, removeToken } from "@/utils/auth";

const fly = new Fly();

export default (getBaseUrl: () => string) => {
	return <T>(req: API.ReqType): T => {
		const {
			url,
			data,
			method = API.Methods.GET,
			headers = {},
			describe = "",
			errorInfo = "",
			callback,
		} = req;
		const baseUrl = getBaseUrl();
		const token = getToken();
		return new Promise((resolve, reject) => {
			fly
				.request(`${baseUrl}${url}`, data, {
					method,

					headers: {
						"content-type": "application/json",
						accept: "*/*",
						...headers,
						// env: "dev",
						token,
					},
				})
				.then((res: any) => {
					const data = (res?.data ? res?.data : res) as API.ResType;
					data?.code !== REQUEST.NORMAL
						? reject({ message: data.msg, ...data })
						: (describe.length && Notification.info(describe), resolve(data?.data as T));
				})
				.catch((e: any) => {
					callback && callback(e);
					reject({ ...e });
				});
		}).catch((e) => {
			const { TOKEN_ERROR, ERROR_401, ERROR_400, ERROR_500 } = REQUEST;
			let msg = e?.msg;
			let code = e?.code || e?.status;

			if (e?.status) {
				code === ERROR_401 && (msg = "请求错误：操作未授权");
				code >= ERROR_400 && code < ERROR_500 && (msg = "请求错误：客户端错误");
				code >= ERROR_500 && (msg = "请求错误：服务端错误");
				msg += `（${code}）`;
				console.log("httperror", e);
			}

			Notification.error(errorInfo || `${msg}` || `请求失败:${code}`);
			if (code >= TOKEN_ERROR) {
				setTimeout(() => {
					setTimeout(() => {
						let a = document.createElement("a");
						a.href = "/";
						a.click();
						removeToken();
					}, 2000);
				}, 2000);
			}

			// 抛出错误阻止后续事件
			throw new Error(JSON.stringify(e));
		}) as T;
	};
};
