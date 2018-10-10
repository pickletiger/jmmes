<template>
  <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 未审核项目</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <el-container>
            <el-aside width="200px">
              <el-form :inline="true">
                <el-form-item>
                  <el-input 
                    placeholder="输入关键字"
                    v-model="filterText"
                    style="width:120px">
                  </el-input>
                  <el-button type="primary">查询</el-button>
                  </el-form-item>
              </el-form>
              <!-- tree控件 -->
              <el-tree
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
              <project v-if="this.lx=='xm'" :lxid="lxid"></project>
              <part v-if="this.lx=='bj'" :lxid="lxid"></part>
            </el-main>
          </el-container>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Project from '../components/Project'
import Part from '../components/Part'

export default {
  name: "MarketUnreview",
  components:{
    Project,
    Part
  },
  data() {
      return {
        lx:'',
        lxid:'',
        filterText: '',
        data:[],
        defaultProps: {
          children: 'children',
          label: 'name',
          isLeaf:'leaf'
        }
      };
    },
    methods: {
      // Tree点击事件
      handleNodeClick(data) {
        // console.log(data.id)
        // console.log(data.lx)
        this.lx = data.lx
        this.lxid = data.id 
        // console.log(this.$refs.tree.$children)
      },
      // Tree 控件显示
      loadNode(node, resolve){
        // 定义0级菜单
        if(node.level === 0) {
          return resolve([{name:'大类1',id:0,lx:'dl'},{name:'大类2',id:1,lx:'dl'},{name:'大类3',id:2,lx:'dl'}])
        }
        // 定义大类1菜单
        if(node.level === 1&node.data.id === 0 ){
          // console.log(node.data.id)
          axios.post('https://easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/project',{
            fid:node.data.id,
            lx: node.data.lx,
            level:node.level
          }).then(function (res){
            // console.log(res)
            if(res.data.success){
              return resolve (res.data.data.pdata)
            }
          })  
        }
        // 定义大类2菜单
        if(node.level === 1&node.data.id === 1 ){
          // console.log(node.data.id)
          axios.post('https://easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/project',{
            fid:node.data.id,
            lx: node.data.lx,
            level:node.level
          }).then(function (res){
            // console.log(res)
            if(res.data.success){
              return resolve (res.data.data.pdata)
            }
          })
        }
        // 定义大类3菜单
        if(node.level === 1&node.data.id === 2 ){
          // console.log(node.data.id)
          axios.post('https://easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/project',{
            fid:node.data.id,
            lx: node.data.lx,
            level:node.level
          }).then(function (res){
            // console.log(res)
            if(res.data.success){
              return resolve (res.data.data.pdata)
            }
          })
        }
        if(node.level > 1 && node.level<4)　{
          // console.log(node.data.id)
          axios.post('https://easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/project',{
            fid:node.data.id,
            lx: node.data.lx,
            level:node.level
          }).then(function (res){
            // console.log(res)
            if(res.data.success){
              return resolve (res.data.data.pdata)
            }
          })
        }
        if(node.level === 4)　{
          // console.log(node.data)
          axios.post('https://easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/project',{
            fid:node.data.id,
            lx: node.data.lx,
            level:node.level
          }).then(function (res){
            // console.log(res)
            if(res.data.success){
              return resolve (res.data.data.pdata)
            }
          })
        }
      }
    }
};
</script>
<style scoped>
  
</style>