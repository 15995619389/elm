<template>
    <div class="shopcart">
        <div class="content" >
            <div class="content-left" @click="togleList">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'heiglight':totalCount>0}"><!--高亮样式 -->
                        <i class="icon-shopping_cart" :class="{'heiglight':totalCount>0}"></i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'heiglight':totalPrice>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
              <div class="pay" :class="payClass">{{payDesc}}</div><!-- 判断结算按钮是否高亮 -->
            </div>
        </div>
        <!-- 小球动画 -->
        <div class="ball-container">
          <div transition="drop" v-for="(ball,index) in balls" :key="index" v-show="ball.show" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </div>
        <!-- 购物车list -->
        <div class="shopcart-list" v-show="listShow" transition="fade">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(food,index) in selectFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-warpper">
                  <cartControl :food="food"></cartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>
<script>
import BScroll from "better-scroll";
import cartControl from "../cartcontrol/cartcontrol";
export default {
  components: {
    cartControl
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 10,
            count: 1
          }
        ];
      }
    },
    //
    deliveryPrice: {
      type: Number,
      default: 0
    },
    // 配送价
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      fold: true,
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ]
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(foods => {
        total += foods.price * foods.count; //商品总价 = selectFoods下商品的单价*商品个数
      });
      return total;
      console.log(total);
    },
    // 选中的商品总数
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(foods => {
        count += foods.count;
      });
      return count;
    },
    // 结算状态切换
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        //当总价小于配送价
        // 顶一个变量  求差值
        let diff = this.minPrice - this.totalPrice;
        return `还差${diff}元起送`;
      } else {
        return `去结算`;
      }
    },
    // 切换class高亮
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    },
    listShow() {
      // 也就是等于0
      if (this.totalCount <= 0) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
         // 初始化
      if(show){
        this.$nextTick(()=>{
          this.scroll = new BScroll(this.$refs.listContent,{
            click:true
          })
        })
      }
      return show;
    }
  },
  methods: {
    togleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    empty(){
      this.selectFoods.forEach((food)=>{
        food.count = 0 ;
        this.maskShow = false
      })
    }
  }
};
</script>
<style lang='less' scoped>
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;
          &.heiglight {
            background: rgb(0, 160, 220);
          }
          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
            &.highlight {
              color: #fff;
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }
      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 700;
        &.heiglight {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        background: #80858a;
        &.not-enough {
          background: #2b343c;
        }
        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      &.drop-transition {
        transition: all 0.4s cubic-bezier(0.55, -0.45, 0.9, 0.53);
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }
    }
  }
  .shopcart-list {
    position: absolute;
    left: 0;
    top: -190px;
    z-index: -1;
    width: 100%;
    &.fold-transition {
      transition: all 0.5s;
      transform: translate3d(0, -100%, 0);
    }
    &.fold-enter,
    &.fold-leave {
      transform: translate3d(0, 0, 0);
    }
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }
    .list-content {
      padding: 0 18px;
      height: 150px;
      overflow-y: scroll;
      background: #fff;
      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }
        .cartcontrol-warpper {
          position: absolute;
          right: 0;
          bottom: 15px;
        }
      }
    }
  }
}
</style>
