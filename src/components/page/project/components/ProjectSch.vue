<template>
<div>
  <el-container>
    <el-main>
      <el-collapse v-model="activeNames">
        <!-- v-for(val,key,index) val是内容，key是键值名，index是索引 -->
        <el-collapse-item v-if="data.item.length>0" v-for="(item,key,index) in data.item" :key="index"  :title="item.name" :name="key">
          <el-form>
            <el-form-item label=""></el-form-item>
              <el-steps :space="100"  :align-center="true" >
                <!-- 使用插槽嵌套循环 -->
                <!-- element-ui 一些标签不能注册点击事件@click  需使用@click.native -->
                <slot :item="item">
                  <el-step v-if="item.finished" v-for="(finished,f,index) in item.finished" :key="index" status="success"  :title="finished.route" @click.native="handleStep(finished.id)" ></el-step>
                  <el-step v-if="item.build" v-for="(build,b,index) in item.build" :key="index" status="process" :title="build.route" @click.native="handleStep(build.id)"></el-step>
                  <el-step v-if="item.unfinished" v-for="(unfinished,u,index) in item.unfinished" status="wait" :key="index" :title="unfinished.route" @click.native="handleStep(unfinished.id)"></el-step>
                </slot>
              </el-steps>
          </el-form>
          </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
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
</div>
</template>

<script>
import axios from 'axios'
import { VueGoodTable } from "vue-good-table"
export default {
  name: 'ProjectSch',
  props: {
    proschdata: { 
      type:Object
    }
  },
  components:{
    VueGoodTable
  },
  data () {
    return {
      data:{},
      activeNames:[],
      dialogTableVisible:false,
      dialogaddVisible:false,
      innerVisible:false,
      routeid:'',
      listid:'',
      state:'',
      nextroute:'',
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
   // 监听数据的变化
  watch: {
    proschdata : {
      immediate: false,   //如果不加这个属性，父组件第一次传进来的值监听不到
      handler(val) {
        this.data = {}
        this.data = val
        for(var i=0;i<val.item.length;i++){
          this.activeNames.push(i);
        }
        // console.log(val.item.length)
      }  
    }
  },
  methods: {
    selectionChanged(params) {
      console.log(params.columnFilters);
    },
    // 车间节点点击事件
    handleStep(id) {
      // console.log(id)
      this.rows = []
      this.dialogTableVisible = true
      this.state = ''
      this.nextid = ''
      this.routeid = ''
      var fd = new FormData()
      fd.append("id",id)
      fd.append("flag","show")
      axios.post(`${this.baseURL}/craft/route.php`,fd).then((res)=>{
        // console.log(res.data)
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
      if(state==0){
        alert("该部件已经完成,不允许再继续增加节点")
        this.dialogTableVisible = false
      }else if(state==1){
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
          var sch = new FormData() //定义获取proschdata的传值
          sch.append('id',this.data.id)
          sch.append('flag','prosch')
          axios.post(`${this.baseURL}/project.php`,sch).then(this.getProschdataSucc)
        })

        
      }
      
    },
    // 获取更新后的工艺路线
    getProschdataSucc(res) {
      // console.log(res.data)
      this.data = {"item":[]}
      // console.log(this.data)
      if(res.data.success) {
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
.btn{
  margin-top: 20px;
  margin-left: 20px;
}
</style>