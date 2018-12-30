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
          field: "Serial",
          filterOptions: {
            enabled: true,
            placeholder: "请输入",
            filterValue: "",
            filterDropdownItems: []
          }
        },
        {
          label: "部件名称",
          field: "name",
          filterOptions: {
            enabled: true,
            placeholder: "请输入",
            filterValue: "",
            filterDropdownItems: []
          }
        },
        {
          label: "产品类型",
          field: "type",
          filterOptions: {
            enabled: true,
            placeholder: "请输入",
            filterValue: "",
            filterDropdownItems: []
          }
        },
        {
          label: "计划完成时间",
          field: "time",
          type:"date",
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'YYYY-M-Do',
          filterOptions: {
            enabled: true,
            placeholder: "请输入",
            filterValue: "",
            filterDropdownItems: []
          }
        },
        {
          label: "工作进度",
          field: "schedule",
          filterOptions: {
            enabled: true,
            placeholder: "请输入",
            filterValue: "",
            filterDropdownItems: []
          }
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
      axios.post(`${this.baseURL}/workingcondition.php`).then(this.getDataInfoSucc)
   },
  	 getDataInfoSucc(res){
  	 	let success = res.data.pop()
  	 	res = res.data
    	if(success){
        this.rows = res
      }
//  	console.log(res)
    }
  }
};
</script>

<style lang="">
</style>