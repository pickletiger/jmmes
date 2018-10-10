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
        <!-- <el-button type="primary" v-if="props.row.checkPerson == '' ">审核</el-button>
        <el-button type="info" disabled v-else>审核</el-button> -->
      </span>
      <span v-else>
        {{props.formattedRow[props.column.field]}}
      </span>
    </template>
    <!-- <div slot="table-actions">
      <el-button type="primary">导入</el-button>
    </div> -->
    </vue-good-table>
    
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import axios from 'axios';

export default {
  name: "PlanList",
  components: {
    VueGoodTable
  },
  data() {
    return {
      dialogFormVisible: false,
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
      rows: [
        {
          id:1,
          orderName: "订单1",
          importPerson: "小高",
          importTime: "2018-09-08",
          checkPerson: ''
        },
        {
          id:2,
          orderName: "订单2",
          importPerson: "小周",
          importTime: "2018-09-08",
          checkPerson: '小周'
        }
      ]
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
    showpdf() {
      window.open("static/upload/MarketCheck/testPDF.pdf")
    }
  }
};
</script>

<style lang="">
</style>