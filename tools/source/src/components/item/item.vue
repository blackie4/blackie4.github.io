<!-- 列表 Created by BinoYip on 2017/04/28. -->

<template>
  <li class="item-wrap">
    <div class="item-inner">{{itemObj.id}}. {{itemObj.content}}</div>
  </li>
</template>

<script>
  import './item.less';

  export default {
    props: ['item', 'index'],
    data () {
      return {
        itemObj: this.item || {},
        indexNum: this.index || 0
      }
    },
    created () {
    }
  }
</script>