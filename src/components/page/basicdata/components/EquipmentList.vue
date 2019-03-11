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
          <el-button type="primary"   @click="equipmentQRcode(props.row)">点检二维码</el-button>
          <el-button type="primary"   @click="equipmentBarcode(props.row)">条形码</el-button>
          <el-button type="primary"   @click="handleTabledata(props.row)">查看</el-button>
          <el-button type="primary" icon="el-icon-edit" circle @click="handleData(props.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteEquipment(props.row)" ></el-button>
          
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
      <div slot="table-actions">
        <el-button type="primary" @click="creatData()">新建</el-button>
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
          <el-form-item label="设备" :label-width="formLabelWidth">
            <el-select v-model="dialogFormdata.terminal" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateDataInfo()">确 定</el-button>
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
import { VueGoodTable } from "vue-good-table"
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
      options: [{
          value: '0',
          label: '终端设备'
        }, {
          value: '1',
          label: '非终端设备'
        }],
        value:'',
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
    // 新建设备
    creatData () {
      this.dialogFormVisible = true
      this.dialogFormdata = {}
    },
    updateDataInfo () {
      this.dialogFormVisible = false
      // console.log(this.dialogFormdata)
      // 判断dialogFormdata.id是否存在，若存在说明是已有设备，若不存在则说明是新建设备
      if(this.dialogFormdata.id) {
        // console.log(this.dialogFormdata.terminal)
        var fd = new FormData()
        fd.append("id",this.dialogFormdata.id)
        fd.append("number",this.dialogFormdata.number)
        fd.append("name",this.dialogFormdata.name)
        fd.append("state",this.dialogFormdata.state)
        fd.append("workcenter",this.dialogFormdata.workcenter)
        fd.append("checkrequest",this.dialogFormdata.checkrequest)
        fd.append("tallyposition",this.dialogFormdata.tallyposition)
        fd.append("tallycycle",this.dialogFormdata.tallycycle)
        fd.append("terminal",this.dialogFormdata.terminal)
        // console.log(fd)
        axios.post(`${this.baseURL}/basicdata/equipment_reserve.php`,fd).then(this.creatRefresh)
        this.$message({
        type: 'success',
        message: '保存成功!'
      });
      }else {
        // console.log(this.dialogFormdata.id)
        var fd = new FormData()
        fd.append("number",this.dialogFormdata.number)
        fd.append("name",this.dialogFormdata.name)
        fd.append("state",this.dialogFormdata.state)
        fd.append("workcenter",this.dialogFormdata.workcenter)
        fd.append("checkrequest",this.dialogFormdata.checkrequest)
        fd.append("tallyposition",this.dialogFormdata.tallyposition)
        fd.append("tallycycle",this.dialogFormdata.tallycycle)
        fd.append("terminal",this.dialogFormdata.terminal)
        // console.log(fd)
        axios.post(`${this.baseURL}/basicdata/equipment_reserve.php`,fd).then(this.creatRefresh)
        this.$message({
          type: 'success',
          message: '新建成功!'
        });
      }
      
    },
    creatRefresh(res) {
      console.log(res)
      this.getDataInfo()
    },
    // 获取设备list
    getDataInfo () {
      axios.post(`${this.baseURL}/basicdata/equipment.php`).then(this.getDataInfoSucc)
    },
    getDataInfoSucc (res){
      // console.log(res.data.data)
      res = res.data
      if(res.success && res.data){
        this.rows = []
        this.rows = res.data
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
    // 删除设备
    deleteEquipment(row) {
      // console.log(id)
        this.$confirm('将删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          var fd = new FormData()
          fd.append("id",row.id)
          axios.post(`${this.baseURL}/basicdata/equipment_del.php`,fd).then(this.creatRefresh)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    // 查看修改详情
    handleData(row) {
      this.dialogFormdata = {}
      this.dialogFormdata = row
      this.dialogFormVisible = true
    },
    // 点检记录异步数据获取
    handleTabledata(row) {
      // console.log(row.id)
      var fd = new FormData()
      this.checkrows = []
      fd.append("id",row.id)
      axios.post(`${this.baseURL}/basicdata/equipment.php`,fd).then(this.getcheckDataSucc)
      this.dialogTableVisible = true
    },
    getcheckDataSucc(res) {
      // console.log(res.data)
      res = res.data
      // console.log(res.data)
      if (res.data && res.success){
        this.checkrows = res.data
      }
    },
    //点检二维码
    equipmentQRcode(row){
      // 清空缓存
      sessionStorage.removeItem('id')
      sessionStorage.removeItem('name')
      sessionStorage.removeItem('number')
      //缓存浏览器
      sessionStorage.setItem('id',row.id)
      sessionStorage.setItem('name',row.name)
      sessionStorage.setItem('number',row.number)
      //打开生成二维码页面
      window.open('#/equipmentQRcode', '_blank');
    },
    //条形码
    equipmentBarcode(row){
      // 清空缓存
      sessionStorage.removeItem('id')
      sessionStorage.removeItem('name')
      sessionStorage.removeItem('number')
      //缓存浏览器
      sessionStorage.setItem('id',row.id)
      sessionStorage.setItem('name',row.name)
      sessionStorage.setItem('number',row.number)
      //打开生成二维码页面
      window.open('#/equipmentBar', '_blank');
    }
  }
};
</script>

<style scoped>
</style>