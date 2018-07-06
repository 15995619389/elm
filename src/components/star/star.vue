<template>
    <div class="star" :class="starType">
        <p>{{size}}--{{score}}</p>
        <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" track-by="$index"></span>
    </div>
</template>
<script>
const LENGTH = 5;
const csl_on = "on";
const csl_half = "half";
const csl_off = "off";

export default {
//   props: {
//     size: {
//       type: Number
//     },
//     score: {
//       type: Number
//     }
//   },
props:['size','score'],
  computed: {
    starType() {
      return "star-" + this.size;
    },
    itemClasses() {  
        // debugger   
      let result = [];
      let score = Math.floor(this.score * 2) / 2; //向下取整
      let hasDecimal = score % 1 !== 0; //判断是否有小树
      let integer = Math.floor(score); //全星星的个数
      for (let i = 0; i < score; i++) {
        //添加到result的醒醒个数
        return result.push(csl_on);
      }
      if (hasDecimal) {
        /* 有小数半星只放一个*/
        return result.push(csl_half);
      }
      while (result.length < LENGTH) {
        /* 不够的添加 空的星*/
        return result.push(csl_off);
      }
      return result;
    }
  }
};
</script>
<style scoped lang="less">
.star {
  font-size: 0;
  .star-48{
      .star-item{
        width: 20px;
        height: 20px;
        margin-right: 22px;
        .on {
          background: url("star24_on@2x.png") no-repeat;
          background-size: 20px 20px;
        }
        .half {
          background: url("star24_half@2x.png") no-repeat;
          background-size: 20px 20px;
        }
        .off {
          background: url("star24_off@2x.png") no-repeat;
          background-size: 20px 20px;
        }
      }
  }
}
</style>
