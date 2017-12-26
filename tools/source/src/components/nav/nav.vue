<!-- 导航 Created by BinoYip on 2017/01/01. -->

<template>
	<div class="nav-wrap">
	  <ul class="nav-ul">
	  	<li v-for="menu in menus" :class="{ active: curRouteName === menu.name }">
        <router-link :to="{ name: menu.name }">
          <i class="icon fa" :class="('fa-' + menu.icon)"></i>
          <span>{{menu.text}}</span>
        </router-link>
      </li>
	  </ul>
	</div>
</template>

<script>
  import './nav.less';

  import { menus } from 'config/config';

  export default {
  	data () {
  		return {
  			menus: menus || []
  		}
  	},
  	computed: {
  		curRouteName () {
  			return this.$route.name;
  		}
  	}
  }
</script>