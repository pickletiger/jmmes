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
          label: "操作账号",
          field: "username"
        },
        {
          label: "操作日期",
          field: "time"
          // type:"date",
          // dateInputFormat: 'YYYY-MM-DD HH:mm:ss',
          // dateOutputFormat: 'YYYY-MM-DD HH:mm:ss'
        },
        {
          label: "操作内容",
          field: "thing"
        },
        {
          label: "操作类型",
          field: "type"
        }
      ],
      rows: []
    };
  },
  mounted(){
  	this.getDataInfo()
  },
  methods:{

    getDataInfo() {
      axios.post(`${this.baseURL}/system/operationloglist.php`).then((res)=> {  //ES6写法
        res = res.data
        // if (res.success && res.data) {
        this.rows = []
        this.rows = res.data
        // }

      });
    }
  }
};
</script>

<style scoped>
</style>