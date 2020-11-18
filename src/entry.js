import 'regenerator-runtime/runtime';
import '@webcomponents/webcomponentsjs';

import Vue from 'vue';
import wrap from '@telia/vue-web-component-wrapper-ie11';
import OKFeedback from './Feedback.vue';

const CustomElement = wrap(Vue, OKFeedback, {
  globalStyles: true,
  jsonMapping: true,
});

window.customElements.define('ok-feedback', CustomElement);
