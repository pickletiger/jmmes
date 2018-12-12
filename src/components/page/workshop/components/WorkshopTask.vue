<template>
  <div>
    <vue-good-table
      :columns="columns" 
      :rows="rows"
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
    <div slot="table-actions">
        <el-button type="primary" @click="xxx()">导出</el-button>
        <el-button type="primary" @click="print()">打印</el-button>
    </div>
    </vue-good-table>
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import axios from 'axios'
export default {
  name: "Workshoptask",
  components: {
    VueGoodTable
  },
  data() {
    return {
      columns: [
        {
          label: "车间编号",
          field: "Serial",
          width:'80px',
          filterOptions: {
            enabled: true, //启用列过滤器
            placeholder: "选择车间",//要在列过滤器输入上使用的占位符
            filterValue: "",//预填充过滤器
            filterDropdownItems: []//允许为过滤器创建下拉列表而不是输入
          }
        },
        {
          label: "任务名称",
          field: "name",
          filterOptions: {
            enabled: true,
            placeholder: "请输入",
            filterValue: "",
            filterDropdownItems: []
          }
        },
        {
          label: "执行班组",
          field: "Group",
          width:"80px",
          filterOptions: {
            enabled: true,
            placeholder: "选择组别",
            filterValue: "",
            filterDropdownItems: []
          }
        },
        {
          label: "班组长姓名",
          field: "bzzname",
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
          width:"130px",
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
          label: "是否完成",
          field: "finished",
          filterOptions: {
            enabled: true,
            placeholder: "请选择",
            filterValue: "",
            filterDropdownItems: [],
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
  created(){
  	this.getDataInfo()
  },
  methods:{
  	getDataInfo () {
      axios({
				  method: 'post',
				  url: `${this.baseURL}/WorkshopTask.php`,
				  dataType:'json'
				}).then(this.getDataInfoSucc)
   },
  	 getDataInfoSucc(res){
    	res=res.data
//  	console.log(res)
    	if(res[res.length-1].success){
				res.pop()
        this.rows = res;
        this.handleChange(this.rows);
      }
//  	console.log(res)
    },
    handleChange (arr) {
    	let Arr = [];
    	let group=[];
    	for(let i of arr) {
    		Arr.push(i.Serial);
    		group.push(i.Group);
    	}
    	Arr = [...new Set(Arr)];
    	group = [...new Set(group)];
    	for(let i = 1; i < this.columns.length - 1; i++) {
          this.columns[i].filterOptions.filterDropdownItems = [];
        }
    	Arr.forEach((item,key)=> {
    		this.columns[0].filterOptions.filterDropdownItems[key]=item;
    	});
    	group.forEach((item,key)=> {
    		this.columns[2].filterOptions.filterDropdownItems[key]=item;
    	});
    	this.columns[5].filterOptions.filterDropdownItems.splice(0,0,"是","否");
    },
    print() {
      window.print(); //打印方法
    }
  }
};
</script>

<style lang="">
</style>