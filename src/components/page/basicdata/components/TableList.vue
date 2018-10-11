<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      @on-column-filter="selectionChanged"
      :search-options="{enabled: true}"
      :pagination-options="{
        enabled: true,
        mode: 'records'
      }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'operate'">
          <el-button type="primary" icon="el-icon-edit" circle @click="dialogFormVisible = true"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteStaff" ></el-button>
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
      <div slot="table-actions">
        <el-button type="primary" @click="dialogFormVisible = true">新建</el-button>
        <el-button type="primary">导入</el-button>
      </div>
    </vue-good-table>
    <el-dialog title="信息详情" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="工号" :label-width="formLabelWidth">
            <el-input  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机"  :label-width="formLabelWidth">
            <el-input  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth">
            <el-input  auto-complete="off"></el-input>
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
import axios from 'axios'
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
        },
        {
          label: "操作",
          field: "operate"
        }
      ],
      rows: [
/*        {
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
        }*/
      ]
    };
  },
  components: {
    VueGoodTable
  },
    created () {
        this.getStuffInfoData()
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
    },


      //获取后台数据
      getStuffInfoData () {
          axios.post('https://www.easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/StuffInfo').then((response) => {
              this.rows = response.data.rows;
              console.log(response.data.rows)
          })
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
      },
    // 删除员工
    deleteStaff() {
        this.$confirm('将删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
  }
};
</script>

<style>
</style>
