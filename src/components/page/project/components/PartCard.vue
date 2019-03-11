<template>
  <el-container>
    <el-main>
      <div class="main">
        <el-form ref="form"  label-width="80px">
          <el-form-item label="部件名称">
            <el-col :span="10">
              <el-input v-model="data.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="部件编号">
            <el-col :span="10">
              <el-input v-model="data.id"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="工单号">
            <el-col :span="10">
              <el-input v-model="data.gdh"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="数量">
            <el-col :span="10">
              <el-input v-model="data.number"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="材料">
            <el-radio-group v-model="data.resource" size="medium">
              <el-radio border label="45#"></el-radio>
              <el-radio border label="40Cr"></el-radio>
              <el-radio border label="40CrNiMoA"></el-radio>
              <el-radio border label="2Cr13"></el-radio>
              <el-radio border label="其它"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="施工工序">
            <el-radio-group v-model="data.build" size="medium">
              <el-radio border label="退火"></el-radio>
              <el-radio border label="调质"></el-radio>
              <el-radio border label="高频"></el-radio>
              <el-radio border label="回火"></el-radio>
              <el-radio border label="其它"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="硬度要求">
            <el-select v-model="data.hardness" placeholder="硬度要求">
              <el-option  label="HB220-260" value="HB220-260"></el-option>
              <el-option  label="HB240-286" value="HB240-286"></el-option>
              <el-option  label="HB260-320" value="HB260-320"></el-option>
              <el-option  label="HB197-248" value="HB197-248"></el-option>
              <el-option  label="HB217-255" value="HB217-255"></el-option>
              <el-option  label="其它" value="其它"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下工序">
            <el-col :span="10">
              <el-input v-model="data.next"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="data.remark" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleClick">保存</el-button>
            <router-link to="/tprint">
              <el-button type="primary">打印</el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "PartCard",
  props: {
    prodata: Object
  },
  data () {
    return {
      data: {
        name: '槽钢',
        id: '1211111',
        gdh: '15#',
        remark: '备注详情',
        number: 10,
        next: 'K'
      }
    }
  },
   // 监听数据的变化
  watch: {
    
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

<style scoped>
</style>

