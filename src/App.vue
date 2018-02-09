<template>
  <div id="app">
    <m-header></m-header>

    <tab></tab>


    <keep-alive>
      <router-view/>
    </keep-alive>


    <player></player>
  </div>
</template>

<script>
  import mHeader from './components/my-header/MyHeader'
  import tab from './components/tab/tab'
  import player from './components/player/player'

  export default {
    name: 'app',
    components:{
      mHeader,tab,player
    }
  }
</script>

<style lang="scss" type="stylesheet/scss">
</style>
