/**
 * Vuex
 */

import Vue from 'vue';
import Vuex from 'vuex';
import {state, getters, actions, mutations} from './main';
import home from './modules/home';
import detail from './modules/detail';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
  	home,
  	detail
  }
});