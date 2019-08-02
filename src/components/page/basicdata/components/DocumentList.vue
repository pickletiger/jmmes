<template>
  <div>   
    <vue-good-table
      v-if="selectedTreeNode.tableFlag==1 || selectedTreeNode.tableFlag==2 || selectedTreeNode.tableFlag==4" 
      :columns="columns" 
      :rows="rows" 
      @on-column-filter="selectionChanged"
      :search-options="{
        enabled: true,
        placeholder: '搜索此表格'
      }"
      :pagination-options="{
        enabled: true,
        mode: 'records'
      }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'operate'">
          <el-button type="primary" icon="el-icon-edit" circle @click="Handlealter(props.row.contactId,props.row.diff)"></el-button>
          <el-button type="primary" icon="el-icon-printer" circle @click="handlePrinter(props.row.contactId,props.row.diff)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteStaff(props.row.contactId,props.row.diff)" ></el-button>
          <el-button type="success" circle @click="copy(props.row.contactId,props.row.diff)">复制</el-button>
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
      <div slot="table-actions">
        <el-button type="primary" v-if="newButtonShow[0]" @click="openWeldingDialog">新建焊接</el-button>        
        <el-button type="primary" v-if="newButtonShow[1]" @click="openCraftsmanshipDialog">新建制造</el-button>
        <el-button type="primary" v-if="newButtonShow[2]" @click="openHeattreatmentDialog">新建热处理</el-button>
        <el-button type="primary" v-if="newButtonShow[3]" @click="openMachiningDialog">新建机加工</el-button>
        <el-button type="primary" v-if="newButtonShow[0] || newButtonShow[1] || newButtonShow[2] || newButtonShow[3]" @click="handlePrinterAll">打印</el-button>
      </div>
    </vue-good-table>
    <!-- 热处理施工单 -->
    <vue-good-table
      v-if="selectedTreeNode.tableFlag==3" 
      :columns="columns1" 
      :rows="rows" 
      @on-column-filter="selectionChanged"
      :search-options="{
        enabled: true,
        placeholder: '搜索此表格'
      }"
      :pagination-options="{
        enabled: true,
        mode: 'records'
      }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'operate'">
          <el-button type="primary" icon="el-icon-edit" circle @click="Handlealter(props.row.contactId,props.row.diff)"></el-button>
          <el-button type="primary" icon="el-icon-printer" circle @click="handlePrinter(props.row.contactId,props.row.diff)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteStaff(props.row.contactId,props.row.diff)" ></el-button>
          <el-button type="success" circle @click="copy(props.row.contactId,props.row.diff)">复制</el-button>
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
      <div slot="table-actions">
        <el-button type="primary" v-if="newButtonShow[0]" @click="openWeldingDialog">新建焊接</el-button>        
        <el-button type="primary" v-if="newButtonShow[1]" @click="openCraftsmanshipDialog">新建制造</el-button>
        <el-button type="primary" v-if="newButtonShow[2]" @click="openHeattreatmentDialog">新建热处理</el-button>
        <el-button type="primary" v-if="newButtonShow[3]" @click="openMachiningDialog">新建机加工</el-button>
        <el-button type="primary" v-if="newButtonShow[0] || newButtonShow[1] || newButtonShow[2] || newButtonShow[3]" @click="handlePrinterAll">打印</el-button>
      </div>
    </vue-good-table>
    <!-- 焊接信息 -->
    <welding-dialog ref="weldcomponent" v-on:refreshTable="GetListData"></welding-dialog>

    <!-- 制造工艺 -->
    <craftsmanship-dialog ref="cratsmanshipcomponent" v-on:refreshTable="GetListData"></craftsmanship-dialog>

     <!-- 热处理 -->
    <heattreatment-dialog ref="heattreatment" v-on:refreshTable="GetListData"></heattreatment-dialog>

    <!-- 机加工 -->
    <machining-dialog ref="machining" v-on:refreshTable="GetListData"></machining-dialog>

  </div>
  
</template>

<script>
import { VueGoodTable } from "vue-good-table"
import axios from "axios"
import WeldingDialog from "./WeldingDialog"
import CraftsmanshipDialog from "./CraftsmanshipDialog"
import HeattreatmentDialog from "./HeattreatmentDialog"
import MachiningDialog from "./MachiningDialog"


