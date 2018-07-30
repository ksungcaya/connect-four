import Vue from 'vue';
import axios from 'axios';
import io from 'socket.io-client';
import VueSocketio from 'vue-socket.io-extended';
import VueAxios from 'vue-axios';
import router from './router';
import App from './components/App.vue';


const port = (window.location.port ? `:${window.location.port}` : '');
const baseUrl = `${window.location.protocol}//${window.location.hostname}${port}`;

Vue.config.productionTip = false;
Vue.use(VueSocketio, io(baseUrl));
Vue.use(VueAxios, axios);

/* eslint-disable no-new */
new Vue({
  el: 'app',
  router,
  sockets: {
    connect() {
      console.log('socket connected'); // eslint-disable-line
    },
  },
  components: { App },
  methods: {},
  template: '<App/>',
});
