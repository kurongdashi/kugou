<template>
    <transition name="confirm">
      <div class="confirm" v-show="confirmShow" @click.stop="hide">
        <div class="confirm-dialog" @click.stop>
            <h1 class="title">{{title}}</h1>
            <div class="btn-box">
              <div class="btn cancel" @click.stop="hide">取消</div>
              <div class="btn ok" @click.stop="clickOk">{{ok}}</div>
            </div>
          </div>
      </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        props:{
            title:{
                type:String,
                default:'清空列表'
            },
            ok:{
              type:String,
              default:'确认'
            }
        },
      data(){
         return{
           confirmShow:false
         }
      },
      methods:{
          showConfirm(){
            this.confirmShow=true;
          },
          hide(){
              this.confirmShow=false;
          },
          clickOk(){
              this.$emit('clickOk')
              this.hide();

          }
      }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  .confirm-enter,.confirm-leave-active{
  }
  .confirm-enter-active,.confirm-leave-to{
  }
  .confirm{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin:auto;
    z-index: 100;
    background-color:rgba(0,0,0,0.5);
    display: flex;
    .confirm-dialog{
      background-color: #666;
      width: 60%;
      height: 100px;
      border-radius: 20px;
      margin:auto;
      color: #e0e0e0;
      .title{
        padding:10px 0;
        font-size: 18px;
        text-align: center;
        line-height: 32px;
        font-weight: 700;
        border-bottom:1px solid #333;
      }
      .btn-box{
        display: flex;
        .btn{
          padding:10px 0;
          display: inline-block;
          text-align: center;
          line-height: 28px;
          flex: 1;
        }
        .cancel{
          border-right:1px solid #333;
        }
      }


    }

  }
</style>
