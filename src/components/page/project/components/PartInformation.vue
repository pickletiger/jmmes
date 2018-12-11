<template>
<div>
  <el-container>
      <el-main>
        <div class="main">
        <el-form ref="form"  label-width="80px">
          <el-form-item label="部件名称">
            <el-col :span="10">
              <el-input v-model="data.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="图号">
            <el-col :span="10">
              <el-input v-model="data.figure_number" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="规格">
            <el-col :span="10">
              <el-input v-model="data.standard"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="数量">
            <el-col :span="10">
              <el-input v-model="data.count"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="modid">
            <el-col :span="10">
              <el-input v-model="data.modid" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="data.remark" ></el-input>
          </el-form-item>
          <el-form-item label="部件进度">
            <el-collapse accordion>
                <el-collapse-item>
                  <el-steps :space="100" :align-center="true">
                  <!-- element-ui 一些标签不能注册点击事件@click  需使用@click.native -->
                    <el-step v-if="data.finished" v-for="(finished,f,index) in data.finished" :key="index" status="success" @click.native="handleStep(1)" :title="finished.route" ></el-step>
                    <el-step v-if="data.bulid" v-for="(bulid,b,index) in data.bulid" :key="index" status="process" @click.native="handleStep(2)" :title="bulid.route" ></el-step>
                    <el-step v-if="data.unfinished" v-for="(unfinished,u,index) in data.unfinished" status="wait" @click.native="handleStep(3)" :key="index" :title="unfinished.route"></el-step>
                  </el-steps>
                </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-if="back" @click="handleBack(fid)">返回上一级</el-button>
            <el-button type="primary" @click="handleAddPart(data.id)">增加子部件</el-button>
            <el-button type="primary" @click="handleSave(data.id)">保存</el-button>
            <el-button type="danger">删除</el-button>
          </el-form-item>
          
        </el-form>
      </div>
      </el-main>
    </el-container>
    <!-- 工艺路线点击模态框 -->
    <el-dialog title="工序详情" :visible.sync="dialogTableVisible">
    <el-form>
      <vue-good-table 
        :columns="columns" 
        :rows="rows" 
        @on-column-filter="selectionChanged"
        :search-options="{enabled: true}"
        :pagination-options="{enabled: true,mode: 'records',perPage: 5,perPageDropdown: [5],dropdownAllowAll: false,}"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'operate'">
            <el-button type="primary">查看</el-button>
            <el-button type="danger">删除</el-button>
          </span>
          <span v-else>
            {{props.formattedRow[props.column.field]}}
          </span>
        </template>
        <div slot="table-actions">
          <el-button type="primary">往后增加节点</el-button>
        </div>
      </vue-good-table>
    </el-form>
  </el-dialog>
  <!-- 增加子部件点击模态框 -->
    <el-dialog title="部件详情" :visible.sync="dialogaddVisible">
        <el-form>
          <el-form-item label="部件名称" :label-width="formLabelWidth">
            <el-input v-model="addpart.name" ></el-input>
          </el-form-item>
          <el-form-item label="图号" :label-width="formLabelWidth">
            <el-input v-model="addpart.figure_number"></el-input>
          </el-form-item>
          <el-form-item label="规格"  :label-width="formLabelWidth">
            <el-input v-model="addpart.standard"></el-input>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth">
            <el-input v-model="addpart.count"></el-input>
          </el-form-item>
          <el-form-item label="modid" :label-width="formLabelWidth">
            <el-input v-model="addpart.modid"></el-input>
          </el-form-item>
          <el-form-item label="工艺路线" :label-width="formLabelWidth">
            <el-input v-model="addpart.routel"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="addpart.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogaddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSaveAdd(data.id)">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import axios from 'axios'
import { VueGoodTable } from "vue-good-table"
export default {
  name: 'PartInformation',
  components: {
    VueGoodTable
  },
  props: {
    partdata:Object
  },
   data () {
    return {
      dialogTableVisible:false,
      dialogaddVisible:false,
      formLabelWidth:'120px',
      back:true,
      fid:'',
      addpart:[],
      data: [],
       columns: [
        {
          label: "工序",
          field: "route",
        },
        {
          label: "部件",
          field: "part"
        },
        {
          label: "部件编号",
          field: "id"
        },
        {
          label: "完成情况",
          field: "isfinished"
        },
        {
          label: "操作",
          field: "operate"
        }
      ],
      rows:[]
    }
  },
   // 监听数据的变化
  watch: {
    partdata : {
      immediate: true,   //如果不加这个属性，父组件第一次传进来的值监听不到
      handler(val) {
        // console.log(val)
        this.data = {}
        this.data = val
        console.log(val);
        var fd = new FormData()
        fd.append("id",val.id)
        fd.append("flag","back")
        axios.post(`${this.baseURL}/part.php`,fd).then(this.getFidSucc)
      }  
    }
  },
  methods: {
    // 获取父id
    getFidSucc(res) {
      // console.log(res.data)
      if(res.data.success=='success'){
        this.back = true
        this.fid = res.data.id
      }else {
        this.back = false
      }
    },
    //返回上一级
    handleBack(fid){
      // console.log(fid)
      this.$emit("change",fid)
    }, 
    // 增加子部件
    handleAddPart(id){
      this.$confirm('是否在该部件下增加子部件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogaddVisible = true
      }).catch(() => {
                
      });
      // console.log(id)
    },
    handleSaveAdd(id) {
      // console.log(id)
      var fd = new FormData()
      fd.append("id",id)
      fd.append("flag","addpart")
      fd.append("name",this.addpart.name)
      fd.append("figure_number",this.addpart.figure_number)
      fd.append("standard",this.addpart.standard)
      fd.append("count",this.addpart.count)
      fd.append("modid",this.addpart.modid)
      fd.append("remark",this.addpart.remark)
      fd.append("routel",this.addpart.routel)
      this.dialogaddVisible = false
      axios.post(`${this.baseURL}/part.php`,fd).then((res)=>{
        // console.log(res)
        this.addpart = []
        alert('新增成功')
      })
    },
    // 保存修改信息
    handleSave(id) {
      this.$confirm('是否修改部件信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var fd = new FormData()
        fd.append("id",id)
        fd.append("flag","savepart")
        fd.append("name",this.data.name)
        fd.append("standard",this.data.standard)
        fd.append("count",this.data.count)
        fd.append("remark",this.data.remark)
        axios.post(`${this.baseURL}/part.php`,fd).then((res)=>{
          // console.log(res)
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        })
      }).catch(() => {
          this.$message({
          type: 'info',
          message: '取消修改!'
        });      
      });
      // console.log(id)
    },
    selectionChanged(params) {
      console.log(params.columnFilters);
    },
    // 工艺路线点击事件
    handleStep(isfinished) {
      axios.post('https://easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/routelist',{
        isfinished:isfinished
      }).then(this.getDataInfoSucc)
    },
    getDataInfoSucc(res) {
      // console.log(res.data.data.rows)
      this.rows = res.data.data.rows
      this.dialogTableVisible = true
    }
  }
}
</script>

<style scoped>
 .project-main {
    margin-top: -20px;
  }
  .header {
    text-align: center;
    font-size: 24px;
    line-height: 60px;
    background: #fff;
    border-bottom: #eee 1px solid;
    margin-top: -20px;
  }
  .main {
    position: relative;
    width: 100%;
  }
</style>

