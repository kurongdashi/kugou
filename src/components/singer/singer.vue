<template>
    <div class="singer">
      <listview :data="singerList" @select="onSelect" ref="listview"></listview>
      <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
  import Singer from '../../common/js/Singer'
  import * as mJsonp from '../../common/js/jsonp'
  import listview from '../base/listview/listview'
  import singerDetail from '../singer-detail/singer-detail'

  import {playListMixin} from '../../common/js/mixin'


  import {mapMutations} from 'vuex'
  const HOT_NAME='热门';
  const HOT_LIST_LENGHT=10;

    export default {
      mixins:[playListMixin],
        data(){
          return{
              singerList:[],
              tempList:[]
          }
        },
        created(){
          this._getSingerList();
        },
        methods:{
          handlePlayList(playlist){
            let bottom=playlist.length>0?'60px':'';
            this.$refs.listview.$el.style.bottom=bottom;

          },
            onSelect(item){
                this.$router.push(`/singer/${item.id}`);
                this.setSinger(item);
            },
          _getSingerList(){
            mJsonp.getSingerList(1).then(res1=>{
                  let temp1=res1.data.list;
                mJsonp.getSingerList(2).then(res2=>{
                  let temp2=res2.data.list;
                  temp1=temp1.concat(temp2);
                  let map=this._resetData(temp1);
//                  console.log(temp1);
                  this.singerList=map;

                })


            });
          },
          /**
           *
           * @param data list对象
           * @return {{hot: {title: string, item: Array}}}
           * @private
           */
          _resetData(data){
            //定义一个新容器
              let map={
                  hot:{
                      title:HOT_NAME,
                      items:[]
                  }
              }

            data.forEach((item,index)=>{

                if(index<HOT_LIST_LENGHT){
                  //选10条作为热门数据
                 map.hot.items.push(new Singer({
                   id:item.Fsinger_id,
                   avatarId:item.Fsinger_mid,
                   name:item.Fsinger_name
                 }));
                }
              //同时按姓名字母排序
             let k=item.Findex
              if(!map[k]){
                map[k]={
                    title:k,
                    items:[]
                };
              }
              map[k].items.push(new Singer(
                {
                  id:item.Fsinger_id,
                  avatarId:item.Fsinger_mid,
                  name:item.Fsinger_name
                }
              ))

            });
            // 给map 排序，HOT-A-Z
            let hot=[];
            let temp=[];
            for(let k in map){
              let t=map[k].title;
              if(t==HOT_NAME){
                  hot.push(map[k]);
              }else if(t.match(/[a-zA-Z]/)){
                //A-Z
                temp.push(map[k]);
              }
            }
            temp.sort((a,b)=>{
              return a.title.charCodeAt(0)-b.title.charCodeAt(0)
            });
            return hot.concat(temp);
          },

          ...mapMutations({
            setSinger:'set_singer'
          })
        },
      components:{
            listview,singerDetail
      }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
