/**
 * 公共状态管理
 * Created by BinoYip on 2017/01/01.
 */

import * as types from './mutation-types';
// import { test } from 'server/server';

// initial state
export const state = {
    appInit: false,
}

// getters
export const getters = {}

// actions
export const actions = {
  // init app
  initApp({ commit, state }) {
    commit(types.MAIN_INIT, true);
  }
}

// mutations
export const mutations = {
  [types.MAIN_INIT](state, { isInit }) {
      state.appInit = isInit;
  }
}
