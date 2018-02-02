<template>
    <div class="search">
      <div class="search-wrapper">
        <search-box ref="searchBox" @query="queryChanage"></search-box>
      </div>
      <div class="hot-word" v-show="showWord">
        <h1 class="title">热门搜索</h1>
        <div class="word-box">
          <span class="word" v-for="item in words" @click="addQuery(item.k)">{{item.k}}</span>
        </div>
      </div>
      <div class="result-wrapper" v-show="!showWord">
      <search-result :query="query"></search-result>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getHotSearch} from '../../common/js/jsonp'

    import searchBox from '../base/search-box/search-box'
    import searchResult from '../search-result/search-result'
    import scroll from '../base/scroll/scroll'

    export default {
        data(){
          return {
              words:[],
              query:'',
            showWord:true
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
              this.words=data.slice(0,10);
//              console.log(data)
          });
        },
        addQuery(world){
          this.$refs.searchBox.setQuery(world);
        },
        /**
         * 监听search-组件关键词
         * @param query
         */
        queryChanage(query){
            if(query!=''){
              this.showWord=false;
            }else{
              this.showWord=true;
            }

          this.query=query;
        }
      },
      components:{
          searchBox,searchResult,scroll,
      }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  .search{
    .search-wrapper{
      margin: 10px 0;
    }
    .hot-word{
      padding:0 10%;
      .title{
        font-size: 16px;
        line-height: 26px;
        font-weight: 500;
      }
      .word-box{
        padding:10px 0;
       .word{
         display: inline-block;
         border-radius: 5px;
         padding:5px 10px;
         background-color: #666;
         color: #f0f0f0;
         margin:0 10px 10px 0;
       }
      }
    }
    .result-wrapper{
    }
  }
</style>
