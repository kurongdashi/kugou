<template>
    <div class="search">
      <div class="search-wrapper">
        <search-box ref="searchBox"></search-box>
      </div>
      <div class="hot-world">
        <h1 class="title">热门搜索</h1>
        <div class="world-box">
          <span class="world" v-for="item in worlds" @click="addQuery(item.k)">{{item.k}}</span>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getHotSearch} from '../../common/js/jsonp'

    import searchBox from '../base/search-box/search-box'

    export default {
        data(){
          return {
              worlds:[]
          }
        },
        created(){
          this._getHotSearch();
        },
      methods:{
        _getHotSearch(){
          getHotSearch().then(res=>{
              let data=res.data;
              data=data.data.hotkey;
              this.worlds=data.slice(0,10);

              console.log(data)
          });
        },
        addQuery(world){
          this.$refs.searchBox.setQuery(world);
        }
      },
      components:{
          searchBox
      }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  .search{
    .search-wrapper{
      margin: 10px 0 30px 0;
    }
    .hot-world{
      padding:0 10%;
      .title{
        font-size: 16px;
        line-height: 26px;
        font-weight: 500;
      }
      .world-box{
        padding:10px 0;
       .world{
         display: inline-block;
         border-radius: 5px;
         padding:5px 10px;
         background-color: #666;
         color: #f0f0f0;
         margin:0 10px 10px 0;
       }
      }
    }
  }
</style>
