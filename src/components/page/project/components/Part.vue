<template>
  <div>
    <!-- el-tabs的v-model对应el-tab-pane的name ,即显示对应标签页 -->
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane name="first" label="部件信息">
        <part-information></part-information>
      </el-tab-pane>
      <el-tab-pane name="second" label="部件进度">
        <part-sch :partschdata="this.partschdata" @change="handleChange"></part-sch>
      </el-tab-pane>
      <el-tab-pane name="third" label="部件工艺卡">
        <part-card ></part-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import PartInformation from './PartInformation'
import PartSch from './PartSch'
import PartCard from './PartCard'
export default {
  name: 'ProjectPart',
  components: {
    PartInformation,
    PartSch,
    PartCard
  },
  props: {
    lxid: String
  },
  data () {
    return {
      partschdata: [],
      mylxid: '',
      activeName: 'first'
    }
  },// 监听数据的变化
  watch: {
    lxid : {
      immediate: true,   //如果不加这个属性，父组件第一次传进来的值监听不到
      handler(val) {
        // console.log(val)
        this.mylxid = val
        axios.post('https://easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/routersch',{
          id: val
        }).then(this.getPartschdataSucc)
      }  
    },
    // 声明mylxid的原因:vue不允许直接修改props的值，通过声明赋值新变量重新渲染组件
    mylxid: {
      immediate: true,   //如果不加这个属性，父组件第一次传进来的值监听不到
      handler(val) {
        // console.log(val)
        axios.post('https://easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/routersch',{
          id: val
        }).then(this.getPartschdataSucc)
      }  
    }
  },
  methods: {
    getPartschdataSucc(res) {
      this.partschdata = res.data.data.route
      // console.log(this.partschdata)
    },
    handleChange(data) {
      console.log(data)
      this.mylxid = data
      this.activeName = 'first'
    }
  }
}
</script>
<style scoped>
 
</style>