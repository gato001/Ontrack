<template>
	<div class="wrap">
		<div class="container pt-3">
			<h1 class="text-center mb-2">Equipo</h1>
			<router-link class="btn btn-secondary float-end" :to="{ name: 'lista' }">
				Back to List
			</router-link>

			<table class="table">
				<thead>
					<tr>
						<th scope="col">Device ID</th>
						<th scope="col">Device Name</th>
						<th scope="col">Device Type</th>
						<th scope="col">video channels</th>
						<th scope="col">Latitude - Longitude</th>
						<th scope="col">RecordState</th>
						<th scope="col">Channels Losts</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							{{ vehicleData.deviceno }}
						</td>
						<td>
							{{ vehicleData.devicename }}
						</td>
						<td>
							{{ vehicleData.devicetype }}
						</td>
						<td>
							{{ vehicleData.videoencodernumber }}
						</td>
						<td>{{ vehicleData.latitude }} - {{ vehicleData.longitude }}</td>
						<td>
							{{ vehicleData.recordState }}
						</td>
						<td>
							{{ vehicleData.videoloststateFormatter }}
						</td>
					</tr>
				</tbody>
			</table>

			<button class="btn btn-success" v-on:click="viewDeviceAlarms">
				Ver alertas
			</button>

			<div v-if="viewMessage" class="p-2 text-center">
				Importando Alertas...
			</div>
			<div v-else>
				<p v-if="dataMessage">No hay Alarmas en este dispositivo</p>
				<table v-if="alarms.length" class="table">
					<thead>
						<tr>
							<th scope="col">Tipo Alarma</th>
							<th scope="col">Ubicacion</th>
							<th scope="col">Hora</th>
							<th scope="col">Alarmas</th>
						</tr>
					</thead>
					<tbody v-for="(alarm, index) in alarms" :key="alarm.index">
						<tr>
							<td>
								{{ alarm.alarmType }}
							</td>
							<td>
								{{ alarm.alarmGps }}
							</td>
							<td>
								{{ alarm.alarmTime }}
							</td>
							<td>
								<ul>
									<li v-for="file in alarm.alarmFile">
										Channel : {{ file.channel }} -
										<a :href="file.downUrl">video</a>
									</li>
								</ul>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import { ref, onBeforeUnmount } from 'vue';
	import useDevice from '../composables/useDevice';

	export default {
		props: {
			id: {
				required: false,
			},
		},
		setup(props) {
			const viewMessage = ref(false);
			const dataMessage = ref(false);
			const {
				vehicleData,
				getGPSStatus,
				deviceAlarms,
				alarms,
				cleanVehicleData,
			} = useDevice();
			getGPSStatus(props.id);

			onBeforeUnmount(async () => {
				cleanVehicleData();
			});

			return {
				vehicleData,
				viewMessage,
				dataMessage,
				viewDeviceAlarms: async () => {
					viewMessage.value = true;
					const { ok } = await deviceAlarms(props.id);
					viewMessage.value = false;
					if (!ok) {
						dataMessage.value = true;
					}
				},
				alarms,
			};
		},
	};
</script>

<style scoped>
	li {
		list-style: none;
	}
</style>
