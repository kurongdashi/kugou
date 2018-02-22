<template>
    <transition name="slider">
      <slot></slot>
    </transition>
</template>

<style lang="scss" rel="stylesheet/scss">
  .slider-enter,.slider-leave-to{
    transform: translate3d(100% ,0,0);
  }
  .slider-enter-active,.slider-leave-active{
    transition: all .4s;
  }
</style>
