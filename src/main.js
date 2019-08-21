import Vue from 'vue'
import './plugins/bootstrap-vue'
import VueGeolocation from 'vue-browser-geolocation';
import Loading from 'vue-loading-overlay';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App.vue'

Vue.config.productionTip = false;
Vue.use(VueGeolocation);
Vue.use(Loading);

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

new Vue({
  render: h => h(App),
}).$mount('#app');
