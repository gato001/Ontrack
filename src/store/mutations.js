export const getLogin = (state, { pid, token }) => {
	localStorage.setItem('tokenId', token);
	localStorage.setItem('pid', pid);
	state.idToken = token;
	state.pid = pid;
};

export const setData = (state, dataList) => {
	state.vehicles = [...dataList];
};

export const setVehicleDetail = (state, vehicle) => {
	state.vehicleDetail = { ...vehicle };
};

export const setVehicleAlarms = (state, alarms) => {
	state.alarms = [...alarms];
};

export const cleanData = (state) => {
	state.vehicleDetail = {};
	state.alarms = [];
};
