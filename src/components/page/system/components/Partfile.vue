<template>
  <div>
    <!-- el-tabs的v-model对应el-tab-pane的name ,即显示对应标签页 -->
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane name="third" label="信息汇总">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="基本信息" name="1">
            <el-form ref="form"  label-width="80px">
              <el-form-item label="部件名称">
                <el-col :span="10">
                  <el-input v-model="partfile.name"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="图号">
                <el-col :span="10">
                  <el-input v-model="partfile.figure_number" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="规格">
                <el-col :span="10">
                  <el-input v-model="partfile.standard"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="数量">
                <el-col :span="10">
                  <el-input v-model="partfile.count"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="关键部件">
                <el-col :span="10">
                  <el-input v-model="partfile.radio"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="子物料">
                <el-col :span="10">
                  <el-input v-model="partfile.child_material" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="子件编码">
                <el-col :span="10">
                  <el-input v-model="partfile.child_number" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleQrcode(partfile.id)">产品标识卡</el-button>
                <el-button type="primary" @click="handleWelding(partfile.figure_number)">工艺卡</el-button>
                <el-button type="primary" @click="handleCrafts(partfile.figure_number)">机械制造卡</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="车间" name="2">
            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="route"
              label="车间"
              width="50px">
            </el-table-column>
            <el-table-column
              prop="route_line"
              label="工艺路线">
            </el-table-column>
            <el-table-column
              prop="ctime"
              label="排产时间">
            </el-table-column>
            <el-table-column
              prop="otime"
              label="交付时间">
            </el-table-column>
            <el-table-column
              prop="stime"
              label="就工时间">
            </el-table-column>
            <el-table-column
              prop="utime"
              label="完工时间">
            </el-table-column>
            <el-table-column
              prop="notNum"
              label="不合格次数">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="不合格原因">
            </el-table-column>
            <el-table-column
              prop="backMark"
              label="退产">
            </el-table-column>
            <el-table-column
              prop="reason"
              label="退产原因">
            </el-table-column>
          </el-table>
          </el-collapse-item>
          <el-collapse-item title="附件" name="3">
            <div v-for="(tdata,index) in tableData">
              <span>{{tdata.route}}</span>
              <div v-for="(photo,i) in photo[index]">
                <img :src="item[index+i]" class="img"/>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Partfile',
  props: {
    lxid: String
  },
  data () {
    return {
      activeNames: ['1'],
      partfile:[],
      mylxid: '',
      item:{},
      photo:[],//按车间顺序照片个数
      activeName: 'third',
      tableData: []
    }
  },// 监听数据的变化
  watch: {
    lxid : {
      immediate: true,   //如果不加这个属性，父组件第一次传进来的值监听不到
      handler(val) {
        // console.log(val)
        this.mylxid = val
      }  
    },
    // 声明mylxid的原因:vue不允许直接修改props的值，通过声明赋值新变量重新渲染组件
    mylxid: {
      immediate: true,   //如果不加这个属性，父组件第一次传进来的值监听不到
      handler(val) {
        console.log(val)
        var file = new FormData() //定义获取partschdata的传值
        file.append('id',val)
        file.append('flag','partfile')
        axios.post(`${this.baseURL}/system/partfile.php`,file).then(this.getPartfiledataSucc)
      
        var fd = new FormData() //定义获取partschdata的传值
        fd.append('id',val)
        fd.append('flag','partdata')
        axios.post(`${this.baseURL}/system/partfile.php`,fd).then(this.getpartdataSucc)
      }  
    }
  },
  methods: {
    getPartfiledataSucc(res) {
      this.tableData = []
      this.item = []
      if(res.data.success =='success'){
        this.tableData = res.data.data
      }
      this.tableData.forEach(element => {
        this.photo.push(element.photourl.length)
        for(let i = 0;i<element.photourl.length;i++){
          this.item.push(element.photourl[i])
        }
      });
      console.log(this.item)
    },
    // 产品标识卡
    handleQrcode(id) {
      window.open("./#/qrcode?id="+id+"&modid="+this.partfile.modid)
    },
    getpartdataSucc(res) {
      this.partfile = []
      if(res.data.success =='success'){
        this.partfile = res.data.data
      }
      // console.log(this.partfile)
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
    //机械制造卡
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
    //折叠面板
    handleChange(val) {
      // console.log(val);
    }
  }
}
</script>
<style scoped>
  .img{
    padding-left:7.5% ;
    height: 600px;
    width: 600px;
  }
</style> 