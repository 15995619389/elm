<template>
   <div>
      <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <span>({{seller.ratingCount}})</span>
                    <span>月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark"> 
                    <li>
                        <h2>起送价</h2>
                        <div>
                            <span>{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li>
                        <h2>商家配送</h2>
                         <div>
                            <span>{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li>
                        <h2>平均配送时间</h2>
                         <div>
                            <span>{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <!-- 收藏 -->
                <!-- <div class="favorite">
                    <span class="icon-favorite" :class="{'active':favorite}"></span>
                    <span class="text">{{favoriteText}}</span>
                </div> -->
            </div>
            <Split></Split>
            <!-- 公告与活动 -->
            <div class="bulletin">
              <h1 class="title">公告与活动</h1>
              <div class="content-wrapper">
                <p class="content">{{seller.bulletin}}</p>
              </div>
              <ul v-if="seller.supports">
                <li v-for="(item,index) in seller.supports" :key="index">
                  <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                  <span class="text">{{seller.supports[index].description}}</span>
                </li>
              </ul>
            </div>
            <Split></Split>
            <!-- 商家实景 -->
            <div class="pics">
              <h1 class="title">商家实景</h1>
              <div class="pics-warpper" ref="picsWarpper">
                <ul>
                  <li v-for="(itemImg,index) in seller.pics" :key="index">
                    <img :src="itemImg" width="120" height="90" @click="showImgPerview(itemImg)"/>
                  </li>
                </ul>
              </div>
            </div>
            <Split></Split>
            <!-- 商家信息 -->
            <div class="info">
              <h1 class="title">商家信息</h1>
              <ul>
                <li v-for="(itemInfo,index) in seller.infos" :key="index">{{itemInfo}}</li>
              </ul>
            </div>
        </div>
            <Imga ref="preview"></Imga>        
    </div>
   </div>
</template>
<script>
import Bscroll from "better-scroll";
import Split from "../../components/split/split";
import Imga from "../../components/lgImg/img";
export default {
  data() {
    return {
      // favorite:(()=>{
      //     return loadFromLocal(this.seller.id)
      // })
      tubImg: []
    };
  },

  //   计算属性
  computed: {
    favoriteText() {
      return this.favorite ? "已收藏" : "收藏";
    }
  },
  props: ["seller"],
  // created():生命周期  实例组件已创建完成，属性已绑定，但dom还未生成，$el属性还不存在
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  // mounted():生命周期  模板编译/挂载之后
  // mounted() {
  //   this._initScroll();
  // },
  // 监听属性watch()
  watch: {
    seller() {
      this._initScroll();
    }
  },
  components: {
    Split,
    Imga
  },
  methods: {
    //这个方法是让页面可以滚动
    _initScroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    showImgPerview(url) {
      console.log("111");
      this.$refs.preview.show(url);
    }
  }
};
</script>
<style scoped lang="less">
.seller {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    position: relative;
    padding: 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .desc {
      padding-bottom: 18px;
      border-bottom: 1px solid #ddd;
      font-size: 0;
      span {
        display: inline-block;
        margin-right: 12px;
        line-height: 18px;
        vertical-align: top;
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }
    .remark {
      display: flex;
      padding-top: 18px;
      li {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        h2 {
          margin-bottom: 4px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        div {
          line-height: 24px;
          font-size: 10px;
          color: rgb(7, 17, 27);
          span {
            font-size: 24px;
          }
        }
      }
      li:last-child {
        border: none;
      }
    }
  }
  .bulletin {
    padding: 18px 18px 0 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .content-wrapper {
      padding: 0 12px 16px 12px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .content {
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
      }
    }
    ul {
      li {
        padding: 10px 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: top;
          margin-right: 6px;
          margin-top: 6px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
        }
        .decrease {
          background: url("../header/decrease_1@2x.png") no-repeat;
          background-size: 16px 16px;
        }
        .discount {
          background: url("../header/discount_1@2x.png") no-repeat;
          background-size: 16px 16px;
        }
        .guarantee {
          background: url("../header/guarantee_1@2x.png") no-repeat;
          background-size: 16px 16px;
        }
        .invoice {
          background: url("../header/invoice_1@2x.png") no-repeat;
          background-size: 16px 16px;
        }
        .special {
          background: url("../header/special_1@2x.png") no-repeat;
          background-size: 16px 16px;
        }
        .text {
          line-height: 24px;
          padding: 0 8px;
          font-size: 12px;
          color: rgb(77, 85, 93);
        }
      }
    }
    li:last-child {
      border: none;
    }
  }
  .pics {
    padding: 18px;
    title {
      margin-bottom: 12px;
      line-height: 14px;
      color: rgb(7, 17, 27);
    }
    .pics-warpper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      margin-top: 10px;
      ul {
        font-size: 0;
        li {
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;
        }
        li:last-child {
          margin: 0;
        }
      }
    }
  }
  .info {
    padding: 18px 18px 0 18px;
    color: rgb(7, 17, 27);
    h1 {
      padding-bottom: 12px;
      line-height: 14px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      font-size: 14px;
    }
    ul {
      li {
        padding: 16px 12px;
        line-height: 16px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        font-size: 12px;
      }
      li:last-child {
        border: none;
      }
    }
  }
}
</style>


