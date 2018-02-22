<template>
    <transition name="down-anim">
      <slot></slot>
    </transition>
</template>

<style lang="scss" rel="stylesheet/scss">
  .down-anim-enter,.down-anim-leave-to{
    transform: translate3d(0,100%,0);
  }
  .down-anim-enter-active,.down-anim-leave-active{
    transition: all .4s;
  }
</style>
