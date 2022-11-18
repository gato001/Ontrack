import { computed } from 'vue';
import { useStore } from 'vuex';

const useDevice = () => {
	const store = useStore();

	const getGPSStatus = async (id) => {
		await store.dispatch('getDeviceStatus', id);
	};

	const deviceAlarms = async (id) => {
		const resp = await store.dispatch('getDeviceAlarms', id);
		return resp;
	};

	const checkLoginStatus = () => {
		const resp = store.dispatch('checkLogin');
		return resp;
	};

	const cleanVehicleData = async () => {
		await store.commit('cleanData');
	};

	return {
		checkLoginStatus,
		getGPSStatus,
		deviceAlarms,
		cleanVehicleData,
		vehicleData: computed(() => store.state.vehicleDetail),
		alarms: computed(() => store.state.alarms),
	};
};

export default useDevice;
