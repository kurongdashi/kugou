<template>
      <scroll :data="resultList" class="result-list" ref="listview">
      <ul class="search-result">
        <li class="search-item" v-for="item in resultList">
            <div class="img-box">
              <i :class="getIcon(item)" class="icon"></i>
            </div>
            <div class="result">
              <h2 class="title" v-html="getTitle(item)"></h2>
              <p class="text" v-html="getText(item)"></p>
            </div>
        </li>
      </ul>
      </scroll>
</template>

<script type="text/ecmascript-6">
  import {getSearchContent} from '../../common/js/jsonp'
  import scroll from '../base/scroll/scroll'
  import {playListMixin} from '../../common/js/mixin'
  const SINGER='singer';
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
            resultList:[]
        }
      },
      computed:{

      },
      methods:{
        handlePlayList(playlist){
          let bottom=playlist.length>0?'60px':'';
          this.$refs.listview.$el.style.bottom=bottom;

        },
        _getResult(data){
          let ret=[];
          let song=data.song;
          let zhida=data.zhida;
          if(zhida.singerid){
            zhida.type=SINGER;
            ret.push(zhida);
          }
          if(song.list.length>0){
              ret=ret.concat(song.list)
          }
          console.log(ret)
          return ret;
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
              console.log('zou---')
            getSearchContent(this.query).then(res=>{
              let data=res.data.data;
              this.resultList=this._getResult(data);

            });
          }
      },
      components:{
        scroll,
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
  }
  .search-result{
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
          font-size: 16px;
        }
        .text{
          font-size: 12px;
          color: #3c3c3c;
        }

      }
    }
  }
</style>
