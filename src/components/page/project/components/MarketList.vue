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
      <el-button type="primary" @click="canupload = true">导入</el-button>
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
    <el-dialog title="导入" :visible.sync="canupload">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传pdf文件，且不超过500kb</div>
      </el-upload>
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
      formData:{},
      canupload: false,
      dialogFormVisible: false,
      formLabelWidth: "80px",
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
      axios.post('https://www.easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/MarketCheck').then(this.getDataSucc)
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
    selectionChanged(val) {
      // 存入选择项的值(数组)
      this.multipleSelection = val;
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