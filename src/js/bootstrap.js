/* ============
 * Bootstrap File
 * ============
 *
 * Will configure and bootstrap the application
 */


/* ============
 * Vue
 * ============
 *
 * Vue.js is a library for building interactive web interfaces.
 * It provides data-reactive components with a simple and flexible API.
 *
 * http://rc.vuejs.org/guide/
 */
import Vue from 'vue';


/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */
import VueRouter from 'vue-router';
import store from './app/data/store';
import routes from './app/routes';
import App from './app/App.vue';
import Axios from 'axios';

Vue.use(VueRouter);

export const router = new VueRouter({
    routes,
});

Vue.router = router;


export default {
    store,
    router,
    render: h => h(App)
};