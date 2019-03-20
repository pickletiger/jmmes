<template>
  <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 云平台交互</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="600px">
            <el-button type="primary" @click="dowmload">下载</el-button>

            
        </div>
        <div class="container">
          <el-container style="height: 600px;">
            <el-container style="height: 600px;">
              <el-aside width="250px">
                  <el-form :inline="true">
                    <el-form-item>
                      <el-input 
                        placeholder="输入关键字"
                        v-model="filterText"
                        style="width:150px">
                      </el-input>
                      <el-button type="primary" @click="handleFifter()">查询</el-button>
                      </el-form-item>
                  </el-form>
                  <!-- tree控件 -->
                  <el-tree
                    v-if="updateTree"
                    class="filter-tree"
                    lazy
                    :load="loadNode"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    :accordion="true"
                    :auto-expand-parent="false"
                    ref="tree">
                  </el-tree>
                </el-aside>
                <!-- 内容 -->
                <el-main>
                  <parttree v-if="this.lx=='xm'" :lxid="lxid"></parttree>
                  <partfile v-if="this.lx=='bj'" :lxid="lxid"></partfile>
                </el-main>
            </el-container>
          </el-container>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
import Parttree from './components/Parttree'
import Partfile from './components/Partfile'
var key = '2'
export default {
    components:{
        Parttree,
        Partfile
    },
    name: 'CloudInteraction',
    data (){
      return {
        tabName:'ordinary',
        lx:'',
        lxid:'',
        filterText: '',
        updateTree:true,
        dialogUpload:false,
        form:{},
        formLabelWidth: "120px",
        defaultProps: {
          children: 'children',
          label: 'name',
          isLeaf:'leaf'
        }
      };
    },
    mounted:function(){
      if(key=='1'){
        this.tabName = 'momentous'
      }
    },

    methods: {
        //下载
        dowmload(){
             window.open(`${this.baseURL}`+"/Test.php")
        },
        // 过滤查询
        handleFifter() {
            // console.log(this.filterText)
            this.updateTree = !this.updateTree
            // 增加延时确保tree组件重新渲染
            setTimeout(()=>{
                this.updateTree = !this.updateTree
            },500)
        },
        handleNodeClick(data) {
        // console.log(data.id)
        // console.log(data.lx)
        this.lx = data.lx
        this.lxid = data.id 
        // console.log(this.$refs.tree.$children)
      },
      // Tree 控件显示
      loadNode(node, resolve){
        // 判断当前是否为查询状态
        // console.log(this.filterText)
        if(!this.filterText){
          // 定义0级节点
          if(node.level === 0) {
            return resolve([{name:'大类',id:0,lx:'dl'}])   
            // console.log(node.data.id)     
          }
          // 大类节点
          if(node.level === 1&node.data.id === 0 ){
            // console.log(node.data.id)
            var fd = new FormData()
            fd.append("flag","type")
            axios.post(`${this.baseURL}/tree.php`,fd).then(function (res){
              // console.log(res.data)
              if(res.data.success){
                return resolve (res.data.data)
              }else {
                return resolve([])
              }
            })  
          }
          // 项目节点
          if(node.level === 2)　{
            // console.log(node.data.name) 
            var fd = new FormData()
            fd.append('flag','project')
            fd.append('type',node.data.name) //node.data 父节点所带参数
            axios.post(`${this.baseURL}/tree.php`,fd).then(function (res){
              // console.log(res)
              if(res.data.success){
                return resolve (res.data.data)
              }else {
                return resolve([])
              }
            })
          }
          // tree 3级树节点
          if(node.level === 3)　{
            // console.log(node.data.id) 
            var fd = new FormData()
            fd.append('flag','mpart')
            fd.append('key',key) //关键零部件判断
            fd.append('id',node.data.id) //node.data 父节点所带参数
            fd.append('name',node.data.zhname) //node.data 父节点所带参数
            fd.append('number',node.data.number) //node.data 父节点所带参数
            axios.post(`${this.baseURL}/tree.php`,fd).then(function (res){
              // console.log(res)
              if(res.data.success){
                return resolve (res.data.data)
              }else {
                return resolve([])
              }
            })
          }
          // 3级以下树子节点
          if(node.level > 3)　{
            // console.log(node.data.id) 
            var fd = new FormData()
            fd.append('flag','part')
            fd.append('key',key) //关键零部件判断
            fd.append('pid',node.data.pid) //node.data 父节点所带参数
            fd.append('modid',node.data.modid) //node.data 父节点所带参数
            fd.append('name',node.data.name) //node.data 父节点所带参数
            fd.append('figure_number',node.data.figure_number) //node.data 父节点所带参数
            fd.append('level',node.level)  //判断当前节点处于何级
            axios.post(`${this.baseURL}/tree.php`,fd).then(function (res){
              // console.log(res)
              if(res.data.success){
                return resolve (res.data.data)
              }else {
                return resolve([])
              }
            })
          }
        } else {
          if(node.level === 0) {
            var fd = new FormData()
            fd.append('flag','treefilter')
            fd.append('modid',this.filterText)
            fd.append('state',1)
            axios.post(`${this.baseURL}/tree.php`,fd).then((res)=>{
              // console.log(res.data.data)
              if(res.data.success == "success"){
                return resolve(res.data.data)
              }else {
                return resolve([])
              }
            })
            // console.log(node.data.id)     
          }
        }
      }
    }
}
</script>
<style scoped>
  
</style>