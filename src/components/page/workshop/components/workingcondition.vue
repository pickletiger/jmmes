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
  name: "workingcondition",
  components: {
    VueGoodTable
  },
  data() {
    return {
      columns: [
        {
          label: "班组编号",
          field: "Serial"
        },
        {
          label: "部件名称",
          field: "name"
        },
        {
          label: "产品类型",
          field: "type"
        },
        {
          label: "计划完成时间",
          field: "time",
          type:"date",
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'YYYY-M-Do'
        },
        {
          label: "工作进度",
          field: "schedule"
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
      axios.post('https://www.easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/workingcondition').then(this.getDataInfoSucc)
   },
  	 getDataInfoSucc(res){
    	res=res.data
    	if(res.success && res.rows){
        this.rows = res.rows
      }
//  	console.log(res)
    }
  }
};
</script>

<style lang="">
</style>