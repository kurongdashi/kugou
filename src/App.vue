<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import mHeader from './components/my-header/MyHeader'
  import tab from './components/tab/tab'

  export default {
    name: 'app',
    components:{
      mHeader,tab,
    }
  }
</script>

<style lang="scss" type="stylesheet/scss">
</style>
