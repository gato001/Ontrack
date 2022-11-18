export const getLogin = (state, tokenId) => {
	localStorage.setItem('tokenId', tokenId);
	state.idToken = tokenId;
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
