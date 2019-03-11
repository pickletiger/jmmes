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
          <el-button type="primary" icon="el-icon-edit" circle @click="handleData(props.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteStaff(props.row)" ></el-button>
          <el-button type="primary" @click="QRcode(props.row)">生成二维码</el-button>
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
      <div slot="table-actions">
        <el-button type="primary" @click="creatData()">新建</el-button>
        <el-button type="primary" @click="enter()">导入</el-button>
      </div>
    </vue-good-table>
    <el-dialog title="信息详情" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="工号" :label-width="formLabelWidth">
            <el-input v-model="dialogFormdata.gNum" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="dialogFormdata.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机"  :label-width="formLabelWidth">
            <el-input v-model="dialogFormdata.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth">
            <el-input v-model="dialogFormdata.position" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门" :label-width="formLabelWidth">
            <el-input v-model="dialogFormdata.department" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="车间" :label-width="formLabelWidth">
            <el-select v-model="dialogFormdata.workShop" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="终端" :label-width="formLabelWidth">
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
    <el-dialog title="人员导入" :visible.sync="dialogFormUpload">
        <el-upload
          class="upload-demo"
          :on-success="success"
          :on-exceed="fileExceed"
          :on-change="onchangeFunc"
          drag
          :auto-upload="false"
          ref="upload"
          :limit="1"
          :action="target"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传xlsx、lsx文件</div>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormUpload = false">取 消</el-button>
          <el-button type="primary" @click="upload()">导 入</el-button>
        </div>
    </el-dialog>
  </div>

</template>

<script>
import { VueGoodTable } from "vue-good-table";
import { Message } from 'element-ui';
import axios from 'axios'
export default {
  name: "TableList",
  data() {
    return {
      dialogFormVisible: false,
      dialogFormUpload:false,
      fileList:[],
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
          label: "工号",
          field: "gNum",

        },
        {
          label: "姓名",
          field: "name"
        },
        {
          label: "手机",
          field: "phone"
        },
        {
          label: "职位",
          field: "position"
        },
        {
          label: "部门",
          field: "department"
        },
        {
          label: "操作",
          field: "operate"
        }
      ],
      rows: [],
      options: [{
          value: '0',
          label: 'PC端'
        }, {
          value: '1',
          label: 'PDA端'
        }],
        value:'',
        options1: [{
          value: '0',
          label: 'K'
        }, {
          value: '1',
          label: 'T-焊前'
        },
        {
          value: '2',
          label: 'T-组焊'
        },
        {
          value: '3',
          label: 'T-装配'
        },
        {
          value: '4',
          label: 'F'
        },
        {
          value: '5',
          label: 'W'
        },
        {
          value: '6',
          label: 'D装配'
        },
        {
          value: '7',
          label: 'G'
        },
        {
          value: '8',
          label: 'L组焊'
        },
        {
          value: '9',
          label: 'I/L装配'
        }
        ],
      target: `${this.baseURL}/basicdata/components/tableUpload.php`
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
    creatRefresh(response) {
      console.log(response)
      this.getStuffInfoData()
    },
    //新建人员及修改
    updateDataInfo(){
      this.dialogFormVisible = false
      // 判断dialogFormdata.id是否存在，若存在说明是已有人员，若不存在则说明是新建人员
      if(this.dialogFormdata.id) {
        // console.log(this.dialogFormdata.workShop)
        var fd = new FormData()
        fd.append("id",this.dialogFormdata.id)
        fd.append("gNum",this.dialogFormdata.gNum)//工号
        fd.append("name",this.dialogFormdata.name)//名字
        fd.append("phone",this.dialogFormdata.phone)//电话
        fd.append("position",this.dialogFormdata.position)//职位
        fd.append("department",this.dialogFormdata.department)//部门
        fd.append("workShop",this.dialogFormdata.workShop)//车间
        fd.append("terminal",this.dialogFormdata.terminal)//终端
        fd.append("uusername",localStorage.ms_username)//修改者账号
        console.log(fd.append)
        axios.post(`${this.baseURL}/basicdata/components/tableList_reserve.php`,fd).then(this.creatRefresh)
          this.$message({
          type: 'success',
          message: '保存成功!'
        });
      }else {
        // console.log(this.dialogFormdata.id)
        var fd = new FormData()
        fd.append("gNum",this.dialogFormdata.gNum)//工号
        fd.append("name",this.dialogFormdata.name)//名字
        fd.append("phone",this.dialogFormdata.phone)//电话
        fd.append("position",this.dialogFormdata.position)//职位
        fd.append("department",this.dialogFormdata.department)//部门
        fd.append("workShop",this.dialogFormdata.workShop)//车间
        fd.append("terminal",this.dialogFormdata.terminal)//终端
        fd.append("uusername",localStorage.ms_username)//修改者账号
        // console.log(fd)
        axios.post(`${this.baseURL}/basicdata/components/tableList_reserve.php`,fd).then(this.creatRefresh)
        this.$message({
          type: 'success',
          message: '新建成功!'
        });
      }
    },
    //获取后台数据
    getStuffInfoData () {
        axios.post(`${this.baseURL}/basicdata/components/tableList.php`).then((response) => {
            this.rows = []
            this.rows = response.data.data
            // console.log(response.data.data)
        })
    },
    selectionChanged(params) {
        console.log(params.columnFilters)
    },
    handleClose(done) {
        this.$confirm("确认关闭？")
            .then(_ => {
                done();
            })
            .catch(_ => {});
    },
    //选择文件时触发
    onchangeFunc(file,fileList){
      console.log(fileList)
      this.fileList = fileList
    },
    //导入按钮
    enter(){
      this.dialogFormUpload = true
    },
    //导入按钮
    upload(){
      this.dialogFormUpload = false
      if(this.$refs.upload.uploadFiles){
        this.$refs.upload.submit() // 上传
      } else {
        this.$message({
          type: 'warning',
          message: '您未添加任何文件！'
        });
      }
    },
    // 超出上传限制提示框
    fileExceed (e) {
      let options = {
        message: '已添加文件！',
        type: 'warning',
        duration: 2000,
      }
      Message(options);
    },
    // 上传成功回调
    success (res) {
      // this.$emit('uploadSuccess',res);
      console.log(res)
      this.getStuffInfoData()
    },
    //导出二维码
    QRcode(row){
      // 清空缓存
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('userName')
      sessionStorage.removeItem('userNum')
      sessionStorage.removeItem('userDepartment')
      sessionStorage.removeItem('userPosition')
      //缓存浏览器
      sessionStorage.setItem('userId',row.id)
      sessionStorage.setItem('userName',row.name)
      sessionStorage.setItem('userNum',row.gNum)
      sessionStorage.setItem('userDepartment',row.department)
      sessionStorage.setItem('userPosition',row.position)
      //打开生成二维码页面
      window.open('#/userQRcode', '_blank');
    },
    //新建人员
    creatData(){
      this.dialogFormdata = {}
      this.dialogFormVisible = true
    },
    // 查看修改详情
    handleData(row) {
      this.dialogFormdata = {}
      this.dialogFormdata = row
      this.dialogFormVisible = true
    },
    // 删除员工
    deleteStaff(row) {
        this.$confirm('将删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var fd = new FormData()
          fd.append("id",row.id)
          fd.append("uusername",localStorage.ms_username)//修改者账号
          axios.post(`${this.baseURL}/basicdata/components/tableList_del.php`,fd).then(this.creatRefresh)
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

<style scoped>
</style>
