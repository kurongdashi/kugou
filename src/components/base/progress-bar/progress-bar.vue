<template>
  <div class="progress-bar" ref="bar" @click="progressClick">
    <div class="progress" ref="progress"></div>

    <div class="progress-btn" ref="btn"
         @touchstart.prevent="onTouchStart"
         @touchmove.prevent="onTouchMove"
         @touchend.prevent="onTouchEnd"

    ></div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ballWidth = 12;
  export default {
    props: {
      precent: {
        type: Number,
        default: 0
      }
    },
    created(){
      this.touchs = {};
    },
    methods: {
      onTouchStart(e){
        //设置拖动标志位，防止拖动时，watch更新进度
        this.touchs.inited = true;
        this.touchs.startX = e.touches[0].pageX;//开始拖动位置
        this.touchs.progress = this.$refs.progress.clientWidth;//当前进度条位置
      },
      onTouchMove(e){
        if (!this.touchs.inited) {
          return
        }
        let deltaX = e.touches[0].pageX - this.touchs.startX;//拖动了多少
//          console.log(deltaX)
        let totalWidth = this.touchs.totalWidth;

        let offsetWidth = Math.min(totalWidth, Math.max(0, deltaX + this.touchs.progress))
        this._offset(offsetWidth);
      },
      onTouchEnd(){
        this.touchs.inited = false;
        this._triggerPercent();

      },
      progressClick(e){
          this._offset(e.offsetX);
        this._triggerPercent();
      },
      //将事件暴露
      _triggerPercent(){
        let w = this.$refs.progress.clientWidth;
        let percent = w / this.touchs.totalWidth;
        this.$emit('percentChange',percent);
      },
      //设置小球和进度条
      _offset(currentWidth){
        this.$refs.progress.style.width = currentWidth + 'px';
        //球移动
        let ballLeft = currentWidth - ballWidth / 2 > 0 ? currentWidth - ballWidth / 2 : 0;

        this.$refs.btn.style.left = ballLeft + 'px';
      }
    },
    watch: {
      precent(newPrecent){
        //设置拖动标志位，防止拖动时，更新进度
        if (newPrecent >= 0 && !this.touchs.inited) {
          let totalWidth = this.$refs.bar.clientWidth - ballWidth / 2;
          this.touchs.totalWidth = totalWidth;
          let currentWidth = totalWidth * newPrecent;
          this._offset(currentWidth);
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  $ball: 12px;
  $radiu: $ball/2;
  .progress-bar {
    position: relative;
    width: 100%;
    height: $ball/2;
    border-radius: $radiu;
    background-color: #333;
    font-size: 0;
    .progress {
      position: absolute;
      width: 0px;
      height: $ball/2;
      border-radius: $radiu 0 0 $radiu;

      background-color: #ffd700;

    }
    .progress-btn {
      position: absolute;
      top: -$ball/4;
      left: 0;
      width: $ball;
      height: $ball;
      border-radius: 50%;
      background-color: #fff;
    }

  }
</style>
