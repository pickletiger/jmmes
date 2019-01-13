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
          <el-form-item label="物料编码" :label-width="formLabelWidth">
            <el-input v-model="dialogFormdata.mNum" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="物料名称" :label-width="formLabelWidth">
            <el-input v-model="dialogFormdata.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="规格"  :label-width="formLabelWidth">
            <el-input v-model="dialogFormdata.specifications" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth">
            <el-input v-model="dialogFormdata.amount" auto-complete="off"></el-input>
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
  name: "MaterialList",
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
          label: "物料编码",
          field: "mNum",

        },
        {
          label: "物料名称",
          field: "name"
        },
        {
          label: "规格",
          field: "specifications"
        },
        {
          label: "数量",
          field: "amount"
        },
        {
          label: "操作",
          field: "operate"
        }
      ],
      rows: [
        /*{
          id: 1,
          specification: "Q235-B",
          size: "钢管",
          place: "焊管DN125X4.5",
          date: "1"
        },
        {
          id: 2,
          specification: "Q234-A",
          size: "槽钢",
          place: "槽钢20ad=7",
          date: "3"
        },
        {
          id: 3,
          specification: "Q234-B",
          size: "H钢",
          place: "H型钢200X200",
          date: "2"
        }*/
      ],
      target: `${this.baseURL}/basicdata/components/materialUpload.php`
    };
  },
  components: {
    VueGoodTable
  },
    created () {
        this.getListData()

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
      this.getListData()
    },
    //新建材料及修改
    updateDataInfo(){
      this.dialogFormVisible = false
      // 判断dialogFormdata.id是否存在，若存在说明是已有材料，若不存在则说明是新建材料
      if(this.dialogFormdata.id) {
        // console.log(this.dialogFormdata.id)
        var fd = new FormData()
        fd.append("id",this.dialogFormdata.id)
        fd.append("mNum",this.dialogFormdata.mNum)//编号
        fd.append("name",this.dialogFormdata.name)//名字
        fd.append("specifications",this.dialogFormdata.specifications)//规格
        fd.append("amount",this.dialogFormdata.amount)//数量
        // console.log(fd)
        axios.post(`${this.baseURL}/basicdata/components/material_reserve.php`,fd).then(this.creatRefresh)
          this.$message({
          type: 'success',
          message: '保存成功!'
        });
      }else {
        // console.log(this.dialogFormdata.id)
        var fd = new FormData()
        fd.append("mNum",this.dialogFormdata.mNum)//编号
        fd.append("name",this.dialogFormdata.name)//名称
        fd.append("specifications",this.dialogFormdata.specifications)//规格
        fd.append("amount",this.dialogFormdata.amount)//数量
        // console.log(fd)
        axios.post(`${this.baseURL}/basicdata/components/material_reserve.php`,fd).then(this.creatRefresh)
        this.$message({
          type: 'success',
          message: '新建成功!'
        });
      }
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
      this.$alert('导入完成', '金马MES系统', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });
      this.dialogFormUpload = false
      this.getListData()
    },
      //获取后台数据
      getListData () {
          axios.post(`${this.baseURL}/basicdata/components/material.php`).then((response) => {
              this.rows = []
              this.rows = response.data.data
            //  console.log(response.data.data)
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
      //新建材料
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

    // 删除材料
    deleteStaff(row) {
        this.$confirm('将删除该材料, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var fd = new FormData()
          fd.append("id",row.id)
          axios.post(`${this.baseURL}/basicdata/components/material_del.php`,fd).then(this.creatRefresh)
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



  }
};
</script>

<style scoped>

</style>

