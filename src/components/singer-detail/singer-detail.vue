<template>
  <transition name="slider">
    <div class="singer-detail">

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
    export default {
      components:{
      }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  .slider-enter,.slider-leave-to{
    transform: translate3d(100%,0,0);
  }
  .slider-enter-active,.slider-leave-active{
    transition:all .4s;
  }
  .singer-detail{
    width:100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    background-color: #333;
  }

</style>
