import { computed } from 'vue';
import { useStore } from 'vuex';

const useList = () => {
	const store = useStore();
	const getList = async () => await store.dispatch('setData');

	getList();

	return {
		listVehicles: computed(() => store.state.vehicles),
		tokenId: computed(() => store.state.idToken),
		pid: computed(() => store.state.pid),
	};
};

export default useList;
