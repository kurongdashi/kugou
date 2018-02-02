<template>
      <scroll :data="resultList" class="result-list" ref="resultList" @scrollToEnd="searchMore" :pullup="pullup">
      <ul class="search-result">
        <li class="search-item" v-for="item in resultList" @click="selectItem(item)">
            <div class="img-box">
              <i :class="getIcon(item)" class="icon"></i>
            </div>
            <div class="result">
              <h2 class="title" v-html="getTitle(item)"></h2>
              <p class="text" v-html="getText(item)"></p>
            </div>
        </li>
      </ul>
        <router-view></router-view>
        <loading v-show="loadingMore" class="loading"></loading>
      </scroll>

</template>

<script type="text/ecmascript-6">
  import {getSearchContent} from '../../common/js/jsonp'
  import scroll from '../base/scroll/scroll'
  import {playListMixin} from '../../common/js/mixin'
  import loading from '../base/loading/loading'
  const SINGER='singer';
  import {Singer} from '../../common/js/Singer'
    export default {
      mixins:[playListMixin],
      props:{
          query:{
              type:String,
              default:''
          }
      },
      data(){
        return{
            resultList:[],
            page:1,
            pullup:true,
            loadingMore:false,
            hasMore:true,
        }
      },
      computed:{

      },
      methods:{
          selectItem(item){
              if(item.type===SINGER){

              }
          },
          searchMore(){
              if(!this.hasMore){
                  return;
              }
              this.page++;
              this.loadingMore=true;
              getSearchContent(this.query,this.page).then(res=>{
              let data=res.data.data;
              this.loadingMore=false;

                this.resultList=this.resultList.concat(this._getResult(data));
            });
          },
        handlePlayList(playlist){
          let bottom=playlist.length>0?'60px':'';
//          this.$refs.resultList.$el.style.bottom=bottom;

        },
        _getResult(data){
          let ret=[];
          let song=data.song;
          this.$refs.resultList.scrollTo(0,0);

          this.hasMore=this._checkMore(song);

          let zhida=data.zhida;
          if(zhida.singerid){
            zhida.type=SINGER;
            ret.push(zhida);
          }
          if(song.list.length>0){
              ret=ret.concat(song.list)
          }
//          console.log(ret)
          return ret;
        },
        //检查是否还有多余的数据
        _checkMore(song){
            return this.page <= Math.ceil(song.totalnum/song.curnum);
        },
        getIcon(item){
          return item.type===SINGER?'icon-mine':'icon-music';
        },
        getTitle(item){
          return item.type===SINGER?item.singername:item.songname;
        },
        getText(item){
          return item.type===SINGER?`单曲：${item.songnum} &nbsp; 专辑：${item.albumnum}`:item.albumname;
        },

      },
      watch:{
          query(newQuery){
            getSearchContent(this.query).then(res=>{
              let data=res.data.data;
              console.log(data)
              this.resultList=this._getResult(data);

            });
          }
      },
      components:{
        scroll,loading
      }

    }
</script>

<style lang="scss" rel="stylesheet/scss">
  .result-list{
    position: absolute;
    overflow: hidden;
    top: 140px;
    bottom: 0;
    left: 0;
    right: 0;
    margin:auto;
    .loading{
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      margin:auto;
    }
  }
  .search-result{
    background-color: #e2e2e2;
    .search-item{
      display: flex;
      padding:5px 0;
      .img-box{
        width: 48px;
        height: 48px;
        flex: 0 0 48px;
        margin-right: 20px;
        line-height: 48px;
        text-align: center;
        .icon{
          font-size: 20px;
        }
      }
      .result{
        flex: 1;
        line-height: 24px;
        .title{
          font-size: 14px;
          color: #666;
        }
        .text{
          font-size: 12px;
          color: #999;
        }

      }
    }
  }
</style>
