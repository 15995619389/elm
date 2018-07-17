import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'

Vue.use(Router)

export default new Router({ 
  routes: [
    {
      path: '',
      redirect:'/goods',//路由重定向
    },
    {
      path:'/goods',
      component:Goods,
      meta:{
        title:'店鋪首頁'
      }
    },
    {
      path:'/ratings',
      component:Ratings,
      meta:{
        title:'用戶評論'
      }
    },
    {
      path:'/seller',
      component:Seller,
      meta:{
        title:'商家商品列表'
      }
    }
  ]
})
