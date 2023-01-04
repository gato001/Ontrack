<template>
	<div class="wrap">
		<div class="container pt-3">
			<h1 class="text-center mb-2">Listado de Vehiculos</h1>

			<h1>Alarmas 80004</h1>
			<ul>
				<li v-for="alarm in alarmArray" :key="alarm.id">
					{{ alarm }}
				</li>
			</ul>

			<table class="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Device name</th>
						<th scope="col">Device ID</th>
						<th scope="col">video channels</th>
						<th scope="col">Time</th>
						<th scope="col">Latitude - Longitude</th>
						<th scope="col">Altitud</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(vehicle, index) in listVehicles" :key="vehicle.index">
						<th scope="row">{{ index }}</th>
						<td>
							<router-link
								:to="{ name: 'device', params: { id: vehicle.deviceno } }"
							>
								{{ vehicle.devicename }}
							</router-link>
						</td>
						<td>{{ vehicle.deviceno }}</td>
						<td>{{ vehicle.videoencodernumber }}</td>
						<td>{{ vehicle.dtu }}</td>
						<td>{{ vehicle.latitude }} - {{ vehicle.longitude }}</td>
						<td>{{ vehicle.altitude }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import { onMounted, ref } from 'vue';
	import useList from '../composables/useList';
	export default {
		setup() {
			const { listVehicles, tokenId, pid } = useList();

			let alarmArray = ref([]);
			let gpsArray = ref([]);

			const clone = (obj) => {
				const visited = new WeakSet();
				return JSON.parse(
					JSON.stringify(obj, function (key, value) {
						if (typeof value === 'object' && value !== null) {
							if (visited.has(value)) {
								return;
							}
							visited.add(value);
						}
						return value;
					})
				);
			};

			const connectWebSocket = () => {
				console.log('Starting connection to WebSocket server');
				const socket = new WebSocket('ws://duragas.ontrack.com.ec:36300/ws');

				// Send a login action to the server
				const loginAction = {
					action: 80000,
					payload: {
						username: 'felix',
						token: localStorage.getItem('tokenId'),
						pid: localStorage.getItem('pid'),
					},
				};

				// Log a message when the connection is opened
				socket.onopen = (e) => {
					console.log('WebSocket connection opened');
					socket.send(JSON.stringify(clone(loginAction)));
				};

				// Log a message when the connection is closed
				socket.onclose = () => {
					console.log('WebSocket connection closed');
				};

				// Log an error message if the connection encounters an error
				socket.onerror = (error) => {
					console.error(`WebSocket error: ${error}`);
				};

				// Handle responses from the server
				socket.onmessage = (event) => {
					console.log(event.data);
					const message = JSON.parse(event.data);
					switch (message.action) {
						case '80000':
							console.log(`Received login response: ${message.status}`);
							if (message.payload.msg === 'success') {
								// Send a message subscription action to the server
								const subscriptionAction = {
									action: 80001,
									payload: '',
								};
								socket.send(JSON.stringify(clone(subscriptionAction)));
							}
							break;
						case '80003':
							console.log(`80003`);
							gpsArray.value.push(message.payload);
							break;
						case '80004':
							console.log(`Alarm`);
							alarmArray.value.push(message.payload);
							break;
					}
				};
			};

			onMounted(() => {
				connectWebSocket();
			});
			return { listVehicles, alarmArray, gpsArray };
		},
	};
</script>

<style lang="scss" scoped></style>
