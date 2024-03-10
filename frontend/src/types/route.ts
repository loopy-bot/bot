import { defineComponent } from "vue";

export type Component<T extends any = any> =
	| ReturnType<typeof defineComponent>
	| (() => Promise<typeof import("*.vue")>)
	| (() => Promise<T>);

export interface ServiceMenuInfo {
	/**
	 * 名称
	 */
	name?: string;

	/**
	 * 路径
	 */
	path?: string;

	/**
	 * 组件
	 */
	component?: Component | string;

	/**
	 * 重定向
	 */
	redirect?: string;

	/**
	 * 元数据
	 * 返回-JSON-Object
	 */
	meta?: any;

	/**
	 * 是否隐藏
	 */
	hidden?: boolean;

	/**
	 * 子菜单
	 */
	children?: ServiceMenuInfo[];

	id?: string;

	parentId?: string;

	showInTopLevel?: boolean;
}
