<template>
  <div class="wrap">
    <video class="video" muted autoplay controls ref="player"></video>
  </div>
</template>

<script>
import flvjs from 'flv.js' // 引入flvjs
export default {
  data () {
    return {
      player: null
    }
  },
  mounted () {
    // 如果浏览器支持flvjs，则执行相应的程序
    if (flvjs.isSupported()) {
      // 准备监控设备流地址
      const url = 'rtsp://admin:admin123@117.70.61.105:8001/cam/realmonitor?channel=1&subtype=0'
      // 创建一个flvjs实例
      // 下面的ws://localhost:8888换成你搭建的websocket服务地址，后面加上设备流地址
      this.player = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        url: 'ws://localhost:8888/' + url
      })
      
      this.player.on('error', (e) => {
        console.log(e)
      })
      
     // 将实例挂载到video元素上面
      this.player.attachMediaElement(this.$refs.player)
      
      try {
        // 开始运行加载 只要流地址正常 就可以在h5页面中播放出画面了
        this.player.load()
        this.player.play()
      } catch (error) {
        console.log(error)
      }  
    }
  },
  beforeUnmount () {
    // 页面销毁前 关闭flvjs
    this.player.destroy()
  }
}
</script>

<style lang="css" scoped>
  .wrap .video {
      width: 1000px;
      height: 800px;
  }
</style>
