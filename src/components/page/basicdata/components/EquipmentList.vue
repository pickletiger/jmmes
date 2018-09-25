<template>
  <div>
    <vue-good-table 
      :columns="columns" 
      :rows="rows" 
      @on-column-filter="selectionChanged"
      :search-options="{enabled: true}"
      :pagination-options="{enabled: true,mode: 'records'}"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'operate'">
          <el-button type="primary"   @click="handleTabledata(props.row.id)">查看</el-button>
          <el-button type="primary" icon="el-icon-edit" circle @click="handleData(props.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteStaff(props.row.id)" ></el-button>
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
    <!-- 设备详情 -->
    <el-dialog title="信息详情" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="设备编号" :label-width="formLabelWidth">
            <el-input v-model="dialogFormdata.number"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备名称" :label-width="formLabelWidth">
            <el-input v-model="dialogFormdata.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备状态"  :label-width="formLabelWidth">
            <el-input v-model="dialogFormdata.state" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="工作中心名称" :label-width="formLabelWidth">
            <el-input v-model="dialogFormdata.workcenter" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="点检要求" :label-width="formLabelWidth">
            <el-input v-model="dialogFormdata.checkrequest" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="点检位置描述" :label-width="formLabelWidth">
            <el-input v-model="dialogFormdata.tallyposition" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="点检周期" :label-width="formLabelWidth">
            <el-input v-model="dialogFormdata.tallycycle" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 设备点检记录 -->
    <el-dialog title="点检记录" :visible.sync="dialogTableVisible">
        <el-form :model="form">
          <vue-good-table 
            :columns="checkcolumns" 
            :rows="checkrows" 
            @on-column-filter="selectionChanged"
            :search-options="{enabled: true}"
            :pagination-options="{enabled: true,mode: 'records',perPage: 5,perPageDropdown: [5],dropdownAllowAll: false,}"
          />
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
        </div>
    </el-dialog>
  </div>
  
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import axios from 'axios'
export default {
  name: "EquipmentList",
  data() {
    return {
      dialogFormVisible: false,
      dialogTableVisible: false,
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
      dialogFormdata: {},
      formLabelWidth: "120px",
      searchItem: "",
      value1:'',
      columns: [
        {
          label: "设备编号",
          field: "number",
        },
        {
          label: "设备名称",
          field: "name"
        },
        {
          label: "设备状态",
          field: "state"
        },
        {
          label: "工作中心名称",
          field: "workcenter"
        },
        {
          label: "点检要求",
          field: "checkrequest"
        },{
          label: "点检位置描述",
          field: "tallyposition"
        },{
          label: "点检周期",
          field: "tallycycle"
        },
        {
          label: "操作",
          field: "operate"
        }
      ],
      rows: [],
      checkcolumns: [
        {
          label: "设备编号",
          field: "number",
        },
        {
          label: "设备名称",
          field: "name"
        },
        {
          label: "点检结果",
          field: "checkresult"
        },
        {
          label: "点检时间",
          field: "checkdate"
        },
        {
          label: "点检人",
          field: "checkperson"
        }
      ],
      checkrows: []
    };
  },
  components: {
    VueGoodTable
  },
  created () {
    this.getDataInfo()
  },
  methods: {
    // 获取设备list
    getDataInfo () {
      axios.post('https://easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/equipment').then(this.getDataInfoSucc)
    },
    getDataInfoSucc (res){
      // console.log(res.data.rows)
      res = res.data
      if(res.success && res.rows){
        this.rows = res.rows
        // console.log(this.rows)
      }
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
    deleteStaff(id) {
      console.log(id)
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
      },
    // 查看修改详情
    handleData(id) {
      this.dialogFormdata = {}
      this.dialogFormdata = this.rows[id-1]
      this.dialogFormVisible = true
    },
    handleTabledata(id) {
      axios.post('https://easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/check',{
        number: this.rows[id-1].number,
        name: this.rows[id-1].name
      }).then(this.getcheckDataSucc)
      this.dialogTableVisible = true
    },
    getcheckDataSucc(res) {
      res = res.data
      this.checkrows = []
      console.log(res)
      if (res.data && res.success){
        this.checkrows = res.data.checkrows
      }
    },
  }
};
</script>

<style>
</style>