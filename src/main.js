import Vue from 'vue';
import Feedback from './Feedback.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Feedback),
}).$mount('#app');
