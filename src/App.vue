<template>
	<router-view />
</template>

<script>
	import useDevice from './composables/useDevice';

	export default {
		setup() {
			const { checkLoginStatus } = useDevice();

			checkLoginStatus();
		},
	};
</script>
