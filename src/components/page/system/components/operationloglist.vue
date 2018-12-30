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
  name: "operationloglist",
  components: {
    VueGoodTable
  },
  data() {
    return {
      columns: [
       {
          label: "账号",
          field: "account"
        },
        {
          label: "操作内容",
          field: "content"
        },
        {
          label: "操作日期",
          field: "data",
          type:"date",
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'YYYY-MM-Do'
        },
        {
          label: "操作时间",
          field: "time",
          type:"date",
          dateInputFormat: 'HH:mm:ss',
          dateOutputFormat: 'HH:mm:ss'
        },
        {
          label: "操作人员",
          field: "man"
        }
      ],
      rows: [],
      account:'admin'
    };
  },
  mounted(){
  	this.getDataInfo()
  },
  methods:{
  	getDataInfo () {
  		axios.get(`${this.baseURL}/operationloglist.php`,{
  		  params:{
  			  account:this.account
  		  }
  		}).then(this.getDataInfoSucc)
   },
  	 getDataInfoSucc(res){
	 	let success=res.data.pop()
    	res=res.data
    	if(success){
        this.rows = res
     }
    }
  }
};
</script>

<style lang="">
</style>