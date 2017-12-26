<!-- Created by BinoYip on 2017/04/28. -->

<template>
	<m-layout>
		<div>
			待开放...
		</div>
	</m-layout>
</template>

<script>

	import mLayout from 'components/layout/layout';

	export default {
		name: 'jsonFormat',
		components: {
			mLayout
	 	},
		computed: {
			list () {
    		return [];
    		// return this.$store.state.home.list;
    	}
  	},
		created () {
			// this.getListData(16);
		},
		methods: {
    	getListData (count) {
    		this.$store.dispatch('getListData', { count });
    	}
		}
	}
</script>
