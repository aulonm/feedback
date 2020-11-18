import Vue from 'vue';
import VueComponent from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(VueComponent),
}).$mount('#app');
