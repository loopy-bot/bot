<template>
	<div>
		<a-form ref="formRef" :model="fData" label-align="right" auto-label-width>
			<a-form-item class="formItem" v-for="item of config" v-bind="item" :key="item?.field">
				<factory v-if="item?.type !== 'slot'" :type="item?.type" :item="item" :data="fData" />
				<!-- slot -->
				<slot v-else :name="item?.name" :item="item"></slot>
			</a-form-item>

			<a-form-item v-if="slots.default">
				<slot></slot>
			</a-form-item>
		</a-form>
	</div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import factory from "./factory/index.vue";

const slots = useSlots();
const props = defineProps({
	config: {
		default: null,
		type: Array<any>,
	},
	formData: {
		default: null,
		type: Object,
	},
	state: {
		default: "edit",
		type: String,
	},
	isEdit: {
		default: true,
		type: Boolean,
	},
});
// const emits = defineEmits(["validated", "submit"]);
const fData = ref();
const formRef = ref();
const { config } = props;

watch(
	() => props.formData,
	() => {
		// 通过配置文件格式化数据
		fData.value = JSON.parse(JSON.stringify(props?.formData)) || {};
	},
	{
		deep: true,
		immediate: true,
	},
);

const validate = () => {
	return formRef.value.validate((validate: any) => {
		return !!validate;
	});
};
// 把ref和数据暴露出去
defineExpose({
	validate,
	ref: formRef.value,
	data: fData.value,
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
