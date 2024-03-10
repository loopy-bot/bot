<template>
	<a-space>
		<a-checkbox-group v-bind="attrs"> </a-checkbox-group>
	</a-space>
</template>

<script setup name="checkbox">
const attrs = useAttrs();
</script>
