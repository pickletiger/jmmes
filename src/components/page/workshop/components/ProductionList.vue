<template>
  <div>
    <vue-good-table 
      :columns="columns" 
      :rows="rows" 
      
      @on-column-filter="selectionChanged"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == '操作'">
          <el-button type="primary" icon="el-icon-edit" circle @click="dialogFormVisible = true"></el-button>
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
      <div slot="table-actions">
        <el-button type="primary">导入</el-button>
        <el-button type="primary">导出</el-button>
        <el-button type="primary">打印</el-button>
        <el-button type="primary" @click="dialogVisible = true">排产日期</el-button>
      </div>
    </vue-good-table>
    <el-dialog title="信息详情" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="规格" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="开料尺寸" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
export default {
  name: "TableList",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      searchItem: "",
      dialogVisible: false,
      value1:'',
      columns: [
        {
          label: "规格",
          field: "specification",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "请下拉选择", // placeholder for filter input
            filterValue: "", // initial populated value for this filter
            filterDropdownItems: [
              "焊管DN125X4.5",
              "槽钢20ad=7",
              "H型钢200X200"
            ], // dropdown (with selected values) instead of text input
            filterFn: this.columnFilterFn, //custom filter function that
            trigger: "keyup" //only trigger on enter not on keyup
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
            filterDropdownItems: ["4月28日"]
          }
        },
        {
          label: "操作",
          field: "操作"
        }
      ],
      rows: [
        {
          id: 1,
          specification: "焊管DN125X4.5",
          size: "4620",
          place: "锯床",
          date: "4月28日",
          btn: `<button onclick="xx()">点击</button>`
        },
        {
          id: 2,
          specification: "槽钢20ad=7",
          size: "1992",
          place: "锯床",
          date: "4月28日"
        },
        {
          id: 3,
          specification: "槽钢20ad=7",
          size: "632",
          place: "锯床",
          date: "4月28日"
        },
        {
          id: 4,
          specification: "槽钢20ad=7",
          size: "660",
          place: "锯床",
          date: "4月28日"
        },
        {
          id: 5,
          specification: "H型钢200X200",
          size: "315",
          place: "锯床",
          date: "4月28日"
        },
        {
          id: 6,
          specification: "H型钢200X200",
          size: "3596",
          place: "锯床",
          date: "4月28日"
        }
      ]
    };
  },
  components: {
    VueGoodTable
  },
  methods: {
    selectionChanged(params) {
      console.log(params.columnFilters);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};


</script>

<style>
</style>
