<template>
	<a-space size="large">
		<a-radio-group v-bind="attrs" @change="attrs?.change"> </a-radio-group>
	</a-space>
</template>

<script setup name="radio">
const attrs = useAttrs();
</script>
