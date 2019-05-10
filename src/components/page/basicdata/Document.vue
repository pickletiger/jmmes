<template>
  <div class="table">
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 文档管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="container">
           <el-container style="height: 600px;">
                <el-aside width="250px">  
                    <el-button type="primary" @click="openNewTreeDialog">新建节点</el-button>
                    <el-button type="danger" v-if="deltetButtonVisible" @click="deltetTreeNode">删除</el-button>
                    <el-dialog
                        title="树节点新建"
                        :visible.sync="dialogNewTreeVisible"
                        width="30%">
                        <el-form ref="form" :model="treeForm" label-width="120px">
                            <el-form-item label="工艺类型">
                                <el-select v-model="treeForm.tableFlag"  placeholder="请选择表类型">
                                    <el-option label="转马类"  value="0"></el-option>
                                    <el-option label="滑行类" value="1"></el-option>
                                    <el-option label="陀螺类" value="2"></el-option>
                                    <el-option label="飞行塔类" value="3"></el-option>
                                    <el-option label="赛车类" value="4"></el-option>
                                    <el-option label="自控飞机类" value="5"></el-option>
                                    <el-option label="观览车类" value="6"></el-option>
                                    <el-option label="小火车类" value="7"></el-option>
                                    <el-option label="架空游览车类" value="8"></el-option>
                                    <el-option label="水上游乐设施" value="9"></el-option>
                                    <el-option label="碰碰车类" value="10"></el-option>
                                    <el-option label="电池车类" value="11"></el-option>
                                    <el-option label="摇摆类" value="12"></el-option>
                                    <el-option label="回旋类" value="13"></el-option>
                                    <el-option label="其他类" value="14"></el-option>
                                    <el-option label="科技娱乐类" value="15"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="产品名称">
                                <el-input v-model="treeForm.proName"></el-input>
                            </el-form-item>
                            <el-form-item label="产品代号/图号">
                                <el-input v-model="treeForm.proCode"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" :disabled="saveButtonShow" @click="saveTreeList($event)">立即创建</el-button>                               
                                <el-button @click="dialogNewTreeVisible = false">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>               
                    <!-- tree控件 -->
                    <el-tree 
                        :data="treeData" 
                        :props="defaultProps" 
                        :highlight-current="true"
                        @node-click="handleNodeClick">
                    </el-tree>
                </el-aside>
                <!-- 右边显示内容 -->
                <el-main>
                  <document-list ref="docList"></document-list>
                </el-main>
            </el-container>           
        </div>
    </div>
</template>

<script>
import axios from "axios"
import DocumentList from "./components/DocumentList"
export default {
    name: 'Document',
    components: {
        DocumentList
    },
    data() {
        return {
            dialogNewTreeVisible:false,
            saveButtonShow:false,
            deltetButtonVisible:false,
            selectedTreeNode:"",
            treeForm:{
                tableFlag:"",
                proName:"",
                proCode:"",

            },
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            treeData: [
                {
                    label: '焊接工艺及检验记录',
                    children: []
                },
                {
                    label: '机械制造工艺及检验表',
                    children: []
                },
            ]
        }
    },
    created() {
        this.getTreeData()
    },
    methods :{
        //打开时加载树信息
        getTreeData(){
            axios.get(`${this.baseURL}/basicdata/document.php?flag=getTreeListData`)
            .then((response) => {
                this.treeData = response.data.data
            })
            .catch(function(error){
                console.log(error)
            })
        },
        //选中树节点
        handleNodeClick(data) {
            if(data.tableFlag==1){
                let selectedTreeNode = {
                    label : data.label,
                    tableFlag : data.tableFlag,
                    relateId : data.relateId
                }
                this.selectedTreeNode = selectedTreeNode
                this.deltetButtonVisible = true
            }
            if(!data.children){
                let selectedTreeNode = {
                    label : data.label,
                    tableFlag : data.thereFlag,
                    relateId : data.thereId
                }
                this.$refs.docList.GetListData(selectedTreeNode)
            }
            // if(!data.children){                
                // let selectedTreeNode = {
                //     label : data.label,
                //     tableFlag : data.tableFlag,
                //     relateId : data.relateId
                // }
                // this.selectedTreeNode = selectedTreeNode
            //     this.$refs.docList.GetListData(selectedTreeNode)
            //     this.deltetButtonVisible = true
            // }           
        },
        //删除树节点
        deltetTreeNode(){
            this.$confirm(`即将删除节点“${this.selectedTreeNode.label}”, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                switch(this.selectedTreeNode.tableFlag){
                    case 1://焊接                                 
                        axios.get(`${this.baseURL}/basicdata/document.php?flag=deleteTreeNodeWelding&relateId=${this.selectedTreeNode.relateId}`)
                        .then((response) => {
                            if(response.data.state == "success"){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'                                    
                                })
                                let selectedTreeNode = {
                                    label : "",
                                    tableFlag : "",
                                    relateId : ""
                                }
                                this.selectedTreeNode = selectedTreeNode
                                this.$refs.docList.GetListData(selectedTreeNode)
                                this.getTreeData()
                            }else{
                                console.log(response)
                                this.$message({
                                    type: 'error',
                                    message: '删除失败'                                    
                                })
                            }                            
                        })
                        .catch(function(error){
                            console.log(error)
                        })
                        break
                    case 2://制造
                        axios.get(`${this.baseURL}/basicdata/document.php?flag=deleteTreeNodeCraftsmanship&relateId=${this.selectedTreeNode.relateId}`)
                        .then((response) => {
                            if(response.data.state == "success"){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'                                    
                                })
                                let selectedTreeNode = {
                                    label : "",
                                    tableFlag : "",
                                    relateId : ""
                                }
                                this.selectedTreeNode = selectedTreeNode
                                this.$refs.docList.GetListData(selectedTreeNode)
                                this.getTreeData()
                            }else{
                                console.log(response)
                                this.$message({
                                    type: 'error',
                                    message: '删除失败'                                    
                                })
                            }                            
                        })
                        .catch(function(error){
                            console.log(error)
                        })
                        break                       
                }
            }).catch((error) => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            })
        },
        //打开新建节点框
        openNewTreeDialog() {
            this.treeForm ={
                tableFlag:"",
                proName:"",
                proCode:""
            }
            this.dialogNewTreeVisible = true
        },
        //保存新节点
        saveTreeList(event) {            
            this.saveButtonShow = true
            let fd = new FormData()
            fd.append("flag","saveTreeListData")
            fd.append("tableFlag",this.treeForm.tableFlag)
            fd.append("proname",this.treeForm.proName)
            fd.append("procode",this.treeForm.proCode)
            
            axios.post(`${this.baseURL}/basicdata/document.php`,fd)
            .then((response) => {               
                console.log(response)
                if(response.data.state == "success"){
                    this.getTreeData()
                    this.$message({
                        showClose: true,
                        message: '新建成功',
                        type: 'success'
                    })
                    this.dialogNewTreeVisible = false
                    this.saveButtonShow = false
                }else{
                    this.$message({
                        showClose: true,
                        message: '新建失败',
                        type: 'error'
                    })
                    this.dialogNewTreeVisible = false
                    this.saveButtonShow = false
                }
            })
            .catch(function(error){
                console.log(error)
                this.$message({
                    showClose: true,
                    message: '新建失败',
                    type: 'error'
                })
                this.saveButtonShow = false
            })
            
        }
    }
}
</script>
<style scoped>
  
</style>