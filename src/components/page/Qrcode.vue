<template>
<div class="qrcode">
  <qrcode
    :value="qrcodeUrl"
    :options="{ size: 170 }"
  >
  </qrcode>
  <p>二维码demo</p>
</div>
  
</template>

<script>
// 注意，标签需要使用qrcode,目前发现使用qr-code标签会报错
import qrcode from '@xkeshi/vue-qrcode'
export default {
  name: 'QrCode',
  components: {
      qrcode
  },
  data (){
    return {
      qrcodeUrl:"www.baidu.com"
    }
  }
}
</script>

<style scoped>
.qrcode {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
}
</style>
