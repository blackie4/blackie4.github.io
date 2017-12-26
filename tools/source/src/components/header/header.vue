<!-- 头部 Created by BinoYip on 2017/01/01. -->

<template>
  <div class="header-wrap">
    <h1>{{titleTxt}}</h1>
  </div>
</template>

<script>
  import './header.less';

  export default {
    props: ['title'],
    data () {
      return {
        titleTxt: this.title || '🔧kuscript工具库'
      }
    }
  }
</script>