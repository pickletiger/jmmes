<template>
  <div>
    <vue-good-table 
      :columns="columns" 
      :rows="rows" 
      :lineNumbers="true"
      @on-column-filter="onColumnFilter"
      :pagination-options="{
        enabled: true
      }"
    >
    <template slot="table-row" slot-scope="props">
      <span v-if="props.column.field == '操作'">
        <el-button type="primary" icon="el-icon-edit" circle @click="handleTableData(props)"></el-button>
      </span>
      <span v-else>
        
        {{props.formattedRow[props.column.field]}}
      </span>
    </template>
    <div slot="table-actions">
      <el-dropdown>
        <el-button type="primary">
          车间选择<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>全部</el-dropdown-item>
          <el-dropdown-item>A</el-dropdown-item>
          <el-dropdown-item>D</el-dropdown-item>
          <el-dropdown-item>G</el-dropdown-item>
          <el-dropdown-item>I</el-dropdown-item>
          <el-dropdown-item>K</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary" @click="xxx()">导出</el-button>
      <el-button type="primary" @click="print()">打印</el-button>
      <el-button type="primary" @click="dialogVisible = true">排产</el-button>
    </div>
    </vue-good-table>
    <el-dialog title="信息详情" :visible.sync="hasInfoDialog">
      <el-form :model="form">
        <el-form-item label="产品信息" :label-width="formLabelWidth">
          <el-input v-model="form.product_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工单" :label-width="formLabelWidth">
          <el-input v-model="form.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="零件图号" :label-width="formLabelWidth">
          <el-input v-model="form.figure_number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="材料" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格" :label-width="formLabelWidth">
          <el-input v-model="form.child_material" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开料尺寸" :label-width="formLabelWidth">
          <el-input v-model="form.standard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="加工工艺路线" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="form.count" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工位" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="需求区" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排产时间" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="计划完成" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="完成时间" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hasInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="checkComfirm()" >修 改</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="排产"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <el-form>
        <el-form-item label="排产日期" :label-width="formLabelWidth">
         <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工位" :label-width="formLabelWidth">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="A"></el-checkbox>
            <el-checkbox label="D"></el-checkbox>
            <el-checkbox label="G"></el-checkbox>
            <el-checkbox label="I"></el-checkbox>
            <el-checkbox label="K"></el-checkbox>
            <el-checkbox label="S"></el-checkbox>
            <el-checkbox label="T"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
  
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import axios from "axios";
export default {
  name: "TableList",
  data() {
    return {
      canImport: false,
      hasInfoDialog:false,
      form: {},
      formLabelWidth: "120px",
      dialogVisible: false,
      value1: "",
      checkList: [],
      columns: [
        {
          label: "产品名称",
          field: "product_name",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: " ", // placeholder for filter input
            filterValue: "", // initial populated value for this filter
            filterDropdownItems: [], // dropdown (with selected values) instead of text input
          }
        },
        {
          label: "工单",
          field: "number",
          filterOptions: {
            enabled: true,
            placeholder: " ",
            filterValue: "",
            filterDropdownItems: []
          }
        },
        {
          label: "零件图号",
          field: "figure_number",
          filterOptions: {
            enabled: true,
            placeholder: " ",
            filterValue: "",
            filterDropdownItems: []
          }
        },
        {
          label: "名称",
          field: "name",
          filterOptions: {
            enabled: true,
            placeholder: " ",
            filterValue: "",
            filterDropdownItems: []
          }
        },
        {
          label: "规格",
          field: "child_material",
          filterOptions: {
            enabled: true,
            placeholder: " ",
            filterValue: "",
            filterDropdownItems: []
          }
        },
        {
          label: "开料尺寸",
          field: "standard",
          filterOptions: {
            enabled: true,
            placeholder: " ",
            filterValue: "",
            filterDropdownItems: []
          }
        },
        {
          label: "数量",
          field: "count",
          type: "number",
          filterOptions: {
            enabled: true,
            placeholder: " ",
            filterValue: "",
            filterDropdownItems: []
          }
        },
        {
          label: "工位",
          field: "station",
          filterOptions: {
            enabled: true,
            placeholder: " ",
            filterValue: "",
            filterDropdownItems: []
          }
        },
        {
          label: "完成时间",
          field: "completionTime",
          type:"date",
          filterOptions: {
            enabled: true,
            placeholder: " ",
            filterValue: "",
            filterDropdownItems: []
          }
        },
        {
          label: "操作",
          field: "操作"
        }
      ],
      rows: []
    };
  },
  components: {
    VueGoodTable
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .post(
          `${this.baseURL}/productionplan/list.php`
        )
        .then(this.getDataSucc);
    },
    getDataSucc(res) {
      
      res = res.data;
      // console.log(res);
      if (res.success && res.rows) {
        this.rows = res.rows;
        let columns = this.columns;
        // 需要定义过滤选项
        for (let i = 1; i < columns.length - 1; i++) {
          columns[i].filterOptions.filterDropdownItems = [];
        }
        let data_length = res.rows.length;
        for (let i = 0; i < data_length; i++) {
          // 过滤重复数据作为列筛选条件
          if(columns[0].filterOptions.filterDropdownItems.indexOf(res.rows[i].product_name) == -1){
            columns[0].filterOptions.filterDropdownItems.push(res.rows[i].product_name)
          }
          if(columns[1].filterOptions.filterDropdownItems.indexOf(res.rows[i].number) == -1){
            columns[1].filterOptions.filterDropdownItems.push(res.rows[i].number)
          }
          if(columns[2].filterOptions.filterDropdownItems.indexOf(res.rows[i].figure_number) == -1){
            columns[2].filterOptions.filterDropdownItems.push(res.rows[i].figure_number)
          }
          if(columns[3].filterOptions.filterDropdownItems.indexOf(res.rows[i].name) == -1){
            columns[3].filterOptions.filterDropdownItems.push(res.rows[i].name)
          }
          if(columns[4].filterOptions.filterDropdownItems.indexOf(res.rows[i].child_material) == -1){
            columns[4].filterOptions.filterDropdownItems.push(res.rows[i].child_material)
          }
          if(columns[5].filterOptions.filterDropdownItems.indexOf(res.rows[i].standard) == -1){
            columns[5].filterOptions.filterDropdownItems.push(res.rows[i].standard)
          }
          if(columns[6].filterOptions.filterDropdownItems.indexOf(res.rows[i].count) == -1){
            columns[6].filterOptions.filterDropdownItems.push(res.rows[i].count)
          }
        }
      }
    },
    handleTableData(e) {
      this.form = e.row;
      this.hasInfoDialog = true;
    },
    handleClose(done) {
      done();
    },
    print() {
      window.print(); //打印方法
    },
    importExcel() {
      this.canImport = true;
    },
    onColumnFilter(params) {
      console.log(params.columnFilters);
      // 根据筛选条件拼接sql最后进行update
    },
    xxx() {
      console.log(this.checkList)
    }
  }
};
</script>

<style>
</style>
