<template>
<div>
    <p>{{$store.state.count}} -- {{count}}--{{cc}}</p>
    <div>
        <button @click="$store.commit('add',10)">++</button>
        <!-- <button @click="$store.commit('old')">--</button> -->
        <button @click="old">--</button>
        <button @click="addplus">add++</button>
    </div>
</div>
</template>
 <script>
//  1.
import store from "@/vuex/store";
// mapState:辅助函数 在组件的计算属性中调用  获取多个状态时使用
// mapMutations:在methods中调用vuex下的mutations里的方法
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  // computed:mapState({
  //     count:state=>state.count+10
  // }),
  // 常用方式
  // computed:mapState(['count']),

  computed: {
    ...mapState(["count"]),
    ...mapGetters(["cc"])
  },
  methods: {
    ...mapMutations(["add", "old"]),
    ...mapActions(["addplus"])
  },
  store
};
</script>

<style scoped lang="less">
</style>

