// polyfill
import 'babel-polyfill';
import './base/base.less';
import 'font-awesome/less/font-awesome.less';

import Vue from 'vue';

import router from './router/router';
import store from './store/index';

// 懒加载图片
// <img v-img="" src="default url" data-img="real url">
// var lazyImg = function (obj) {
//   var img = new Image();
//   var url = obj.getAttribute('data-img') || '';
//   if (!url || url == obj.src) {
//     return;
//   }
//   img.src = url;
//   img.onload = function() {
//     obj.src = url;
//     obj.setAttribute('data-load', 'true');
//   };
// }
// Vue.directive('img', {
//   bind (obj) {
//     // console.log(obj);
//     lazyImg(obj);
//   },
//   update (obj) {
//     lazyImg(obj);
//   }
// });

new Vue({
  store,
  router,
	created () {
    // console.log('APP Created')
    this.$store.dispatch('initApp');
  },
  mounted () {
    // console.log('APP Mounted')
  }
}).$mount('#app');
