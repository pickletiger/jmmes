<template>
  <div>
  <el-tabs type="border-card">
    <el-tab-pane label="项目信息">
      <project-main :prodata="this.prodata"></project-main>
    </el-tab-pane>    
    <el-tab-pane label="子部件进度">
      <p>黑色为正在进行中状态；绿色为已完成状态；灰色为未开工状态</p>
      <project-sch :proschdata="this.proschdata"></project-sch>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import axios from 'axios'
import ProjectMain from '../components/ProjectMain'
import ProjectSch from '../components/ProjectSch'
export default {
  name: 'Project',
  components: {
    ProjectMain,
    ProjectSch
  },
  props: {
    lxid: String
  },
  data () {
    return {
      prodata:{},
      proschdata:{}
    }
  },
  // 监听数据的变化
  watch: {
    lxid : {
      immediate: true,   //如果不加这个属性，父组件第一次传进来的值监听不到
      handler(val) {        
        // console.log(val)
        var fd = new FormData() //定义获取prodata的传值
        fd.append('id',val)
        fd.append('flag','project')
        axios.post(`${this.baseURL}/project.php`,fd).then(this.getProdataSucc)
        var sch = new FormData() //定义获取proschdata的传值
        sch.append('id',val)
        sch.append('flag','prosch')
        axios.post(`${this.baseURL}/project.php`,sch).then(this.getProschdataSucc)
      }  
    }
  },
  methods: {
    getProdataSucc(res) {
      // console.log(res.data)
      this.prodata = {}
      if(res.data.success =='success'){
        this.prodata = res.data
      }
    },
    getProschdataSucc(res) {
      // console.log(res.data)
      if(res.data.success) {
        this.proschdata = res.data
      }else {
        this.proschdata = {"key":"default"}
      }
    }
  }
}
</script>
<style scoped>
  .project-main {
    margin-top: -20px;
  }
  .header {
    text-align: center;
    font-size: 24px;
    line-height: 60px;
    background: #fff;
    border-bottom: #eee 1px solid;
    margin-top: -10px;
  }
  .main {
    position: relative;
    width: 100%;
  }
</style>