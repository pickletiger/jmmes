<template>
  <div>
    <vue-good-table
      :columns="columns" 
      :rows="rows" 
      :search-options="{
        enabled: true
      }"
      :select-options="{ 
        enabled: true,
        selectOnCheckboxOnly: true
      }"
    >
    <template slot="table-row" slot-scope="props">
      <span v-if="props.column.field == 'operate'">
        <el-button type="primary" @click="handleTabledata(props.row)" >查看</el-button>
        <!-- <el-button type="primary" v-if="props.row.checkPerson == '' ">审核</el-button>
        <el-button type="info" disabled v-else>审核</el-button> -->
      </span>
      <span v-else>
        {{props.formattedRow[props.column.field]}}
      </span>
    </template>
   <div slot="table-actions">
      <!-- <el-button type="primary" @click="Comfirm()">审核</el-button> -->
    </div>
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
      ]
    };
  },
  mounted() {
     this.getListData ();
  },
  methods: {
    // getData() {
    //   axios.post('https://www.easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/MarketCheck').then(this.getDataSucc)
    // },
    getDataSucc(res) {
      res = res.data;
      if(res.success && res.rows){
        this.rows = res.rows;
      }
    },
    getListData () {
    axios.post(`${this.baseURL}/market/market.php`).then((response) => {
        this.rows = []
        this.rows = response.data.data
      //  console.log(response.data.data)
    })
},
    handleTabledata(row) {
      // console.log(row.id)
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
    // comfirm() {

    // }
  }
};
</script>

<style scoped>
</style>