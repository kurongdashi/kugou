<template>
    <div class="tab">
      <router-link tag="div" to="/recommend" class="tab-item"><span>推荐</span></router-link>
      <router-link tag="div" to="/singer" class="tab-item"><span>歌手</span></router-link>
      <router-link tag="div" to="/rank" class="tab-item"><span>排行</span></router-link>
      <router-link tag="div" to="/search" class="tab-item"><span>搜索</span></router-link>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style lang="scss" rel="stylesheet/scss">
  $color:#31b0d5;
  .tab{
    display: flex;
    .tab-item{
      display: inline-block;
      text-align: center;
      flex:1;
      span{
        display: inline-block;
        padding:8px 0;
        font-size: 14px;
      }
    }
    //当router-link被激活，自动增加了下面这个class
    .router-link-active{
      span{
        color: $color;
        border-bottom:2px solid $color;
      }
    }
  }
</style>
