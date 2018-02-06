<template>
      <div class="history-list">
        <div class="history" v-for="item in searches" @click="clickSearch(item)">
          <span class="name">{{item}}</span>
          <span class="icon-delete icon" @click.stop="remove(item)"></span>
        </div>
      </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props:{
            searches:{
              type:Array,
              default(){
                  return []
              }
            }
        },
      methods:{
        clickSearch(item){
            this.$emit('clickSearch',item)
        },
        remove(item){
          this.$emit('remove',item)
        }

      }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  .history-list{
    .history{
      padding:10px 0;
         .name{
           font-size: 14px ;
           color: #333;
           padding:5px;

         }
        .icon{
          float: right;
          margin-right: 20px;
          font-size: 14px;
          padding:5px;

        }
    }

  }
</style>
