<template>
	<component
		:is="componentMap[type]"
		v-model="data[item?.field]"
		v-bind="props(item)"
		v-on="event(item)"
		:placeholder="getPlaceholder(item)"
	></component>
</template>

<script setup lang="ts">
import { componentMap } from "./index.ts";

defineProps({
	type: null, // 类型
	item: null, // 配置项
	data: null, // 双向绑定的数据
});

// 占位符
function getPlaceholder(item: any) {
	const { label, type } = item;
	let placeholder = "请输入";

	const empty = ["date", "radio", "checkbox"];
	const select = ["select"];

	select.includes(type) && (placeholder = "请选择");
	empty.includes(type) && (placeholder = "");

	return placeholder.length ? `${placeholder}${label}` : "";
}

// 事件
function event(item: any = {}) {
	const obj: any = {};
	for (let i in item) {
		if (typeof item[i] === "function") {
			obj[i] = item[i];
		}
	}

	return obj;
}

// 抽离type 由于直接绑定会把type也绑定上去，导致卡死
function props(item: any = {}) {
	const obj: any = {};
	for (let i in item) {
		if (i !== "type") {
			obj[i] = item[i];
		}
	}
	return obj;
}
</script>
