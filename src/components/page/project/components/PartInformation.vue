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
          <el-form-item label="关键部件">
            <template>
              <el-radio v-model="data.radio" label="1">是</el-radio>
              <el-radio v-model="data.radio" label="2">否</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="子物料">
            <el-col :span="10">
              <el-input v-model="data.child_material" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="子件编码">
            <el-col :span="10">
              <el-input v-model="data.child_number" :disabled="true"></el-input>
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
                    <el-step v-if="data.finished" v-for="(finished,f,index) in data.finished" :key="index" status="success" @click.native="handleStep(finished.id)" :title="finished.route" ></el-step>
                    <el-step v-if="data.build" v-for="(build,b,index) in data.build" :key="index" status="process" @click.native="handleStep(build.id)" :title="build.route" ></el-step>
                    <el-step v-if="data.unfinished" v-for="(unfinished,u,index) in data.unfinished" status="wait" @click.native="handleStep(unfinished.id)" :key="index" :title="unfinished.route"></el-step>
                  </el-steps>
                </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-if="back" @click="handleBack(fid)">返回上一级</el-button>
            <el-button type="primary" v-if="showAddPart" @click="handleAddPart(data.id)">增加子部件</el-button>
            <el-button type="primary" v-if="showSave" @click="handleSave(data.id)">保存</el-button>
            <el-button type="primary" v-if="showQrcode" @click="handleQrcode(data.id)">产品标识卡</el-button>
            <el-button type="primary" v-if="showWelding" @click="handleWelding(data.figure_number)">工艺卡</el-button>
            <el-button type="primary" v-if="showCrafts" @click="handleCrafts(data.figure_number)">机械制造卡</el-button>
            <el-button type="danger" v-if="showDel" @click="handleDelClick(data.id)">删除</el-button>
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
            <el-button type="danger" @click="handleDelRoute(props.row)">删除</el-button>
          </span>
          <span v-else>
            {{props.formattedRow[props.column.field]}}
          </span>
        </template>
        <div slot="table-actions">
          <el-button type="primary" v-if="state"  @click="handleOpeninner(state)">往后增加节点</el-button>
        </div>
      </vue-good-table>
    </el-form>
    <el-dialog
      width="30%"
      title="往后增加节点"
      :visible.sync="innerVisible"
      append-to-body>
      <el-form>
          <el-form-item  label="节点名称" :label-width="'100px'">
            <el-input v-model="nextroute"></el-input>
          </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddRoute(routeid,nextid)">确 定</el-button>
      </div>
    </el-dialog>
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
      innerVisible:false,
      formLabelWidth:'120px',
      back:true,
      routeid:'',
      listid:'',
      state:'',
      nextroute:'',
      fid:'',
      addpart:[],
      data: [],
      showAddPart:false,
      showSave:false,
      showQrcode:true,
      showWelding:true,
      showCrafts:true,
      showDel:false,

      columns: [
        {
          label: "工序",
          field: "station",
        },
        {
          label: "modid",
          field: "modid"
        },
        {
          label: "排产日期",
          field: "schedule_date"
        },
        {
          label: "完成情况",
          field: "isfinish"
        },
        {
          label: "操作",
          field: "operate"
        }
      ],
      rows:[]
    }
  },
  created() {
    this.AuthorityInfo()
  },
   // 监听数据的变化
  watch: {
    partdata : {
      immediate: true,   //如果不加这个属性，父组件第一次传进来的值监听不到
      handler(val) {
        // console.log(val)
        this.data = {}
        this.data = val
        var fd = new FormData()
        fd.append("id",val.id)
        fd.append("flag","back")
        axios.post(`${this.baseURL}/part.php`,fd).then(this.getFidSucc)
      }  
    }
  },
  methods: {
    AuthorityInfo(){
      if(this.$route.path =="/plan" ||this.$route.path =="/craft"){
        this.showAddPart=true
        this.showSave=true
        this.showDel=true
      }
    },
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
        fd.append("radio",this.data.radio)
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
      // console.log(params.columnFilters);
    },
    handleDelClick(id) {
      this.$confirm('是否删除部件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        var fd = new FormData()
        fd.append("id",id)
        fd.append("flag","delpart")
        axios.post(`${this.baseURL}/part.php`,fd).then((res)=>{
          // console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$router.go(0)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 产品标识卡
    handleQrcode(id) {
      window.open("./#/qrcode?id="+id+"&modid="+this.data.modid)
    },
    // 产品工艺卡
    handleWelding(figure_number) {
      // console.log(figure_number)
      var fd = new FormData()
      fd.append("flag","welding")
      fd.append("figure_number",figure_number)
      axios.post(`${this.baseURL}/craft/part_card.php`,fd).then((res)=>{
        if(res.data.success=='success'){
          // console.log(res.data.id)
          window.open("./#/Weldingprinter?contactId="+res.data.id)
        }else {
          alert("该部件还未上传焊接工艺卡！")
        }
      })
    },
    handleCrafts(figure_number) {
      // console.log(figure_number)
      var fd = new FormData()
      fd.append("flag","crafts")
      fd.append("figure_number",figure_number)
      axios.post(`${this.baseURL}/craft/part_card.php`,fd).then((res)=>{
        if(res.data.success=='success'){
          // console.log(res.data.id)
          window.open("./#/Craftsmanshipprinter?contactId="+res.data.id)
        }else {
          alert("该部件还未上传机械制造卡！")
        }
      })
    },
    // 车间节点点击事件
    handleStep(id) {
      // console.log(this.data.id)
      this.rows = []
      this.dialogTableVisible = true
      this.state = ''
      this.nextid = ''
      this.routeid = ''
      var fd = new FormData()
      fd.append("id",id)
      fd.append("flag","show")
      axios.post(`${this.baseURL}/craft/route.php`,fd).then((res)=>{
        console.log(res.data)
        this.routeid = res.data.id
        this.nextid = res.data.nextid
        this.state = res.data.state
        if(res.data.success){
          this.rows = res.data.item
        }
      })
    },
    // 打开内层diog
    handleOpeninner(state) {
      if(state==1){
        alert("该部件已经完成,不允许再继续增加节点")
        this.dialogTableVisible = false
      }else if(state==2){
        alert("该节点的下一节点已经在进行,不允许再进行增加节点！")
        this.dialogTableVisible = false
      }else{
        this.innerVisible = true
        this.nextroute = ''
      }
    },
    // routeid 为车间id，nextid为下车间节点的所属位置，nextroute为填入的下个车间节点名
    handleAddRoute(routeid,nextid) {
      // console.log(routeid)
      // console.log(nextid)
      // console.log(this.nextroute)

      if(!this.nextroute){
        alert("请输入节点名")
      }else {
        // 新增新节点的相应信息
        var fd = new FormData()
        fd.append("id",routeid)
        fd.append("nextid",nextid)
        fd.append("route",this.nextroute)
        fd.append("flag",'addroute')
        axios.post(`${this.baseURL}/craft/route.php`,fd).then((res)=>{
          // console.log(res.data)
          var fd = new FormData() //定义获取partdata的传值,重新更新部件信息
          fd.append('id',this.data.id)
          fd.append('flag','part')
          axios.post(`${this.baseURL}/part.php`,fd).then(this.getPartdataSucc)
        })
      }
      
    },
    // 获取更新后的部件信息
    getPartdataSucc(res) {
      // console.log(res.data)
      this.data = {}
      if(res.data.success =='success'){
        alert("添加成功！")
        this.data = res.data
      }
      this.dialogTableVisible = false
      this.innerVisible = false
    },
    handleDelRoute(row) {
      // console.log(row.isfinish)
      if(row.isfinish!=='未完成'){
        alert("该工艺无法删除！")
      }else {
        this.$confirm('是否删除该工序?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var fd = new FormData()
          fd.append("id",row.id)
          fd.append("flag","del")
          axios.post(`${this.baseURL}/craft/route.php`,fd).then((res)=>{
            // console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.dialogTableVisible = false
          })
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '取消删除!'
          });    
        });
      }
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

