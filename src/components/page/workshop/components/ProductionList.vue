<template>
  <div>
    <vue-good-table 
      :columns="columns" 
      :rows="rows" 
      
      @on-column-filter="selectionChanged"
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
        <el-button type="primary">导出</el-button>
        <el-button type="primary" @click="print()">打印</el-button>
        <el-button type="primary" @click="dialogVisible = true">排产日期</el-button>
      </div>
    </vue-good-table>
    <el-dialog title="信息详情" :visible.sync="hasInfoDialog">
      <el-form :model="form">
        <el-form-item label="车间" :label-width="formLabelWidth">
          <el-input v-model="form.workShop" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格" :label-width="formLabelWidth">
          <el-input v-model="form.specification" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开料尺寸" :label-width="formLabelWidth">
          <el-input v-model="form.size" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工位" :label-width="formLabelWidth">
          <el-input v-model="form.place" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hasInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="checkComfirm()" >修 改</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="排产日期"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
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
      searchItem: "",
      dialogVisible: false,
      value1: "",
      columns: [
        {
          label: "车间",
          field: "workShop",
          filterOptions: {
            enabled: true,
            placeholder: "选择车间",
            filterValue: "",
            filterDropdownItems: ["A", "B", "C"]
          }
        },
        {
          label: "规格",
          field: "specification",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "请下拉选择", // placeholder for filter input
            filterValue: "", // initial populated value for this filter
            filterDropdownItems: [], // dropdown (with selected values) instead of text input
            filterFn: this.columnFilterFn //custom filter function that
            // trigger: "keyup" //only trigger on enter not on keyup
          }
        },
        {
          label: "开料尺寸",
          field: "size",
          type: "number",
          filterOptions: {
            enabled: true,
            placeholder: "请下拉选择",
            filterValue: "",
            filterDropdownItems: ["4620", "1992", "632", "660", "315", "3596"]
            // filterFn: this.columnFilterFn
          }
        },
        {
          label: "工位",
          field: "place",
          filterOptions: {
            enabled: true,
            placeholder: "请下拉选择",
            filterValue: "",
            filterDropdownItems: ["锯床"]
            // filterFn: this.columnFilterFn
          }
        },
        {
          label: "时间",
          field: "date",
          filterOptions: {
            enabled: true,
            placeholder: "请下拉选择",
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
          "https://www.easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/ProductionPlan"
        )
        .then(this.getDataSucc);
    },
    getDataSucc(res) {
      res = res.data;
      if (res.success && res.rows) {
        this.rows = res.rows;
        let columns = this.columns;
        // 需要定义过滤选项为数据
        for (let i = 1; i < columns.length - 1; i++) {
          columns[i].filterOptions.filterDropdownItems = [];
        }
        // 规格过滤
        columns[1].filterOptions.filterDropdownItems[0] = "焊管DN125x4.5";
        columns[1].filterOptions.filterDropdownItems[1] = "槽钢20ad=7";

        columns[3].filterOptions.filterDropdownItems[0] = "锯床";
        var data_length = res.rows.length;
        for (let i = 0; i < data_length; i++) {
          columns[2].filterOptions.filterDropdownItems[i] = res.rows[i].size;
          columns[4].filterOptions.filterDropdownItems[i] = res.rows[i].date;
        }
      }
    },
    selectionChanged(params) {
      // console.log(params.columnFilters);
    },
    handleTableData(e) {
      this.form = e.row;
      this.hasInfoDialog = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    print() {
      window.print(); //打印方法
    },
    importExcel() {
      this.canImport = true;
    }
  }
};
</script>

<style>
</style>
