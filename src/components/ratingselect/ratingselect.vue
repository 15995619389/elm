<template>
    <div class="ratingselect">
        <!-- rating-type评价三种类型 -->
        <div class="rating-type">
            <span class="block positive" @click="select()" :class="{'active':selectType==0}"></span>
            <span class="block positive" @click="select()" :class="{'active':selectType==1}"></span>
            <span class="block positive" @click="select()" :class="{'active':selectType==2}"></span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:{
        
    }
};
</script>
<style lang="less" scoped>
.ratingselect {
  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    border: 1px solid (rgba(7, 17, 27, 0.1));
    font-size: 0;
    .block {
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      line-height: 16px;
      border-radius: 1px;
      font-size: 12px;
      color: rgb(77, 85, 93);
    }
    .active{
       color: #fff ;
    }
  }
}
</style>
