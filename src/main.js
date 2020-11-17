import '@webcomponents/webcomponentsjs';
import Vue from 'vue';
import wrap from '@telia/vue-web-component-wrapper-ie11';
import feedback from './App.vue';

const CustomElement = wrap(Vue, feedback, {
  globalStyles: false,
});

window.customElements.define('custom-feedback', CustomElement);
