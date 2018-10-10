<template>
  <div>
  <el-tabs type="border-card">
    <el-tab-pane label="项目信息">
      <project-main :prodata="this.prodata"></project-main>
    </el-tab-pane>
    <el-tab-pane label="项目进度">
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
      proschdata:[]
    }
  },
  // 监听数据的变化
  watch: {
    lxid : {
      immediate: true,   //如果不加这个属性，父组件第一次传进来的值监听不到
      handler(val) {
        axios.post('https://easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/projectmain',{
          id: val
        }).then(this.getProdataSucc)
        axios.post('https://easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/routersch',{
          id: val
        }).then(this.getProschdataSucc)
      }  
    }
  },
  methods: {
    getProdataSucc(res) {
      this.prodata = res.data.data
      // console.log(this.prodata)
    },
    getProschdataSucc(res) {
      this.proschdata = res.data.data.route
      // console.log(this.proschdata)
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