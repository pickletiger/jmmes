<template>
  <div>
    <vue-good-table
      :columns="columns" 
      :rows="rows" 
      :search-options="{
        enabled: true
      }"
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
      <el-button type="primary">导入</el-button>
    </div>
    </vue-good-table>
    <el-dialog title="信息详情" :visible.sync="dialogFormVisible">
        <el-form :model="form">
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
          <el-button type="primary" @click="checkComfirm()" >审 核</el-button>
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
      formData:{},
      dialogFormVisible: false,
      formLabelWidth: "80px",
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
        message: '审核成功',
        type: 'success'
      });
    },
    showpdf() {
      window.open("static/upload/MarketCheck/testPDF.pdf")
    }
  }
};
</script>

<style lang="">
</style>