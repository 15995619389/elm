<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar"/>
            </div>
            <div class="content">
                <div class="title">
                    <div class="brand"></div>
                    <div class="name">{{seller.name}}</div>
                </div>
                <div class="description">
                    {{seller.description}} / {{seller.deliveryTime}}分钟送达
                </div>
                <!-- 判断 supports是否存在-->
                <div v-if="seller.supports" class="supports">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span><!-- 取第一条数据 -->
                </div>
            </div>
            <div class="support-count" v-if="seller.supports" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <!-- 公告 -->
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
        </div>
        <!-- background -->
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <!-- 公告详情 -->
        <transition name="fade">
          <div class="detail" v-show="detailShow">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <Star :size="48" :score="seller.score"></Star>
                    </div>
                    <!-- 优惠信息 -->
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul class="supports" v-if="seller.supports">
                      <li v-for="(item,index) in seller.supports" class="support-item" :key="index">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">{{seller.supports[index].description}}</span>
                      </li>
                    </ul>
                    <!-- 商家公告 -->
                     <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                      <p class="content">{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="detailHide">
                <span>关闭</span>
            </div>
        </div>
        </transition>
    </div>
</template>
<script>
import Star from "../star/star";
export default {
  data() {
    return {
      detailShow: false
    };
  },
  // 父组件传过来的数据
  //   props: {
  //     seller: {
  //       type: Object
  //     }
  //   }
  components: {
    Star
  },
  props: ["seller"],
  created() {
    
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  methods: {
    showDetail: function() {
      this.detailShow = true;
    },
    detailHide: function() {
      this.detailShow = false;
    }
  }
};
</script>
<style lang="less" scoped="scoped">
.fade-enter-active, .fade-leave-active {
    transition: opacity 1s
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    opacity: 0
}
.clearfix {
  display: inline-block;
}
.clearfix::after {
  content: ".";
  display: block;
  height: 0;
  line-height: 0;
  clear: both;
  visibility: hidden;
}
.header {
  position: relative;
  overflow: hidden;
  color: #fff;
  background: rgba(7, 17, 27, 0.5);
  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    .avatar {
      display: inline-block;
      vertical-align: top;
      img {
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      margin-left: 16px;
      .title {
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          background: url("brand@2x.png") no-repeat;
          background-size: 30px 18px;
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
          display: inline-block;
        }
      }
      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }
      .supports {
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
        }
        .decrease {
          background: url("decrease_1@2x.png") no-repeat;
          background-size: 12px 12px;
        }
        .discount {
          background: url("discount_1@2x.png") no-repeat;
          background-size: 12px 12px;
        }
        .guarantee {
          background: url("guarantee_1@2x.png") no-repeat;
          background-size: 12px 12px;
        }
        .invoice {
          background: url("invoice_1@2x.png") no-repeat;
          background-size: 12px 12px;
        }
        .special {
          background: url("special_1@2x.png") no-repeat;
          background-size: 12px 12px;
        }
        .text {
          line-height: 12px;
          font-size: 10px;
        }
      }
    }
    .support-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;
      .count {
        vertical-align: top;
        font-size: 10px;
      }
      i {
        margin-left: 2px;
        line-height: 24px;
        font-size: 10px;
      }
    }
  }
  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7, 17, 27, 0.2);
    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      margin-top: 8px;
      width: 22px;
      height: 12px;
      background: url("bulletin@2x.png") no-repeat;
      background-size: 22px 12px;
    }
    .bulletin-text {
      vertical-align: top;
      margin: 0 4px;
      font-size: 10px;
    }
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }

  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-backdrop-filter:blur(10px);
    // backdrop-filter:blur(10px);
    background: rgba(7, 17, 27, 0.8);
    .detail-wrapper {
      width: 100%;
      min-height: 100%;
      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
        .name {
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }
        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        .title {
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;
          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .text {
            padding: 0 12px;
            font-weight: 700;
            font-size: 14px;
          }
        }
        .supports {
          width: 80%;
          margin: 0 auto;
          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: top;
              margin-right: 6px;
            }
            .decrease {
              background: url("decrease_1@2x.png") no-repeat;
              background-size: 16px 16px;
            }
            .discount {
              background: url("discount_1@2x.png") no-repeat;
              background-size: 16px 16px;
            }
            .guarantee {
              background: url("guarantee_1@2x.png") no-repeat;
              background-size: 16px 16px;
            }
            .invoice {
              background: url("invoice_1@2x.png") no-repeat;
              background-size: 16px 16px;
            }
            .special {
              background: url("special_1@2x.png") no-repeat;
              background-size: 16px 16px;
            }
            .text {
              line-height: 12px;
              font-size: 10px;
            }
          }
        }
        .bulletin {
          width: 80%;
          margin: 0 auto;
          .content {
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
          }
        }
      }
    }
    .detail-close {
      position: relative;
      width: 64px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 20px;
    }
  }
}
</style>
