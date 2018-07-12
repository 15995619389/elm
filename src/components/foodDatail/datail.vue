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
                 <!-- cartcontrol组件购物车加减 -->
                <div class="cartcontrol-wrapper">
                  <Cartcontrol :food="food"></Cartcontrol>
                </div>
                <!-- 加入购物车 显示条件-->
                <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0" transition="fade">加入购物车</div>
            </div>
            <!-- split分割组件 判断一下有的可能没有info-->
            <Split v-show="food.info"></Split>
            <!-- 商品信息 -->
            <div class="info" v-show="food.info">
              <h1 class="title">商品信息</h1>
              <p class="text">{{food.info}}</p>
            </div>
            <Split></Split>
            <div class="rating">
              <h1 class="title">商品评价</h1>

            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import BScroll from "better-scroll";
import Cartcontrol from '../cartcontrol/cartcontrol'
import Split from '../split/split'

const ALL = 2;
export default {
  // 从父组件传过来的
  data() {
    return {
      showFlag: false,
      selectType:ALL,
      onlyContent:true,
      desc:{
        all:'全部',
        positive:'推荐',
        negative:'吐槽'
      }
    };
  },
  components:{
    Cartcontrol,
    Split
  },
  props: ["food"],
  created(){
    console.log(this.food)
  },
  methods: {
    // 加入购物车
    addFirst(event){
      if(!event._constructed){
        return;
      }
      Vue.set(this.food,'count',1)
    },
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = true;
      // 当为nextTick时，保证dom渲染了
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodScroll, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
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
        border-radius: 50%;
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
      .price {
        font-weight: 700;
        line-height: 24px;
        .now {
          margin-right: 8px;
          font-size: 14px;
          color: rgb(240, 20, 20);
        }
        .old {
          text-decoration: line-through;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .cartcontrol-wrapper{
        position: absolute;
        right: 25px;
        bottom: 21px;
      }
      .buy{
         position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        border-radius: 12px;
        font-size: 10px;
        color: #fff;
        background: rgb(0, 160, 220);
      }
      .fade-transition{
        transition: all 0.5s;
        opacity: 1;
      }
      .fade-enter,.fade-leave{
        opacity: 0;
      }
    }
    .info{
      padding: 18px;
      .title{
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .text{
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        color: rgb(77, 85, 93);
      }
    }
    .rating{
      padding-top: 0 18px;
      .title{
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
    }
  }
}
</style>
