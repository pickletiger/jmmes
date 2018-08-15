<template>
  <div>
    <vue-good-table 
      :columns="columns" 
      :rows="rows" 
    >
    <div slot="table-actions">
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
      <el-button type="primary">打印</el-button>
    </div>
    </vue-good-table>
  </div>
  
</template>

<script>
import { VueGoodTable } from "vue-good-table";
export default {
  name: "TableList",
  data () {
    return {
      columns: [
        {
          label: '规格',
          field: 'specification',
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: '请下拉选择', // placeholder for filter input
            filterValue: '', // initial populated value for this filter
            filterDropdownItems: ['焊管DN125X4.5','槽钢20ad=7','H型钢200X200'], // dropdown (with selected values) instead of text input
            filterFn: this.columnFilterFn, //custom filter function that
            trigger: 'keyup', //only trigger on enter not on keyup 
          }
        },
        {
          label: '开料尺寸',
          field: 'size',
          type: 'number',
          filterOptions: {
            enabled: true,
            placeholder: '请下拉选择',
            filterValue: '',
            filterDropdownItems: ['4620', '1992', '632','660','315','3596']
            // filterFn: this.columnFilterFn
          }
        },
        {
          label: '工位',
          field: 'place',
          filterOptions: {
            enabled: true,
            placeholder: '请下拉选择',
            filterValue: '',
            filterDropdownItems: ['锯床']
            // filterFn: this.columnFilterFn
          }
        },
        {
          label: '时间',
          field: 'date',
          filterOptions: {
            enabled: true,
            placeholder: '请下拉选择',
            filterValue: '',
            filterDropdownItems: ['4月28日']
          }
        },
      ],
      rows: [
        { id:1, specification:"焊管DN125X4.5", size: '4620', place: '锯床',date: "4月28日" },
        { id:2, specification:"槽钢20ad=7", size: '1992', place: '锯床', date: "4月28日" },
        { id:3, specification:"槽钢20ad=7", size: '632', place: '锯床', date: "4月28日" },
        { id:4, specification:"槽钢20ad=7", size: '660', place: '锯床', date: "4月28日" },
        { id:5, specification:"H型钢200X200", size: '315', place: '锯床', date: "4月28日" },
        { id:6, specification:"H型钢200X200", size: '3596', place: '锯床', date: "4月28日" },
      ]
    }
  },
  components: {
    VueGoodTable
  }
};
</script>

<style>
</style>
