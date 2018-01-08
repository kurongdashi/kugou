<template>
    <div class="singer">

    </div>
</template>

<script type="text/ecmascript-6">

  import {getSingerList} from 'common/js/singer'

    export default {
        data(){
          return{
              singerList:[]
          }
        },
        created(){
          this._getSingerList();
        },
        methods:{
          _getSingerList(){
              this.singerList=getSingerList();
//              console.log(this.singerList)

          }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
