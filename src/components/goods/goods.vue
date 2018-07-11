<template>
    <div class="goods">
        <!--left-list -->
       <div class="menu-wrapper" ref='menuWrapper'>
           <ul>
               <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':leftIndex === index}" @click="menuClick(index,$event)">
                   <span class="text">
                       <span v-show="item.type>0" class="icon"></span>
                       {{item.name}}
                    </span>
               </li>
           </ul>
       </div>
       <!-- right-list -->
       <div class="foods-wrapper" ref="foodsWrapper">  <!-- ref:类似于jq操作dom元素 -->
           <!-- 外层商品类别遍历goods -->
           <ul>
               <li class="food-list" v-for="(item,index) in goods" :key="index" ref="hook">
                   <h1 class="title">{{item.name}}</h1>
                   <ul>
                       <li v-for="(food,index) in item.foods" :key="index" class="food-item" > 
                           <div class="icon">
                               <img :src="food.icon" width="57" height="57" @click="selectfood(food,$event)"/>
                           </div>
                           <div class="content">
                               <h2 class="name">{{food.name}}</h2>
                               <p class="desc">{{food.description}}</p>
                               <div class="extra">
                                   <span class="count">月售：{{food.sellCount}}份</span>
                                   <span >好评率：{{food.rating}}%</span>
                               </div>
                               <div class="price">
                                   <span class="now">￥{{food.price}}</span>
                                   <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                               </div>
                              <!-- cartcontrol组件+-小按钮 -->
                               <div class="cartControl-wrapper">
                                 <cartControl :food='food'></cartControl>
                               </div>
                           </div>
                       </li>
                   </ul>
               </li>
           </ul>
       </div>
       <!-- 购物车 -->
       <ShopCart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ></ShopCart>

       <!-- datail -->
      <Datail :food='selectfoodA' ref="food"></Datail>
    </div>
</template>
<script>
import BScroll from "better-scroll";
import ShopCart from "../shopcart/shopcart";
import cartControl from "../cartcontrol/cartcontrol";
import Datail from '../foodDatail/datail'


export default {
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectfoodA:{}
    };
  },
  props: ["seller"],
  created() {
    this.$http.get("api/goods").then(res => {
      this.goods = res.body.data;
       console.log(this.goods);
       console.log(this.seller)
      this.$nextTick(() => {
        this._initScroll();
        this.contentHeight();
      });
    });
  },
  components: {
    ShopCart,
    cartControl,
    Datail
  },
  computed: {
    // 获取滑动到相应区间的索引，去和menu-item遍历是的$index对应，联动
    leftIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let h1 = this.listHeight[i]; //当前index 的高度
        let h2 = this.listHeight[i + 1]; //下一个的高度
        if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
          return i;
          // console.log(i);
        }
      }
      return 0;
    },
    selectFoods(){
      let foods = [];
      this.goods.forEach((good)=>{
        this.foods.forEach((food)=>{
          if(food.count){
            foods.push(food)
          }
        })
      })
      return foods;
      console.log(foods)
    }
  },
  methods: {
    // 
    selectfood(food,event){
       if (!event._constructed) {
        return;
      }
      this.selectfoodA  = food;
      this.$refs.food.show()
    },

    // left点击
    menuClick(index, event) {
      /* better-scroll在pc有_constructed属性（区别）pc没有这个事件false*/
      // better-scroll在pc端点击的会触发两次，这里需要设置
      if (!event._constructed) {
        return;
      }
      // 获取dom相对应的节点
      let foodList = this.$refs.hook;
      this.foodsScroll.scrollToElement(foodList[index], 300);
    },
    _initScroll() {
      // 这里用$refs来绑定元素 menuWrapper 获取原生dom
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true //BScroll点击需要设置
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3 //滚动的时候，检测滚动位置 /* better-scroll探针*/
      });
      this.foodsScroll.on("scroll", pos => {
        /* 滚动监听*/
        this.scrollY = Math.abs(Math.round(pos.y)); //先取整，在取正值
      });
    },
    /* 获取右侧类别高度*/
    contentHeight() {
      let foodList = this.$refs.hook; //用$refs来获取dom节点  类似于：jq获取节点  document.getElementByClassName()
      let h = 0;
      this.listHeight.push(h);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        h += item.clientHeight; /* 得到每个类别区间累加后的高度*/
        this.listHeight.push(h);
      }
      // console.log(this.listHeight);
    }
  }
};
</script>
<style scoped lang="less">
.goods {
  position: absolute;
  top: 174px;
  left: 0;
  bottom: 46px;
  width: 100%;
  display: flex;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item {
      display: table;
      height: 54px;
      width: 100%;
      line-height: 14px;
      &.current {
        position: relative;
        z-index: 100;
        margin-top: -1px;
        background: #fff;
        font-weight: 700;
        .text {
          color: red;
        }
      }
      .text {
        display: table-cell;
        width: 100%;
        vertical-align: middle;
        border-bottom: 1px (rgba(7, 17, 27, 0.1)) solid;
        font-size: 12px;
        text-align: center;
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      border-bottom: 1px (rgba(7, 17, 27, 0.1));
      .food-item:last-child {
        margin-bottom: 0;
        border: none;
      }
      .content {
        flex: 1;
        position: relative;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc,
        .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }
        .extra {
          .count {
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
        .cartControl-wrapper {
          position: absolute;
          right: 0;
          bottom: 2px;
        }
      }
    }
  }
}
</style>