export default {
  name: "DocimentList",
  data() {
    return {
      selectedTreeNode : {//左边树选中的节点（表类型，对应的id）
        tableFlag : "",
        relateId : ""
      },
      newButtonShow :[false,false,false,false],                  
      fileinfo:"",
      formLabelWidth: "120px",
      searchItem: "",
      value1:'',
      columns: [
        {
          label: "产品代号",
          field: "productcode"
        },
        {
          label: "工艺卡号",
          field: "processnumber"
        },
        {
          label: "产品名称",
          field: "producname"
        },
        {
          label: "部件名称",
          field: "partname"
        },
        {
          label: "创建日期",
          field: "ctime"
        },
        {
          label: "操作",
          field: "operate"
        }
      ],
      columns1: [
        
        {
          label: "炉号",
          field: "partsDrawingNumber"
        },
        {
          label: "零件图号",
          field: "productDrawingNumber"
        },
        {
          label: "产品型号名称",
          field: "productName"
        },
        {
          label: "零件名称",
          field: "ownPartName"
        },
        {
          label: "创建日期",
          field: "ctime"
        },
        {
          label: "操作",
          field: "operate"
        }
      ],
      rows: [],      
      
      
    };
  },
  components: {
    VueGoodTable,
    WeldingDialog,
    CraftsmanshipDialog,
    HeattreatmentDialog,
    MachiningDialog   
  },
  created () {
    
  },
  methods: {
    //异步获取后台数据
    GetListData (selectedTreeNode) {
      this.selectedTreeNode = selectedTreeNode
      axios.get(`${this.baseURL}/basicdata/document.php?flag=getTableListData&tableFlag=${this.selectedTreeNode.tableFlag}&relateId=${this.selectedTreeNode.relateId}`)
      .then((response) => {
        this.rows = response.data.data        
        switch(this.selectedTreeNode.tableFlag){//显示那种表的新建按钮
          case 1://焊接           
            this.newButtonShow = [true,false,false,false]
            break
          case 2://制造
             this.newButtonShow = [false,true,false,false]
            break
          case 3://热处理
             this.newButtonShow = [false,false,true,false]
            break
          case 4://机加工
             this.newButtonShow = [false,false,false,true]
            break
          default:
             this.newButtonShow = [false,false,false,false]
        }
      })
      .catch(function(error){
        console.log(error)
      })
    },
    //good-table表格的搜索功能
    selectionChanged(params) {
      // console.log(params.columnFilters);
    },
    
    //关闭触发Element-UI的confirm
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
            
    //打开新建焊接模态框
    openWeldingDialog(){
      this.$refs.weldcomponent.openWeldingDialog(this.selectedTreeNode) //触发子组件weldcomponent的函数，下面类似     
    },
    //打开新建焊接模态框
    openCraftsmanshipDialog(){
      this.$refs.cratsmanshipcomponent.openCraftsmanshipDialog(this.selectedTreeNode) //触发子组件cratsmanshipcomponent的函数，下面类似
      
    },
    //打开新建热处理模态框
    openHeattreatmentDialog(){
      this.$refs.heattreatment.openHeattreatmentDialog(this.selectedTreeNode) //触发子组件cratsmanshipcomponent的函数，下面类似
    },

    openMachiningDialog(){
       this.$refs.machining.openMachiningDialog(this.selectedTreeNode) //触发子组件cratsmanshipcomponent的函数，下面类似
    },
    //复制
    copy(contactId,diff){
      this.$confirm('将复制该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        switch(diff){
          case "welding":
            axios.get(`${this.baseURL}/basicdata/document.php?flag=copyWelding&contactId=${contactId}`)
            .then((response) => {
              if(response.data.state == "success"){
                this.GetListData(this.selectedTreeNode)
                this.$message({
                  type: 'success',
                  message: '复制成功'
                })
              }else{
                console.log(response.data.message)
                this.GetListData(this.selectedTreeNode)
                this.$message({
                  type: 'error',
                  message: '复制失败'
                })
              }
            })
            .catch(function(error){
              console.log(error)
            }) 
            break;
          case "craftsmanship":
            axios.get(`${this.baseURL}/basicdata/document.php?flag=copyCraftsmanship&contactId=${contactId}`)
            .then((response) => {
              if(response.data.state == "success"){
                this.GetListData(this.selectedTreeNode)
                this.$message({
                  type: 'success',
                  message: '复制成功'
                })
              }else{
                console.log(response.data.message)
                this.GetListData(this.selectedTreeNode)
                this.$message({
                  type: 'error',
                  message: '复制失败'
                })
              }
            })
            .catch(function(error){
              console.log(error)
            }) 
            break;
          case "heattreatment":
            axios.get(`${this.baseURL}/basicdata/heattreatment.php?flag=copyHeattreatment&contactId=${contactId}`)
            .then((response) => {    
            console.log(response)          
              if(response.data.state == "success"){
                this.GetListData(this.selectedTreeNode)
                this.$message({
                  type: 'success',
                  message: '复制成功'
                })
              }else{
                console.log(response.data.message)
                this.GetListData(this.selectedTreeNode)
                this.$message({
                  type: 'error',
                  message: '复制失败'
                })
              }
            })
            .catch(function(error){
              console.log(error)
            }) 
            break;
          case "machining":
            axios.get(`${this.baseURL}/basicdata/maching.php?flag=copyMachining&contactId=${contactId}`)
            .then((response) => {              
              if(response.data.state == "success"){
                this.GetListData(this.selectedTreeNode)
                this.$message({
                  type: 'success',
                  message: '复制成功'
                })
              }else{
                console.log(response.data.message)
                this.GetListData(this.selectedTreeNode)
                this.$message({
                  type: 'error',
                  message: '复制失败'
                })
              }
            })
            .catch(function(error){
              console.log(error)
            }) 
            break;

        }
        this.$message({
          type: 'success',
          message: '已成功复制'
        });   
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消复制'
        });          
      })
    },
    // 删除列表中的信息
    deleteStaff(contactId,diff) {
      this.$confirm('将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        switch(diff){
          case "welding":
            axios.get(`${this.baseURL}/basicdata/document.php?flag=DeleteWelding&contactId=${contactId}`)
            .then((response) => {
              console.log(response)
              if(response.data.state == "success"){
                this.GetListData(this.selectedTreeNode)
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
              }else{
                console.log(response.data.message)
                this.GetListData(this.selectedTreeNode)
                this.$message({
                  type: 'error',
                  message: '删除失败'
                })
              }
            })
            .catch(function(error){
              console.log(error)
            }) 
            break;
          case "craftsmanship":
            axios.get(`${this.baseURL}/basicdata/document.php?flag=deleteCraftsmanship&contactId=${contactId}`)
            .then((response) => {              
              if(response.data.state == "success"){
                this.GetListData(this.selectedTreeNode)
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
              }else{
                console.log(response.data.message)
                this.GetListData(this.selectedTreeNode)
                this.$message({
                  type: 'error',
                  message: '删除失败'
                })
              }
            })
            .catch(function(error){
              console.log(error)
            }) 
            break;
          case "heattreatment":
            axios.get(`${this.baseURL}/basicdata/heattreatment.php?flag=deleteHeattreatment&contactId=${contactId}`)
            .then((response) => {              
              if(response.data.state == "success"){
                this.GetListData(this.selectedTreeNode)
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
              }else{
                console.log(response.data.message)
                this.GetListData(this.selectedTreeNode)
                this.$message({
                  type: 'error',
                  message: '删除失败'
                })
              }
            })
            .catch(function(error){
              console.log(error)
            }) 
            break;
          case "machining":
            axios.get(`${this.baseURL}/basicdata/maching.php?flag=deleteMachining&contactId=${contactId}`)
            .then((response) => {              
              if(response.data.state == "success"){
                this.GetListData(this.selectedTreeNode)
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
              }else{
                console.log(response.data.message)
                this.GetListData(this.selectedTreeNode)
                this.$message({
                  type: 'error',
                  message: '删除失败'
                })
              }
            })
            .catch(function(error){
              console.log(error)
            }) 
            break;
          default :
            console.log("无效")
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      })
    },   
    //查看及编辑焊接信息
    Handlealter(contactId,diff){
      switch(diff){
        case "welding":
          this.$refs.weldcomponent.Handlealter(contactId,this.selectedTreeNode) 
          break;
        case "craftsmanship":
          this.$refs.cratsmanshipcomponent.Handlealter(contactId,this.selectedTreeNode) 
          break;
        case "heattreatment":
          this.$refs.heattreatment.Handlealter(contactId,this.selectedTreeNode)
          break
        case "machining":
          this.$refs.machining.Handlealter(contactId,this.selectedTreeNode) 
          break
        default :
          console.log("无效")
      }
    },
    //焊接与制造信息打印-单个
    handlePrinter(contactId,diff){
      switch(diff){
        case "welding":
          var myUrl = '#/Weldingprinter?contactId='+contactId
          window.open(myUrl,'_blank')
          break
        case "craftsmanship":
          var myUrl = '#/Craftsmanshipprinter?contactId='+contactId
          window.open(myUrl,'_blank')
          break
        default:
          console.log("这个页面打印未完成，期待有缘人接手写出来^ _ ^")
      }
    },
    //焊接与制造信息打印全部（直接新开页面做打印操作）    
    handlePrinterAll(){      
      switch(this.selectedTreeNode.tableFlag){
        case 1:
          var myUrl = '#/WeldingprinterAll?relateId='+this.selectedTreeNode.relateId
          window.open(myUrl,'_blank')
          break
        case 2:
          var myUrl = '#/CraftsmanshipprinterAll?relateId='+this.selectedTreeNode.relateId
          window.open(myUrl,'_blank')
          break
        default:
          console.log("这个页面全部打印未完成，期待有缘人接手写出来^ _ ^："+this.selectedTreeNode.tableFlag)  
      }
    },
  }
}
</script>

<style scoped>
  
</style>