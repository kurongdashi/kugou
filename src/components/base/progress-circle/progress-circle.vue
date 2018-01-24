<template>
    <div class="progress-circle">
      <div class="progress"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style lang="scss" rel="stylesheet/scss">
.progress-circle{
  position: relative;
  padding: 15px;
  background-color:transparent;
  border-radius: 50%;
  border: 2px solid #ffff00;
  font-size: 0;
  .progress{
    position: absolute;
    left: 0;
    top: 0;
    padding: 15px;
    background-color:transparent;
    border-radius: 50%;
    border: 3px solid #e1e1e1;
  }

}
</style>
