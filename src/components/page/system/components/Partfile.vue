<template>
  <div>
    <!-- el-tabs的v-model对应el-tab-pane的name ,即显示对应标签页 -->
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane name="third" label="信息汇总">
        <el-form ref="form"  label-width="100px">
          <el-form-item label="不合格次数">
            <el-col :span="10">
              <el-input v-model="partfile.notNum"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="不合格原因">
            <el-col :span="10">
              <el-input v-model="partfile.remark"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="退产记录">
            <el-col :span="10">
              <el-input v-model="partfile.backMark"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="退产原因">
            <el-col :span="10">
              <el-input v-model="partfile.reason"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="工位">
            <el-col :span="10">
              <el-input v-model="partfile.station"></el-input>
            </el-col>
          </el-form-item>
          <img v-for="i in item"  :src="i" class="img"/>
        </el-form>
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
      partdata:{},
      partschdata: {},
      partfile:{},
      mylxid: '',
      item:{},
      activeName: 'first'
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
        // console.log(val)
        var file = new FormData() //定义获取partschdata的传值
        file.append('id',val)
        file.append('flag','partfile')
        axios.post(`${this.baseURL}/part.php`,file).then(this.getPartfiledataSucc)
      }  
    }
  },
  methods: {
    getPartfiledataSucc(res) {
      console.log(res.data)
      this.partfile = {}
      this.item = {}
      if(res.data.success =='success'){
        this.partfile = res.data
        this.item = res.data.photourl
      }
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