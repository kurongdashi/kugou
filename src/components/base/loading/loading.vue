<template>
    <div class="loading">
      <img src="./loading.gif" alt="">
      <p class="text">正在加载...</p>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style lang="scss" rel="stylesheet/scss">
.loading{
  text-align: center;
  img{
    width: 30px;
    height: 30px;
  }
  .text{
    padding-top: 10px;
    text-align: center;
    line-height: 18px;
    font-size: 12px;
  }
}
</style>
