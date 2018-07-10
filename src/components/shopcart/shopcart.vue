<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
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
    </div>
</template>
<script>
export default {
  props:{
    selectFoods:{
      type:Array,
      default(){
        return [
          {
            price:50,
            count:1
          }
        ]
      }
    },
    // 
    deliveryPrice:{
      type:Number,
      default:0
    },
    // 配送价
    minPrice:{
      type:Number,
      default:0
    }
  },
  computed:{
    totalPrice(){
      let total = 0;
      this.selectFoods.forEach((foods) => {
        total = foods.price*foods.count  //商品总价 = selectFoods下商品的单价*商品个数
      });
      return total;
      console.log(total)
    },
    // 选中的商品总数
    totalCount(){
      let count = 0;
      this.selectFoods.forEach((foods)=>{
        count += foods.count
      });
      return count;
    },
    // 结算状态切换
    payDesc(){
      if(this.totalPrice === 0){
        return `￥${this.minPrice}元起送`
      }else if(this.totalPrice<this.minPrice){//当总价小于配送价
        // 顶一个变量  求差值
        let diff = this.minPrice - this.totalPrice
        return `还差${diff}元起送`
      }else{
        return `去结算`
      }
    },
    // 切换class高亮
    payClass(){
      if(this.totalPrice<this.minPrice){
        return 'not-enough'
      }else{
        return 'enough'
      }
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
          &.heiglight{
            background: rgb(0, 160, 220)
          }
          .icon-shopping_cart{
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
            &.highlight{
              color: #fff
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
        &.heiglight{
          color: #fff
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
        &.not-enough{
          background: #2b343c
        }
        &.enough{
          background: #00b43c;
          color:#fff;
        }
      }
    }
  }
}
</style>
