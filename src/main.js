// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';

import Vue from 'vue';
import Vuetify from 'vuetify';
import VueSwal from 'vue-swal';
import App from './App';
import router from './router';
import VueChatScroll from 'vue-chat-scroll';


// User Imports in Vue app
Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.use(VueSwal);
Vue.use(VueChatScroll);


Vue.config.productionTip = false;

// Initialize Vue App
new Vue({
  el: '#app',
  router,
  vuetify: new Vuetify({}),
  components: { App },
  template: '<App/>',
});
