<!-- 列表 Created by BinoYip on 2017/04/28. -->

<template>
  <div class="layout-wrap">
    <div id="headerWrap">
      <m-header></m-header>
    </div>
    <div id="navWrap">
      <m-nav></m-nav>
    </div>
    <div id="mainWrap">
      <div class="main-wrap" :class="{ in: isIn}">
        <h1 class="main-head">
          <i class="fa fa-hand-o-right"></i>
          <span>{{headTxt}}</span>
        </h1>
        <div class="main-content">
          <div class="main-panel">
            <slot>
              只有在没有要分发的内容时才会显示。
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div id="footerWrap">
      <m-footer></m-footer>
    </div>
  </div>
</template>

<script>
  import './layout.less';

  import mHeader from 'components/header/header';
  import mNav from 'components/nav/nav';
  import mFooter from 'components/footer/footer';
  import { menus }  from 'config/config';

  export default {
    name: 'layout',
    data () {
      return {
        isIn: false
      }
    },
    components: {
      mHeader,
      mNav,
      mFooter
    },
    computed: {
      headTxt () {
        let txt = '';
        const oThis = this;
        menus.map(function(item) {
          if (item.name === oThis.$route.name) {
            txt = item.text;
          }
        });
        return txt;
      }
    },
    mounted () {
      const oThis = this;
      setTimeout(function(){
        oThis.isIn = true;
      }, 10);
    }
  }
</script>