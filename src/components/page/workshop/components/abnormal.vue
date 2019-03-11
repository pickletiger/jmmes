<template>
  <div>
    <vue-good-table
      :columns="columns" 
      :rows="rows" 
      :search-options="{
        enabled: true
      }"
      :lineNumbers="true"
    >
    <template slot="table-row" slot-scope="props">
      <span v-if="props.column.field == 'operate'">
        <el-button type="danger" icon="el-icon-warning" circle></el-button>
      </span>
      <span v-else>
        {{props.formattedRow[props.column.field]}}
      </span>
    </template>
    </vue-good-table>
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import axios from 'axios'
export default {
  name: "abnormal",
  components: {
    VueGoodTable
  },
  data() {
    return {
      columns: [
        {
          label: "异常预警类型",
          field: "type"
        },
        {
          label: "部件名称",
          field: "name"
        },
        {
          label: "班组编号",
          field: "Serial"
        },
        {
          label: "计划返工时间",
          field: "time",
          type:"date",
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'YYYY-M-Do'
        },
        {
          label: "备注",
          field: "Remarks"
        }
      ],
      rows: []
    };
  },
  mounted(){
  	this.getDataInfo()
  },
  methods:{
  	getDataInfo () {
      axios.post(`${this.baseURL}/abnormal.php`).then(this.getDataInfoSucc)
   },
  	 getDataInfoSucc(res){
  	 	let success=res.data.pop()
    	res=res.data
    	if(success){
        this.rows = res
      }
//  	console.log(res)
    }
  }
};
</script>

<style scoped>
</style>