<template>
	<div class="wrap">
		<div class="container pt-3 text-center">
			<button class="btn btn-lg btn-primary" v-on:click="login">Login</button>
		</div>
	</div>
</template>

<script>
	import useVss from '../composables/useVss';
	export default {
		setup() {
			const { login } = useVss();
			return { login };
		},
	};
</script>

<style lang="scss" scoped></style>
