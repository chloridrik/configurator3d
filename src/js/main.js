/* ============
 * Main File
 * ============
 *
 * Will initialize the application
 */
require("babel-polyfill");
import Vue from 'vue';
import App from './bootstrap';

new Vue(App).$mount('#app');