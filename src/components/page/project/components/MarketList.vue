<template>
  <div>
    <vue-good-table
      @on-selected-rows-change="selectionChanged"
      :columns="columns" 
      :rows="rows" 
      :select-options="{ 
        enabled: true,
        selectOnCheckboxOnly: true
      }"
      ref="my-table"
    >
    <template slot="table-row" slot-scope="props">
      <span v-if="props.column.field == 'operate'">
        <el-button type="primary" @click="showpdf()" >查看</el-button>
        <el-button type="primary" v-if="props.row.checkPerson == '' " @click="handleTableData(props)">审核</el-button>
        <el-button type="info" disabled v-else>审核</el-button>
      </span>
      <span v-else>
        {{props.formattedRow[props.column.field]}}
      </span>
    </template>
    <div slot="table-actions">
      <el-button type="primary" @click="canupload = true">新建</el-button>
      <el-button type="primary" @click="batchCheckComfirm()">审核</el-button>
    </div>
    </vue-good-table>
    <el-dialog title="信息详情" :visible.sync="dialogFormVisible">
        <el-form >
          <el-form-item label="订单名称" :label-width="formLabelWidth">
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
        <el-form-item label="订单名称" :label-width="formLabelWidth">
          <el-input v-model="form.name"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导入人员" :label-width="formLabelWidth">
          <el-input v-model="form.number"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="审核人" :label-width="formLabelWidth">
          <el-input v-model="form.type"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导入时间" :label-width="formLabelWidth">
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
          <div class="el-upload__tip" slot="tip">只能上传pdf文件，且不超过500kb</div>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="canupload = false">取 消</el-button>
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
      canupload: false,
      dialogFormVisible: false,
      formLabelWidth: "80px",
      uploadUrl:`${this.baseURL}/market/upload.php`,
      multipleSelection: [],
      notCheckSelection: [], 
      columns: [
        {
          label: "订单名称",
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
    this.getData();
  },
  methods: {
    getData() {
      axios.post(`${this.baseURL}/market/upload.php`).then(this.getDataSucc)
    },
    getDataSucc(res) {
      res = res.data;
      if(res.success && res.rows){
        this.rows = res.rows;
      }
    },
    handleTableData(e) {
      this.formData = e.row;
      this.dialogFormVisible = true;
    },
    checkComfirm() {
      this.dialogFormVisible = false;
      this.formData.checkPerson = "管理员";
      this.$message({
        message: '审核成功！',
        type: 'success'
      });
    },
    showpdf() {
      // 查看pdf
      window.open("static/upload/MarketCheck/testPDF.pdf")
    },
      // 上传文件
    uploadFile(){
      this.$refs.upload.submit()
    },
      // 上传文件前的钩子
    beforeupload (file){
      // console.log(file)
      this.form.ftype = file.type
    },
    selectionChanged(val) {
      // 存入选择项的值(数组)
      this.multipleSelection = val;
    },
      // 文件上传成功时的钩子
    handleSuc(res,file, fileList) {
      // console.log(res)
      if(res.success == 'success'){
        this.dialogUpload = false
        alert("文件上传成功")
        this.updateTree = !this.updateTree
        // 增加延时确保tree组件重新渲染
        setTimeout(()=>{
          this.updateTree = !this.updateTree
        },50)
      }else  {
        alert("文件上传失败，文件格式错误或该项目已存在")
      }
      
    },
    batchCheckComfirm() {
      let multipleSelection = this.multipleSelection;
      // 判断是否有选中未审核订单
      if(multipleSelection.selectedRows.length == 0){
        this.$message({
          message: '请先选择未审核的订单~',
          type: 'warning'
        });
      }else{
        let selectedOptions = multipleSelection.selectedRows.length;

        for(let i=0;i < selectedOptions; i++) {
          if(multipleSelection.selectedRows[i].checkPerson == '') {
            this.notCheckSelection.push(multipleSelection.selectedRows[i]);
          }
        }

        let checkNums = this.notCheckSelection.length;
        for(let i=0;i < checkNums; i++) {
          this.notCheckSelection[i].checkPerson = '管理员';
        }
        this.$message({
          message: '成功审核'+ this.notCheckSelection.length +'项订单！',
          type: 'success'
        });
        multipleSelection.selectedRows = [];
        this.notCheckSelection = [];
      }
    }
  }
};
</script>

<style lang="">
</style>