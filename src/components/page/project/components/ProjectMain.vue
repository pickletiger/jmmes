<template>
  <el-container class="project-main">
    <el-main>
      <div class="main">
        <el-form ref="form"  label-width="80px">
          <el-form-item label="项目名称">
            <el-col :span="10">
              <el-input :disabled="true" v-model="data.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="项目编号">
            <el-col :span="10">
              <el-input :disabled="true" v-model="data.number"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="交付时间">
            <el-col :span="10">
              <el-date-picker type="date" v-model="data.date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="项目备注">
            <el-input type="textarea" v-model="data.remark"></el-input>
          </el-form-item>
          <el-form-item label="项目进度">
            <el-collapse accordion>
                <el-collapse-item>
                  <el-steps :space="100"  :align-center="true" >
                  <!-- element-ui 一些标签不能注册点击事件@click  需使用@click.native -->
                    <el-step v-if="data.finished" v-for="(finished,f,index) in data.finished" :key="index" status="success"  :title="finished.route" ></el-step>
                    <el-step v-if="data.bulid" v-for="(bulid,b,index) in data.bulid" :key="index" status="process" :title="bulid.route" ></el-step>
                    <el-step v-if="data.unfinished" v-for="(unfinished,u,index) in data.unfinished" status="wait" :key="index" :title="unfinished.route"></el-step>
                  </el-steps>
                </el-collapse-item>
            </el-collapse>
          </el-form-item>
           <el-form-item>
            <el-button type="primary" @click="handleSave(data.id)">保存</el-button>
            <el-button type="primary" @click="handleAdd(data.id)">增加子部件</el-button>
            <el-button type="danger" @click="handleDelClick(data.id)">删除</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
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
  </el-container>
</template>

<script>
import axios from "axios"
export default {
  name: "ProjectMain",
  props: {
    prodata: Object
  },
  data () {
    return {
      dialogaddVisible:false,
      data: {},
      addpart:{},
      formLabelWidth:'120px'
    }
  },
   // 监听数据的变化
  watch: {
    prodata : {
      immediate: true,   //如果不加这个属性，父组件第一次传进来的值监听不到
      handler(val) {
        // console.log(val)
        this.data = {}
        this.data = val
      }  
    }
  },
  methods: {
     // 保存修改信息
    handleSave(id) {
      // console.log(id)
      this.$confirm('是否修改项目信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var fd = new FormData()
        fd.append("id",id)
        fd.append("flag","savepro")
        fd.append("date",this.data.date)
        fd.append("remark",this.data.remark)
        axios.post(`${this.baseURL}/project.php`,fd).then((res)=>{
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
    handleAdd(){
      this.$confirm('是否在该项目下增加子部件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogaddVisible = true
      }).catch(() => {
                
      });
    },
    handleSaveAdd(id){
       // console.log(id)
      var fd = new FormData()
      fd.append("id",id)
      fd.append("flag","addmpart")
      fd.append("name",this.addpart.name)
      fd.append("figure_number",this.addpart.figure_number)
      fd.append("standard",this.addpart.standard)
      fd.append("count",this.addpart.count)
      fd.append("modid",this.addpart.modid)
      fd.append("remark",this.addpart.remark)
      fd.append("routel",this.addpart.routel)
      this.dialogaddVisible = false
      axios.post(`${this.baseURL}/project.php`,fd).then((res)=>{
        // console.log(res)
        this.addpart = []
        alert('新增成功')
      })
    },
    // 点击删除事件
    handleDelClick(id) {
      this.$confirm('是否删除项目?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
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

