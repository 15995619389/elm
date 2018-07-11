<template>
  <div id="app">
    <div class="header">
      <Header :seller="seller"></Header>
    </div>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 路由外联  把seller参数传递过去 -->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import Header from '@/components/header/header.vue'
// import '../common/stylus/mixin.styl'
export default {
  name: 'App',
  data() {
    return {
      seller:{}
    }
  },
  created(){
    this.$http.get('/api/seller').then( (res) =>{
      console.log(res)
      if(res.body.errno == 0){
        this.seller = res.body.data
      }
    })
    
  },
  components:{
    Header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7, 17, blue, alpha)
}
.tab .tab-item{
  flex: 1;
  text-align: center
}
.tab .tab-item a{
  display: block;
  font-size: 14px;
  color: rgb(77, 85, 93)
}
.tab .tab-item .router-link-active{
  color: rgb(240, 20, 20)
}
</style>
