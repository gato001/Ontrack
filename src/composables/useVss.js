import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const useVss = () => {
	const store = useStore();
	const router = useRouter();
	let auth = ref(false);

	return {
		login: async () => {
			auth.value = await store.dispatch('login');
			if (auth.value) {
				router.push({ name: 'lista' });
			}
		},
		listVehicles: computed(() => store.state.vehicles),
	};
};

export default useVss;
