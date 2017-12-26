<!-- 首页 Created by BinoYip on 2017/04/28. -->

<template>
	<div id="homeWrap">
		<div id="headerWrap">
			<m-header title="Home View"></m-header>
		</div>
		<div id="navWrap">
			<m-nav></m-nav>
		</div>
		<div id="listWrap">
			<ul class="list-wrap">
				<m-item v-for="(item, index) in list" :item="item" :index="index"></m-item>
			</ul>
		</div>
		<div id="footerWrap">
			<m-footer></m-footer>
		</div>
	</div>
</template>

<script>

	import mHeader from 'components/header/header';
	import mNav from 'components/nav/nav';
	import mItem from 'components/item/item';
	import mFooter from 'components/footer/footer';

	export default {
		name: 'home',
		components: {
  		mHeader,
  		mNav,
  		mItem,
  		mFooter
	 	},
		computed: {
			list () {
    		return this.$store.state.home.list;
    	}
  	},
		created () {
			this.getListData(16);
		},
		methods: {
    	getListData (count) {
    		this.$store.dispatch('getListData', { count });
    	}
		}
	}
</script>
