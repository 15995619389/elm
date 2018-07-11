<template>
    <div class="datail" v-show="showFlag" transition="move" ref="foodScroll">
        <div class="food-content">
            <div class="image-header">
                <img :src="food.image"/>
                <span class="back" @click="back">返回</span>
            </div>
            <div class="content">
                <h1 class="title">{{food.name}}</h1>
                <div class="detailA">
                    <span class="sell-count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  // 从父组件传过来的
  data() {
    return {
      showFlag: false
    };
  },

  props: ["food"],
  methods: {
    show() {
      this.showFlag = true;
      // 当为nextTick时，保证dom渲染了
      this.$nextTick(()=>{
        if(!this.scroll){
          this.scroll = new BScroll(this.$refs.foodScroll,{
            click:true
          });
        }else{
          this.scroll.refresh()
        }
      })
    },
    back() {
      this.showFlag = false;
    }
  }
};
</script>
<style lang="less" scoped>
.datail {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background: #fff;
  &.move-transition {
    transition: all 0.2s linear;
    transform: translate3d(0, 0, 0);
  }
  &.move-enter,
  &.move-leave {
    transform: translate3d(100%, 0, 0);
  }
  .food-content {
    .image-header {
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
      .back {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: #fff;
        border-radius: 50%
      }
    }
    .content {
      position: relative;
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
      }
      .detailA {
        margin-bottom: 18px;
        line-height: 10px;
        height: 10px;
        font-size: 0;
        .sell-count,
        .rating {
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .sell-count {
          margin-right: 12px;
        }
      }
      .price{
           font-weight: 700;
        line-height: 24px;
        .now{
            margin-right: 8px;
          font-size: 14px;
          color: rgb(240, 20, 20);
        }
        .old{
             text-decoration: line-through;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>
