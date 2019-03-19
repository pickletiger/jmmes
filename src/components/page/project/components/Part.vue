<template>
  <div>
    <!-- el-tabs的v-model对应el-tab-pane的name ,即显示对应标签页 -->
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane name="first" label="部件信息">
        <part-information :partdata="this.partdata" @change="handleChange"></part-information>
      </el-tab-pane>
      <el-tab-pane name="second" label="子部件进度">
        <p>黑色为正在进行中状态；绿色为已完成状态；灰色为未开工状态</p>
        <part-sch :partschdata="this.partschdata" @change="handleChange"></part-sch>
      </el-tab-pane>
      <el-tab-pane name="third" label="信息汇总">
        <el-form ref="form"  label-width="100px">
          <el-form-item label="不合格次数">
            <el-col :span="10">
              <el-input v-model="partfile.notNum"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="不合格原因">
            <el-col :span="10">
              <el-input v-model="partfile.remark"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="退产记录">
            <el-col :span="10">
              <el-input v-model="partfile.backMark"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="退产原因">
            <el-col :span="10">
              <el-input v-model="partfile.reason"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="工位">
            <el-col :span="10">
              <el-input v-model="partfile.station"></el-input>
            </el-col>
          </el-form-item>
          <img v-for="i in item"  :src="i" class="img"/>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import PartInformation from './PartInformation'
import PartSch from './PartSch'
export default {
  name: 'ProjectPart',
  components: {
    PartInformation,
    PartSch
  },
  props: {
    lxid: String
  },
  data () {
    return {
      partdata:{},
      partschdata: {},
      partfile:{},
      mylxid: '',
      item:{},
      activeName: 'first'
    }
  },// 监听数据的变化
  watch: {
    lxid : {
      immediate: true,   //如果不加这个属性，父组件第一次传进来的值监听不到
      handler(val) {
        // console.log(val)
        this.mylxid = val
      }  
    },
    // 声明mylxid的原因:vue不允许直接修改props的值，通过声明赋值新变量重新渲染组件
    mylxid: {
      immediate: true,   //如果不加这个属性，父组件第一次传进来的值监听不到
      handler(val) {
        // console.log(val)
        var fd = new FormData() //定义获取partdata的传值
        fd.append('id',val)
        fd.append('flag','part')
        axios.post(`${this.baseURL}/part.php`,fd).then(this.getPartdataSucc)
        var sch = new FormData() //定义获取partschdata的传值
        sch.append('id',val)
        sch.append('flag','partsch')
        axios.post(`${this.baseURL}/part.php`,sch).then(this.getPartschdataSucc)

        var file = new FormData() //定义获取partschdata的传值
        file.append('id',val)
        file.append('flag','partfile')
        axios.post(`${this.baseURL}/part.php`,file).then(this.getPartfiledataSucc)
      }  
    }
  },
  methods: {
    getPartdataSucc(res) {
      console.log(res.data)
      this.partdata = {}
      if(res.data.success =='success'){
        this.partdata = res.data
        this.activeName = 'first'
      }
    },
    getPartfiledataSucc(res) {
      console.log(res.data)
      this.partfile = {}
      this.item = {}
      if(res.data.success =='success'){
        this.partfile = res.data
        this.item = res.data.photourl
      }
    },
    getPartschdataSucc(res) {
      // console.log(res.data)
      this.partschdata = {"item":[]}
      if(res.data.success) {
        this.partschdata = res.data
      }else {
        this.partschdata = {"key":"default"}
      }
    },
    handleChange(id) {
      // console.log(id)
      this.mylxid = ''
      this.mylxid = id
      this.activeName = 'first'
      // console.log(this.lxid)
    }
  }
}
</script>
<style scoped>
  .img{
    padding-left:7.5% ;
    height: 600px;
    width: 600px;
  }
</style>