<template>
	<div class="wrap">
		<div class="container pt-3">
			<h1 class="text-center mb-2">Listado de Vehiculos</h1>

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
	import useList from '../composables/useList';
	export default {
		setup() {
			const { listVehicles } = useList();
			return { listVehicles };
		},
	};
</script>

<style lang="scss" scoped></style>
