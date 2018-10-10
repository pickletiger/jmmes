<template>
  <el-container class="project-main">
    <el-main>
      <div class="main">
        <el-form ref="form"  label-width="80px">
          <el-form-item label="项目名称">
            <el-col :span="10">
              <el-input v-model="data.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="项目编号">
            <el-col :span="10">
              <el-input v-model="data.id"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="交付时间">
            <el-col :span="10">
              <el-date-picker type="date" v-model="data.enddate" placeholder="选择日期" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="安装场地">
            <el-col :span="10">
              <el-input v-model="data.place"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-col :span="11">
              <el-date-picker type="date" v-model="data.startdate"  placeholder="选择日期"  style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="项目备注">
            <el-input type="textarea" v-model="data.remark" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleClick">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "ProjectMain",
  props: {
    prodata: Object
  },
  data () {
    return {
      data: {}
    }
  },
   // 监听数据的变化
  watch: {
    prodata : {
      immediate: true,   //如果不加这个属性，父组件第一次传进来的值监听不到
      handler(val) {
        this.data = {}
        this.data = val
      }  
    }
  },
  methods: {
    // 点击修改事件
    handleClick() {
      this.$confirm('是否修改项目信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });          
      });
    }
  }
};
</script>

<style>
</style>

