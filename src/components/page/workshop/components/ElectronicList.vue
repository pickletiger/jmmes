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
export default {
  name: "ElectronicList",
  components: {
    VueGoodTable
  },
  data() {
    return {
      columns: [
        {
          label: "异常预警",
          field: "warning"
        },
        {
          label: "异常类型",
          field: "type"
        },
        {
          label: "异常情况",
          field: "situation"
        },
        {
          label: "操作",
          field: "operate"
        }
      ],
      rows: [
        {
          id:1,
          warning: "warning",
          type: "type",
          situation: "situation"
        }
      ]
    };
  }
};
</script>

<style lang="">
</style>