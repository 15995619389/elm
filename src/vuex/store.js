import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


// state:访问状态对象  共享值的作用 不变的
const state={
    count:1,
    num:50,
    str:"是打发斯蒂芬",
    seller:[
        {
            name:"shanghai",
            age:11,
            city:"上海市"
        },
        {
            name:"xian",
            age:1991,
            city:"西安市"
        }
    ]
}
// mutations:触发/改变的状态方法
const mutations={
    // 传值
    add(state,num){
        console.log(state)
        state.count+=num
    },
    aa(state){
        state.count++
    },
    old(state){
        state.count--
    }
}

// getter动态计算装对象  计算属性不推荐使用es6箭头函数 相当于store.js的计算属性
const getters={
    cc:function(){
        return state.num+=8
    }
}

// 异步修改状态对象
const actions={
    addplus(context){
        context.commit('aa')
        setInterval(()=>{
            context.commit('old')
        },3000)
        console.log("我比setInterval函数先执行")
    }
}


export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})