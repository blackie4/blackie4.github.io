<!-- Created by BinoYip on 2017/04/28. -->

<template>
	<m-layout>
		<div class="qr-wrap">
			<textarea v-model="qrUrl"></textarea>
			<div class="qr-set">
				<ul class="qr-set-tit">
					<li :class="{ active: tabIndex===1}" @click="tabChange(1)">颜色设置</li>
					<li :class="{ active: tabIndex===2}" @click="tabChange(2)">其它设置</li>
				</ul>
				<ul class="qr-set-con">
					<li :class="{ active: tabIndex===1}">
						<span class="colors-panel clearfix" @click="turnForeground(true)" @mouseleave="turnForeground(false)">
							<label>前景色：</label>
							<b><i :style="{ backgroundColor: foreground.hex }"></i></b>
							<span class="colors-picker" :class="{active: isForeground }">
								<chrome-picker :value="foreground" @input="updateForeground"></chrome-picker>
							</span>
						</span>
						<span class="colors-panel clearfix" @click="turnBackground(true)" @mouseleave="turnBackground(false)">
							<label>背景色：</label>
							<b><i :style="{ backgroundColor: background.hex }"></i></b>
							<span class="colors-picker" :class="{active: isBackground }">
								<chrome-picker :value="background" @input="updateBackground"></chrome-picker>
							</span>
						</span>
					</li>
					<li :class="{ active: tabIndex===2}">待开放...</li>
				</ul>
			</div>
			<button @click="genQr">生成二维码</button>
			<div class="qr-show">
				<img :src="imgUrl" :class="{ active: qrUrl&&imgUrl }">
			</div>
		</div>
	</m-layout>
</template>

<script>

	import mLayout from 'components/layout/layout';
	import jrQrcode from 'jr-qrcode';
	import { Chrome } from 'vue-color';

	const defaultForeground = {
	  hex: '#000000',
	  hsl: { h: 150, s: 0, l: 0, a: 1 },
	  hsv: { h: 150, s: 0, v: 0, a: 1 },
	  rgba: { r: 0, g: 0, b: 0, a: 1 },
	  a: 1
	};

	const defaultBackground = {
	  hex: '#ffffff',
	  hsl: { h: 150, s: 0, l: 100, a: 1 },
	  hsv: { h: 150, s: 0, v: 100, a: 1 },
	  rgba: { r: 255, g: 255, b: 255, a: 1 },
	  a: 1
	};

	export default {
		name: 'qrGenerate',
		components: {
			mLayout,
			'chrome-picker': Chrome,
	 	},
	 	data () {
	 		return {
	 			qrUrl: '',
	 			imgUrl: '',
	 			tabIndex: 1,
	 			foreground: defaultForeground,
	 			isForeground: false,
	 			background: defaultBackground,
	 			isBackground: false,
	 		}
	 	},
		methods: {
    	genQr () {
    		if (this.qrUrl) {
	    		const imgBase64 = jrQrcode.getQrBase64(this.qrUrl, {
	    			background: this.background.hex,
  					foreground: this.foreground.hex
	    		});
	    		this.imgUrl = imgBase64;
    		}
    	},
    	tabChange (index) {
    		this.tabIndex = index;
    	},
    	turnForeground (show) {
    		this.isForeground = show;
    	},
    	updateForeground(val) {
    		if (val) {
    			this.foreground = val;
    		}
    	},
    	turnBackground (show) {
    		this.isBackground = show;
    	},
    	updateBackground(val) {
    		if (val) {
    			this.background = val;
    		}
    	}
		}
	}
</script>

<style lang='less' scoped>

	@import '../base/mixin.less';

	.qr-wrap {
		max-width: 450px;
		min-height: 500px;
		margin: 0 auto;
		padding: 20px 0;

		textarea {
			width: 96%;
			height: 70px;
			padding: 6px 2%;
			border: 1px solid @borderColor;
   		border-radius: 2px;
			resize: none;
			&:focus {
				border-color: @borderColorLight;
			}
		}

		button {
			width: 100%;
			height: 44px;
			margin: 20px auto 40px;
			line-height: 42px;
			border-radius: 2px;
			border: 1px solid @blue;
			background-color: @blue;
			color: #fff;
			font-size: 16px;
		}

		.qr-set {
			margin-top: 10px;
			.qr-set-tit {
				padding: 3px 10px 0;
				height: 27px;
				overflow: hidden;
    		background: #dbdbdb;
				li {
					float: left;
					padding: 0 10px;
					height: 27px;
					line-height: 27px;
					color: #636363;
					font-size: 12px;
					cursor: pointer;
					&.active {
						border-top-left-radius: 2px;
						border-top-right-radius: 2px;
						background: #fff;
						cursor: default;
					}
				}
			}
			.qr-set-con {
				li {
					display: none;
					padding: 15px 10px;
					&.active {
						display: block;
					}
				}
				.colors-panel {
					float: left;
					margin-right: 20px;
					position: relative;
					line-height: 22px;
					font-size: 12px;
					label {
						float: left;
				    display: inline;
				    line-height: 26px;
				    color: #555;
				    margin-right: 8px;
					}
					b {
						position: relative;
				    float: left;
				    display: inline;
				    width: 22px;
				    height: 22px;
				    padding: 1px;
				    cursor: pointer;
				    border: 1px solid #b3b3b3;
				    i {
				    	position: absolute;
				    	left
				    	display: block;
				    	width: 22px;
				    	height: 22px;
				    }
					}
					.colors-picker {
						position: absolute;
						top: 26px;
						left: 0;
						display: none;
						&.active {
							display: block;
						}
					}
				}
			}
		}

		.qr-show {
			img {
				border: none;
				display: none;
				margin: 0 auto;
				&.active {
					display: block;
				}
			}
		}
	}
</style>