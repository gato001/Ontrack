import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home';

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/lista',
		name: 'lista',
		component: () => import(/* webpackChunkName: "list" */ '../views/List'),
	},
	{
		path: '/device/:id',
		name: 'device',
		component: () => import(/* webpackChunkName: "device" */ '../views/Device'),
		props: (route) => {
			return {
				id: route.params.id,
			};
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
