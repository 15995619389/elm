<template>
    <div class="img-preview" @click="close" v-if="showImg">
        <div class="oimg">
            <img :src="imgArr"/>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      showImg: false,
      imgArr: null
    };
  },
  props: ["seller"],
  methods: {
    show(src) {
      this.imgArr = src;
      this.showImg = true;
    },
    close() {
      this.showImg = false;
    }
  }
};
</script>
<style lang="less" scoped>
.img-preview {
  position: fixed;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-justify-content: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #333;
  .oimg {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
