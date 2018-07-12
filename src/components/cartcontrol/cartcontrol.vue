<template>
    <div class="cartcontrol">
        <div class="cart-decrease" transition="move" @click.stop.prevent="remove" v-show="food.count>0">
            <!-- 一个层平移  一个层滚动 -->
            <span class="inner icon-remove_circle_outline">-</span>
        </div>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <!-- click.stop.prevent:阻止事件冒泡 -->
        <div class="cart-add icon-add_circle" @click.stop.prevent="addcart">+</div>
    </div>
</template>
<script>
// 直接获取不到这个属性
import Vue from "vue";
export default {
  props: ["food"],
  // created(){
  //   console.log(this.food)
  // },
  methods: {
    addcart(event) {
      /* better-scroll在pc有_constructed属性（区别）pc没有这个事件false*/
      // better-scroll在pc端点击的会触发两次，这里需要设置
      if (!event._constructed) {
        return;
      }
      // 判断count是否存在
      if (!this.food.count) {
        //添加一个不存在的字段 也就第一次 所以count赋为1
        // 所以要用vue.set来获取count
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }

      // 派发一个事件
      // 当添加一个商品时，派发一个事件，把这个event.target dom对象，作为cart.add事件参数传入，然后在goods组件写一个方法
      // this.$emit('cart.add',event.target)
    },
    remove(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.cartcontrol {
  font-size: 0;
  .cart-decrease,
  .cart-add {
    display: inline-block;
    transition: all 0.4s linear;
    line-height: 16px;
    font-size: 14px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: cadetblue;
    color: #fff;
    text-align: center;
    &.move-transition {
      opacity: 1;
      transition: translate3d(0, 0, 0);
      .inner {
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
        transition: all 0.4s linear;
        transform: rotate(0);
      }
    }
    &.move-enter,
    &.move-leave {
      opacity: 0;
      transform: translate3d(24px, 0, 0);
      .inner {
        transform: rotate(180deg);
      }
    }
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding: 2px 5px 0;
    text-align: center;
    font-size: 10px;
    color: red;
    font-weight: 700;
    .cart-add {
      display: inline-block;
      padding: 6px;
      color: rgb(0, 160, 220);
    }
  }
}
</style>
