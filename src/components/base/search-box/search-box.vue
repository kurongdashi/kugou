<template>
  <div class="search-box">
    <div class="icon-box"><span class="icon-search icon"></span></div>
    <input type="text" v-model="query" :placeholder="placeholder" class="text" focus="true">
    <div class="icon-box" @click="clear"><span class="icon-dismiss icon"></span></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {debounce} from '../../../common/js/utils'


    export default {
        props:{
          placeholder:{
              type:String,
              default:'搜索歌曲、歌手',
          }
        },
      data(){
        return {
          query:''
        }
      },
      created(){
        this.$watch('query',debounce((newQuery)=>{
          this.$emit('query',newQuery)
        },200))
      },
      methods:{
        clear(){
          this.query='';
        },
        setQuery(world){
            this.query=world;

        },
      }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  .search-box{
    padding:5px;
    background-color: #e1e1e1;
    border-radius: 3px;
    display: flex;
    .icon-box{
      width: 40px;
      text-align: center;
      line-height: 30px;
      .icon-search{
        font-size: 18px;
      }
      .icon-dismiss{
        font-size: 16px;
      }
    }
    .text{
      flex:1;
      outline: none;
      border: none;
      padding: 0 14px;
      border-radius: 14px;
      font-size: 14px;
      color: #666;
    }
  }
</style>
