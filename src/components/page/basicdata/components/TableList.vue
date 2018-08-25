<template>
  <div>
    <vue-good-table 
      :columns="columns" 
      :rows="rows" 
      @on-cell-click="openDialog"
      @on-column-filter="selectionChanged"
    >
      <div slot="table-actions">
        <el-button type="primary">新建</el-button>
        <el-button type="primary">导入</el-button>
      </div>
    </vue-good-table>
    <el-dialog title="信息详情" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="工号" :label-width="formLabelWidth">
            <el-input v-model="form.number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
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
      value1:'',
      columns: [
        {
          label: "工号",
          field: "specification",
          
        },
        {
          label: "姓名",
          field: "size"
        },
        {
          label: "手机",
          field: "place"
        },
        {
          label: "职位",
          field: "date"
        }
      ],
      rows: [
        {
          id: 1,
          specification: "1",
          size: "张三",
          place: "13854215475",
          date: "车间主任"
        },
        {
          id: 2,
          specification: "2",
          size: "李四",
          place: "13555215485",
          date: "工人"
        },
        {
          id: 3,
          specification: "3",
          size: "某某",
          place: "13545215785",
          date: "经理"
        }
      ]
    };
  },
  components: {
    VueGoodTable
  },
  methods: {
    openDialog(params) {
      // console.log(this.columns[0])
      this.dialogFormVisible = true;
      // console.log(this.dialogFormVisible);
    },
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
