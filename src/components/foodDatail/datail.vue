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
              <!-- 评价组件 -->
              <ratingSelect :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" @selecttype="set" @content="con"></ratingSelect>
              <div class="rating-wrapper">
                <ul v-if="food.ratings && food.ratings.length">
                  <li v-for="(rating,index) in food.ratings" :key="index" class="rating-item" >  <!--v-show="needShow(rating.rateType,rating.text)"-->
                    
                    <div class="user">
                      <span class="name">{{rating.username}}</span>
                      <img :src="rating.avatar" width="12" height="12" class="avatar"/>
                    </div>
                    <div class="time">{{rating.rateTime | formatDate}}</div>
                    <div class="text">
                      <span :class="{'icon-thumb_up':rating.rateType ===0,'icon-thumb_down':rating.rateType ===1}"></span>
                      {{rating.text}}
                    </div>
                  </li>
                </ul>
                <div v-else class="no-rating">暂无评价</div>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import BScroll from "better-scroll";
import Cartcontrol from "../cartcontrol/cartcontrol";
import Split from "../split/split";
import ratingSelect from "../ratingselect/ratingselect";
import {formatDate} from '../../common/js/date'

const all = 2;
export default {
  // 从父组件传过来的
  data() {
    return {
      showFlag: false,
      selectType: all,
      onlyContent: true,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },
  components: {
    Cartcontrol,
    Split,
    ratingSelect
  },
  props: ["food"],
  
  // 对ratingselect传过来的监听两个事件
  // events: {
  //   "ratingtypeselect"(type) {
  //     this.selectType = type;
  //     this.$nextTick(() => {
  //       this.scroll.refresh();
  //     });
  //   },
  //   "contenttoggle"(onlyContent) {
  //     this.onlyContent = onlyContent;
  //     this.$nextTick(() => {
  //       this.scroll.refresh();
  //     });
  //   }
  // },
  methods: {
    needShow(type,text){
      if(this.onlyContent && text){
        return false;
      }
      if(this.selectType == all){
        return true;
      }else{
        return type = this.selectType
      }
    },
    // 子组件调用父组件的事件方法:v-on   子组件使用：$emit('事件名称',参数) ：参数为可选
    set(type) {
      this.selectType = type;
      // $nextTick :dom更新之后
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    con() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    // 加入购物车
    addFirst(event) {
      if (!event._constructed) {
        return;
      }
      Vue.set(this.food, "count", 1);
    },
    show() {
      // 展示的时候要初始化一次  展示初始值
      this.showFlag = true;
      this.selectType = all;
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
  },
  // 过滤
  filters:{
    formatDate(time){
      let date = new Date(time);
      return formatDate(date,'yyyy-MM-dd hh:mm')
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
      .cartcontrol-wrapper {
        position: absolute;
        right: 25px;
        bottom: 21px;
      }
      .buy {
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
      .fade-transition {
        transition: all 0.5s;
        opacity: 1;
      }
      .fade-enter,
      .fade-leave {
        opacity: 0;
      }
    }
    .info {
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .text {
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        color: rgb(77, 85, 93);
      }
    }
    .rating {
      padding-top: 18px;
      .title {
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .rating-wrapper {
        padding: 0 18px;
        .rating-item {
          position: relative;
          padding: 16px 0;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          .user {
            position: absolute;
            right: 0;
            top: 16px;
            line-height: 12px;
            font-size: 0;
            .name {
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
            .avatar {
              border-radius: 50%;
            }
          }
          .time {
            margin-bottom: 6px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .text {
            line-height: 16px;
            font-size: 12px;
            color: rgb(7, 17, 27);
            .icon-thumb_up {
              margin-right: 4px;
              line-height: 16px;
              font-size: 12px;
              width:13px;
              height: 13px;
              border-radius:50%;
              display: inline-block ;
              background: rgb(0, 160, 220);
            }
            .icon-thumb_down {
              margin-right: 4px;
              line-height: 16px;
              font-size: 12px;
              width:13px;
              height: 13px;
              border-radius:50%;
              display: inline-block ;
              background: rgb(147, 153, 159);
            }
          }
        }
        .no-rating {
          padding: 16px 0;
          font-size: 12px;
          color: rgb(147, 153, 159);
          text-align: center
        }
      }
    }
  }
}
</style>
