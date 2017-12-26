<!-- 详情页 Created by BinoYip on 2017/01/01. -->

<template>
	<div id="detailWrap">
		<div id="headerWrap">
			<m-header title="Detail View"></m-header>
		</div>
		<div id="navWrap">
			<m-nav></m-nav>
		</div>
		<div class="content">
			{{echoText}}
		</div>
	</div>
</template>

<script>

	import mHeader from 'components/header/header';
	import mNav from 'components/nav/nav';

	export default {
		name: 'detail',
    components: {
    	mHeader,
    	mNav
    },
    data: function() {
	    return {
	    	text: 'Detail',
	    }
		},
		computed: {
			echoText () {
				return 'Hello '+ this.text;
			}
		},
		created () {
		}
	}
</script>

