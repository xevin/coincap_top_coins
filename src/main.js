import Vue from 'vue';
import AppLayout from './AppLayout.vue';
import './styles.scss';

Vue.config.productionTip = false;

new Vue({
  render: h => h(AppLayout),
}).$mount('#app');
