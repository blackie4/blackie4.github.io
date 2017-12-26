/**
 * 首页状态管理
 * Created by BinoYip on 2017/04/27.
 */

import * as types from '../mutation-types';
import * as mainStore from '../main';

// initial state
const state = {
	list: []
}

// getters
const getters = {}

// actions
const actions = {
	getListData ({ commit, state }, { count }) {
		// console.log('count: ' + count);
		var list = [];
		if (typeof count === 'number' && count > 0) {
			for (let i=0; i