<template>
  <div class="table">
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 已完成项目</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <el-tabs v-model="tabName" @tab-click="handleClick">
          <el-tab-pane label="普通零部件" name="ordinary"></el-tab-pane>
          <el-tab-pane label="关键零部件" name="momentous"></el-tab-pane>
        </el-tabs>
        <div class="container">
          <el-container style="height: 600px;">
            <el-header>
              <el-row :gutter="20">
                <el-col :span="2" :offset="20">
                  <!-- <el-button type="primary" icon="el-icon-upload" @click="dialogUpload = true">导入</el-button> -->
                </el-col>
              </el-row>
            </el-header>
            <el-container style="height: 600px;">
              <el-aside width="250px">
                  <el-form :inline="true">
                    <el-form-item>
                      <el-input 
                        placeholder="输入modid"
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
                  <project v-if="this.lx=='xm'" :lxid="lxid"></project>
                  <part v-if="this.lx=='bj'" :lxid="lxid"></part>
                </el-main>
            </el-container>
          </el-container>
        </div>
         <el-dialog title="项目导入" :visible.sync="dialogUpload">
          <el-form >
            <el-form-item label="项目名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" placeholder="请输入项目名称,如：过山车" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目编号" :label-width="formLabelWidth">
              <el-input v-model="form.number" placeholder="请输入项目编号，如:37#KSC-16A" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目类型" :label-width="formLabelWidth">
              <el-input v-model="form.type" placeholder="请输入项目类型，如：过山车" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目交付时间" :label-width="formLabelWidth">
              <!-- value-format 参数为设置date的类型 -->
              <el-date-picker type="date" value-format="yyyy-MM-dd"  placeholder="选择日期" v-model="form.date" ></el-date-picker>
            </el-form-item>
            <el-upload
              class="upload-demo"
              :before-upload="beforeupload"
              ref="upload"
              drag
              :limit="1"
              :data="form"
              :on-success="handleSuc"
              :action="uploadUrl"
              :auto-upload="false"
              style="margin-left:120px;">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传xls文件</div>
            </el-upload>
          </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogUpload = false">取 消</el-button>
          <el-button type="primary" @click="uploadFile">保存</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import Project from '../components/Project'
import Part from '../components/Part'
var key = '2'
export default {
  name: "CraftFinished",
  inject:["reload"],
  components:{
    Project,
    Part
  },
  data() {
      return {
        tabName:'ordinary',
        lx:'',
        lxid:'',
        uploadUrl:`${this.baseURL}/craft/project_upload.php`,
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
       //头部标签页切换，2普通部件，1关键部件
      handleClick(tab,e){
        this.tabName=tab.name
        switch (tab.name){
          case 'ordinary':
          key = 2
          break
          case 'momentous':
          key = 1
          break
        }
        this.reload()
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
      // 文件上传成功时的钩子
      handleSuc(res,file, fileList) {
        // console.log(res)
        if(res.success == 'success'){
          alert("文件上传成功")
        }else  {
          alert("文件上传失败，文件格式错误或该项目已存在")
        }
        
      },
      // 上传文件前的钩子
      beforeupload (file){
        // console.log(file)
        this.form.ftype = file.type
      },
      // 上传文件
      uploadFile(){
        this.$refs.upload.submit()
      },
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
            fd.append("flag","finished_type")
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
            fd.append('flag','finished_project')
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
};
</script>
<style scoped>
  
</style>