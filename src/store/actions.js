import vssApi from '@/api/vssApi';
// import axios from 'axios';
import md5 from 'md5';

export const login = async ({ commit }) => {
	const user = {
		username: 'felix',
		password: md5('Valle2022'),
	};

	let auth = false;
	const response = await vssApi.get('/user/apiLogin.action', {
		params: { username: user.username, password: user.password },
	});
	const { status, data } = response.data;
	if (status !== 10000) {
		commit('getLogin', '');
		return auth;
	}

	auth = true;
	commit('getLogin', data.token);
	return auth;
};

export const setData = async ({ commit, state }) => {
	const response = await vssApi.get('/vehicle/findAll.action', {
		params: { token: state.idToken, pageCount: 80, pageNum: 1 },
	});
	const { status, data } = response.data;

	if (status !== 10000) {
		return commit('setData', []);
	}

	commit('setData', data.dataList);
};

export const getDeviceStatus = async ({ commit, state }, id) => {
	let vehicle = state.vehicles.find((device) => device.deviceno === id);

	const response = await vssApi.get('/vehicle/getDeviceStatus.action', {
		params: { token: state.idToken, deviceID: id },
	});
	const { status, data } = response.data;

	if (status !== 10000) return;

	vehicle.videoloststateFormatter = data[0].videoloststateFormatter;
	vehicle.recordState = data[0].recordstateFormatter;

	commit('setVehicleDetail', vehicle);
};

export const getDeviceAlarms = async ({ commit, state }, id) => {
	const response = await vssApi.get('/record/evidenceToRetrieve.action', {
		params: {
			token: state.idToken,
			conditionName: id,
			startTime: '2022-11-17 00:00:00',
			endTime: '2022-11-17 21:00:00',
		},
	});

	const { status, data } = response.data;

	if (status !== 10000) return;

	if (!data.length) {
		return { ok: false };
	}

	commit('setVehicleAlarms', data);
	return { ok: true };
};

export const checkLogin = ({ commit }) => {
	const tokenId = localStorage.getItem('tokenId');

	if (tokenId) {
		commit('getLogin', tokenId);
	}
};
