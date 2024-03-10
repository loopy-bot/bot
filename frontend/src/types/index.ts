export namespace API {
	export enum Methods {
		GET = "GET",
		POST = "POST",
		PUT = "PUT",
		DELETE = "DELETE",
	}

	export type ReqType = {
		url: string;
		baseUrl?: string;
		// query参数或者body参数
		data?: object;
		method?: Methods;
		headers?: object;
		describe?: string;
		errorInfo?: string;
		callback?: Function;
	};

	export type ResType = {
		data: any;
		code: number;
		msg: any;
		[value: string]: any;
	};

	export type ResError = {
		msg: string;
	};

	export type Params = {
		// 用于方便用的
		id?: string;
		url?: string;
		// query,body,path
		path?: any;
		query?: any;
		body?: any;
		[value: string]: any;
	};
}

export namespace REQUEST {
	/**
	 * 200:正常请求
	 * 401:请求失败：操作未授权
	 * 404:请求失败：客户端异常
	 * 500:请求错误：服务端异常
	 * 601:网络异常
	 * 602:处理异常
	 * 603:无访问权限
	 * 604:非法访问
	 * 605:未登录
	 * 606:登录信息过期
	 */
	export const ERROR_400 = 400;
	export const ERROR_401 = 401;
	export const ERROR_500 = 500;
	export const TOKEN_ERROR = 604;
	export const NORMAL = 200;
	export const ERROR = {
		601: "网络异常，请稍后再试",
		602: "处理异常，请稍后再试",
		603: "无访问权限，请联系管理员",
		604: "非法访问，签名不正确",
		605: "未登录，请登录后再试",
		606: "登录信息过期，请重新登录",
	};
}
