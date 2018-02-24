<template>
    <div class="m-header">
      <img src="./logo.png" alt="酷狗">
      <router-link to="/user" tag="div" class="user-icon">
        <i class="icon-mine"></i>
      </router-link>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style lang="scss" rel="stylesheet/scss">
.m-header{
  text-align: center;
  padding:8px;
  position: relative;
  .user-icon{
    width: 36px;
    height: 36px;
    padding:10px;
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    margin:auto;
    text-align: center;
    line-height: 36px;
    color: goldenrod;

  }
}
</style>
