// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from 'vue-router';
import App from './components/App.vue';
// import ApiService from '@/common/api.service'

Vue.config.productionTip = false;

// ApiService.init()

/* eslint-disable no-new */
new Vue({
  el: 'app',
  router,
  components: { App },
  created: () => {
    console.log('created');
  },
  methods: {},
  template: '<App/>',
});
