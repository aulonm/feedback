import 'regenerator-runtime/runtime';
import '@webcomponents/webcomponentsjs';

import Vue from 'vue';
import wrap from '@telia/vue-web-component-wrapper-ie11';
import VueComponent from './App.vue';

const CustomElement = wrap(Vue, VueComponent, {
  globalStyles: true,
  jsonMapping: true,
});

window.customElements.define('custom-feedback', CustomElement);
