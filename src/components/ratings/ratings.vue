<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <!-- left -->
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <!-- right -->
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度：</span>
                        <!-- 星星评分组件 -->
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分：</span>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <Split></Split>
            <ratingSelect :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"  @selecttype="set" @content="con"></ratingSelect>
            <div class="rating-wrapper">
                <ul>
                    <li class="rating-item" v-for="(item,index) in ratings" :key="index">
                        <!-- 头像img -->
                        <div class="avatar">
                            <img :src="item.avatar" width="28" height="28"/>
                        </div>
                        <div class="content">
                            <h1 class="name">{{item.username}}</h1>
                            <div class="star-wrapper">
                                <span class="delivery" v-show="item.deliveryTime">{{item.deliveryTime}}</span>
                            </div>
                            <p class="text">{{item.text}}</p>
                            <div class="recommend" v-show="item.recommend && item.recommend.length">
                                <span class="icon-thumb_up"></span>
                                <span class="item" v-for="(items,index) in item.recommend" :key="index">{{items}}</span>
                            </div>
                            <div class="time">{{item.rateTime | formatDate}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from "better-scroll";
import Split from "../split/split";
import ratingSelect from "../ratingselect/ratingselect";
import { formatDate } from "../../common/js/date";

const all = 2;
export default {
  data() {
    return {
      ratings: [],
      selectType: all,
      onlyContent: true
    };
  },
  created() {
    this.init();
  },
  props: ["seller"],
  components: {
    Split,
    ratingSelect
  },
  methods: {
    init() {
      this.$http.get("api/ratings").then(res => {
        this.ratings = res.body.data;
        // console.log(this.ratings);
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        });
      });
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
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>
<style scoped lang='less'>
.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    display: flex;
    padding: 18px 0;
    .overview-left {
      flex: 0 0 137px;
      padding: 6px 0;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;
      @media only screen and (max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }
      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }
      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }
      .rank {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;
      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }
      .score-wrapper {
        margin-bottom: 8px;
        font-size: 0;
        .title {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .score {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(255, 153, 0);
        }
      }
      .delivery-wrapper {
        font-size: 0;
        .title {
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .delivery {
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
  .rating-wrapper {
    padding: 0 18px;
    li {
      display: flex;
      padding: 18px 0;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;
        img {
          border-radius: 50%;
        }
      }
      .content {
        position: relative;
        flex: 1;
        .name {
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }
        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0;
          .star {
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
          }
          .delivery {
            display: inline-block;
            vertical-align: top;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .text {
          margin-bottom: 8px;
          line-height: 18px;
          color: rgb(7, 17, 27);
          font-size: 12px;
        }
        .recommend {
          line-height: 16px;
          font-size: 0;
          .icon-thumb_up,
          .item {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
          }
          .item{
              padding: 0 6px;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
              color: rgb(147, 153, 159);
              background: #fff;
          }
        }
        .time{
             position: absolute;
            top: 0;
            right: 0;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>
