<template>
  <div>
    <vue-good-table
      @on-selected-rows-change="selectionChanged"
      :columns="columns" 
      :rows="rows" 
      :search-options="{
        enabled: true
      }"
      :select-options="{ 
        enabled: true,
        selectOnCheckboxOnly: true
      }"
      ref="my-table"
    >
    <template slot="table-row" slot-scope="props">
      <span v-if="props.column.field == 'operate'">
        <el-button type="primary" @click="handleTabledata(props.row)" >查看</el-button>
        <el-button type="primary" v-if="props.row.checkPerson == '' " @click="handleTableData(props)">审核</el-button>
        <el-button type="info" disabled v-else>审核</el-button>
      </span>
      <span v-else>
        {{props.formattedRow[props.column.field]}}
      </span>
    </template>
    <div slot="table-actions">
      <el-button type="primary" @click="canupload = true">新建</el-button>
      <!-- <el-button type="primary" @click="batchCheckComfirm()">审核</el-button> -->
    </div>
    </vue-good-table>
    <el-dialog title="信息详情" :visible.sync="dialogFormVisible">
        <el-form >
          <el-form-item label="订单编号" :label-width="formLabelWidth">
            <el-input v-model="formData.orderName"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="导入人员" :label-width="formLabelWidth">
            <el-input v-model="formData.importPerson" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="导入时间"  :label-width="formLabelWidth">
            <el-input v-model="formData.importTime" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="审核人" :label-width="formLabelWidth">
            <el-input v-model="formData.checkPerson" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="checkComfirm()" >确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="新建" :visible.sync="canupload">
      <el-form >
        <el-form-item label="订单编号" :label-width="formLabelWidth">
          <el-input v-model="form.orderNumber"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导入人员" :label-width="formLabelWidth">
          <el-input v-model="form.importPerson"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="审核人" :label-width="formLabelWidth">
          <el-input v-model="form.checkPerson"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导入时间" :label-width="formLabelWidth">
          <!-- value-format 参数为设置date的类型 -->
          <el-date-picker type="date" value-format="yyyy-MM-dd"  placeholder="选择日期" v-model="form.importTime" ></el-date-picker>
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
          <div class="el-upload__tip" slot="tip">只能上传pdf文件，且不超过500kb</div>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="canupload = false">取消</el-button>
        <el-button type="primary" @click="uploadFile" >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import axios from 'axios';
import vueshowpdf from 'vueshowpdf'

export default {
  name: "MarketList",
  components: {
    VueGoodTable,
    vueshowpdf
  },
  data() {
    return {
      form:{},
      formData:{},
      fileList:[],
      canupload: false,
      dialogFormVisible: false,
      formLabelWidth: "80px",
      uploadUrl:`${this.baseURL}/market/market_upload.php`,
      multipleSelection: [],
      notCheckSelection: [], 
      columns: [
        {
          label: "订单编号",
          field: "orderName"
        },
        {
          label: "导入人员",
          field: "importPerson"
        },
        {
          label: "导入时间",
          field: "importTime"
        },
        {
          label: "审核人",
          field: "checkPerson"
        },
        {
          label: "操作",
          field: "operate"
        }
      ],
      rows: []
    };
  },
  mounted() {
    this.getListData ();
  },
  methods: {
    // getData() {
    //   axios.post(`${this.baseURL}/market/market.php`).then(this.getDataSucc)
    // },
    getDataSucc(res) {
      res = res.data;
      if(res.success && res.rows){
        this.rows = res.rows;
      }
    },
    creatRefresh(response) {
      // console.log(response)
      this.getListData()
    },
    handleTableData(e) {
      this.formData = e.row;
      this.dialogFormVisible = true;
    },
    checkComfirm() {
      this.dialogFormVisible = false
      var fd = new FormData()
      fd.append("flag","updata")
      fd.append("ordernumber",this.formData.orderName)
      fd.append("checkPerson",this.formData.checkPerson)
      axios.post(`${this.baseURL}/market/market_pdf.php`,fd)
      .then((res) => {
        console.log(res)
        if(res.data.success=='success'){
          this.$message({
            message: '审核成功！',
            type: 'success'
          })
        }else{
           this.$message({
            message: '审核失败！',
            type: 'error'
          })
        }
          
      })
      
    },
    handleTabledata(row) {
      console.log(row.orderName)
      var fd = new FormData()
      this.checkrows = []
      fd.append("flag","pdf")
      fd.append("ordernumber",row.orderName)
      axios.post(`${this.baseURL}/market/market_pdf.php`,fd)
      .then((res) => {
          console.log(res)
          this.showpdf(res.data.data.pdf)
      })
    },
    showpdf(res) {
      // 查看pdf
      let myUrl = "http://"+res
      // console.log(myUrl)
      window.open(myUrl,'_blank')
    },
      // 上传文件
    uploadFile(){
      this.$refs.upload.submit()
      // console.log(1)
      // var fd = new FormData()
      // fd.append("orderNumber",this.form.orderNumber)//订单编号
      // fd.append("importPerson",this.form.importPerson)//导入人员
      // fd.append("importTime",this.form.importTime)//导入时间
      // fd.append("checkPerson",this.form.checkPerson)//审核人
      // // console.log(fd)
      // axios.post(`${this.baseURL}/market/market_upload.php`,fd).then(this.creatRefresh)  
    },
      // 上传文件前的钩子
    beforeupload (file){
      console.log(file.type)
      this.form.ftype = file.type
    },
    selectionChanged(val) {
      // 存入选择项的值(数组)
      this.multipleSelection = val;
    },
       // 上传文件
    uploadFile(){
      this.$refs.upload.submit()
    },
      // 文件上传成功时的钩子
    handleSuc(res,file, fileList) {
      this.canupload = false
      console.log(res)
      // if(res.success == 'success'){
      //   this.dialogUpload = false
      //   alert("文件上传成功")
      //   this.updateTree = !this.updateTree
      //   // 增加延时确保tree组件重新渲染
      //   setTimeout(()=>{
      //     this.updateTree = !this.updateTree
      //   },50)
      // }else  {
      //   alert("文件上传失败，文件格式错误或该项目已存在")
      // }
      this.getListData()
    },
    //获取后台数据
    getListData () {
        axios.post(`${this.baseURL}/market/market.php`).then((response) => {
            this.rows = []
            this.rows = response.data.data
          //  console.log(response.data.data)
        })
    },
    // batchCheckComfirm() {
    //   console.log(this.multipleSelection)
    //   let multipleSelection = this.multipleSelection
    //   // 判断是否有选中未审核订单
    //   if(multipleSelection.selectedRows.length == 0){
    //     this.$message({
    //       message: '请先选择未审核的订单~',
    //       type: 'warning'
    //     });
    //   }else{
    //     let selectedOptions = multipleSelection.selectedRows.length;

    //     for(let i=0;i < selectedOptions; i++) {
    //       if(multipleSelection.selectedRows[i].checkPerson == '') {
    //         this.notCheckSelection.push(multipleSelection.selectedRows[i]);
    //       }
    //     }

    //     let checkNums = this.notCheckSelection.length;
    //     for(let i=0;i < checkNums; i++) {
    //       this.notCheckSelection[i].checkPerson = '管理员';
    //     }
    //     this.$message({
    //       message: '成功审核'+ this.notCheckSelection.length +'项订单！',
    //       type: 'success'
    //     });
    //     multipleSelection.selectedRows = [];
    //     this.notCheckSelection = [];
    //   }
    // }
  }
};
</script>

<style scoped>
</style>