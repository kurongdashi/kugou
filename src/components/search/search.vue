<template>
  <div class="search">
    <div class="search-wrapper">
      <search-box ref="searchBox" @query="queryChanage"></search-box>
    </div>
    <!--搜索结果-->
    <div class="result-wrapper" v-show="!showWord">
      <search-result :query="query" @selectItem="saveSearch"></search-result>
    </div>

    <!--搜索历史和热词-->
    <scroll :data="searchHistory" class="wordAnd" v-show="showWord" ref="wordAnd">
    <div >
      <div class="hot-word" v-show="showWord">
        <h1 class="title">热门搜索</h1>
        <div class="word-box">
          <span class="word" v-for="item in words" @click="addQuery(item.k)">{{item.k}}</span>
        </div>
      </div>
      <div class="search-history" v-show="searchHistory.length>0 && query==''">
        <h1 class="title">
          <span class="name">搜索历史</span>
          <span class="icon-clear" @click="clearHistory"></span>
        </h1>
        <div class="history-wrapper">
          <history-list :searches="searchHistory" @clickSearch="getQuery" @remove="remove"></history-list>
        </div>
      </div>
    </div>
    </scroll>


  </div>
</template>

<script type="text/ecmascript-6">
  import {getHotSearch} from '../../common/js/jsonp'

  import searchBox from '../base/search-box/search-box'
  import historyList from '../base/history-list/history-list'
  import searchResult from '../search-result/search-result'
  import scroll from '../base/scroll/scroll'

  import {mapActions, mapGetters} from 'vuex'
  import {playListMixin} from '../../common/js/mixin'

  export default {
      mixins:[playListMixin],
    data(){
      return {
        words: [],
        query: '',
        showWord: true
      }
    },
    created(){
      this._getHotSearch();
    },
    methods: {
      clearHistory(){
        this.clearSearchHistory();
      },
      handlePlayList(playlist){
        let bottom=playlist.length>0?'60px':'';
        this.$refs.wordAnd.$el.style.bottom=bottom;

      },
      remove(item){

        this.removeSearchHistory(item)

      },
      getQuery(item){
        this.$refs.searchBox.setQuery(item);
      },
      _getHotSearch(){
        getHotSearch().then(res => {
          let data = res.data;
          data = data.data.hotkey;
          this.words = data.slice(0, 10);
//              console.log(data)
        });
      },
      addQuery(query){
        this.$refs.searchBox.setQuery(query);
      },
      /**
       * 监听search-组件关键词
       * @param query
       */
      queryChanage(query){
        if (query != '') {
          this.showWord = false;
        } else {
          this.showWord = true;
        }

        this.query = query;
      },

      saveSearch(){
        this.saveSearchHistory(this.query)
      },
      ...mapActions({
        saveSearchHistory: 'saveSearchHistory',
        removeSearchHistory: 'removeSearchHistory',
        clearSearchHistory: 'clearSearchHistory',
      }),

    },
    computed: {
      ...mapGetters([
        'searchHistory'
      ])
    },
    components: {
      searchBox, searchResult, scroll, historyList
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .search {
    .search-wrapper {
      margin: 10px 0;
    }
    .wordAnd{
      padding:0 10px;
      position: absolute;
      overflow: hidden;
      top: 140px;
      bottom: 0;
      left: 0;
      right: 0;
      margin:auto;
      .hot-word {

        .title {
          font-size: 16px;
          line-height: 26px;
          font-weight: 500;
        }
        .word-box {
          padding: 10px 0;
          .word {
            display: inline-block;
            border-radius: 5px;
            padding: 5px 10px;
            background-color: #666;
            color: #f0f0f0;
            margin: 0 10px 10px 0;
          }
        }
      }
      .search-history {
        .title {
          .icon-clear {
            padding: 5px;
            float: right;
            margin-right: 20px;
          }
        }
        .history-wrapper {
          padding: 10px 0;
        }
      }
    }

  }
</style>
