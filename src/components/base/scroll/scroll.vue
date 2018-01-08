<template>
  <div class="scroll" ref="scroll">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      //scroll 内部dom使用的数据
      singList: {
        type: Array,
        default:null

      }
    },
    mounted(){
      setTimeout(() => {
        this._initScroll();
      }, 20)
    },
    methods: {
      _initScroll(){
        this.scroll = new BScroll(this.$refs.scroll, {
            probeType:this.probeType,
          click:this.click
        });
      },
      enable(){
        this.scroll && this.scroll.enable();
      },
      disable(){
        this.scroll && this.scroll.disable();
      },
      refresh(){
        this.scroll && this.scroll.refresh();
      }
    },
    watch:{
        //当内部数据变化时，自动刷新，不需要每个组件调用
      singList(){
        let height=document.body.clientHeight;
          setTimeout(() => {
            this.refresh();
          }, 20)
        }
    }


  }
</script>
<style lang="scss" rel="stylesheet/scss">
.scroll{
  overflow: hidden;
  position: absolute;
  width: 100%;
  top: 90px;
  left: 0;
  bottom: 0;
}
</style>

