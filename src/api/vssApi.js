import axios from 'axios';

const vssApi = axios.create({
	baseURL: 'https://duragas.ontrack.com.ec/vss',
});

export default vssApi;
