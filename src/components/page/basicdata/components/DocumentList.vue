<template>
  <div>
    <vue-good-table 
      :columns="columns" 
      :rows="rows" 
      @on-column-filter="selectionChanged"
      :search-options="{
        enabled: true,
        placeholder: '搜索此表格'
      }"
      :pagination-options="{
        enabled: true,
        mode: 'records'
      }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'operate'">
          <el-button type="primary" icon="el-icon-edit" circle @click="Handlealter(props.row.contact_id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteStaff" ></el-button>
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
      <div slot="table-actions">
        <el-button type="primary" @click="dialogFormVisible = true">新建</el-button>
      </div>
    </vue-good-table>
    <el-dialog title="信息详情" :visible.sync="dialogFormVisible">
        <el-form :model="forminfodata">
          <el-form-item label="工艺部门" :label-width="formLabelWidth">
            <el-input  auto-complete="off" v-model="forminfodata.department"></el-input>
          </el-form-item>
          <el-form-item label="目录" :label-width="formLabelWidth">
            <el-input  auto-complete="off" v-model="forminfodata.directory"></el-input>
          </el-form-item>
          <el-form-item label="部件"  :label-width="formLabelWidth">
            <el-input  auto-complete="off" v-model="forminfodata.part"></el-input>
          </el-form-item>
          <el-form-item label="文档" :label-width="formLabelWidth">
            <!-- <el-input type="file" ref="inputfile"  auto-complete="off"></el-input> -->
            <input type="file" ref="inputfile" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="SumitData">确 定</el-button>
        </div>
    </el-dialog>
  </div>
  
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import axios from "axios";
export default {
  name: "DocimentList",
  data() {
    return {
      dialogFormVisible: false,
      forminfodata: {
        contact_id:"",
        department: "",
        directory: "",
        part: "",
        filename: "",
        update:""
      },
      fileinfo:"",
      formLabelWidth: "120px",
      searchItem: "",
      value1:'',
      columns: [
        {
          label: "序号",
          field: "specification",
          
        },
        {
          label: "工艺部门",
          field: "department"
        },
        {
          label: "目录",
          field: "directory"
        },
        {
          label: "部件",
          field: "part"
        },
        {
          label: "文件名",
          field: "filename"
        },
        {
          label: "上传日期",
          field: "update"
        },
        {
          label: "操作",
          field: "operate"
        }
      ],
      rows: []
    };
  },
  components: {
    VueGoodTable
  },
  created () {
    this.GetListData();
  },
  methods: {
    //异步获取后台数据
    GetListData () {
      axios.post('https://www.easy-mock.com/mock/5baa2fcdafd56b7fe77cc98b/example/document').then((response) => {
        this.rows = response.data.data.item;
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
      this.$confirm('将删除该记录, 是否继续?', '提示', {
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
    //提交信息
    SumitData() {
      let fileDOM = this.$refs.inputfile
      var fd = new FormData();
      fd.append("department",this.forminfodata.department);
      fd.append("directory",this.forminfodata.directory);
      fd.append("part",this.forminfodata.part);
      fd.append("myfile",fileDOM.files[0]);
      axios.post('http://127.0.0.1:8081/HelloHBuilder/img/document.php',fd)
      .then(function (response) {
        console.log(response.data.data)
      })
      
    },
    //编辑信息
    Handlealter(id){
      let ky;
      this.forminfodata = {};
      for(ky in this.rows){
        if(this.rows[ky]["contact_id"] == id){
            this.forminfodata = this.rows[ky];
        }
      }
      this.dialogFormVisible = true;
    }
  }
};
</script>

<style>
</style>