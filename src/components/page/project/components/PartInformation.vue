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
          <el-form-item label="下工序">
            <el-col :span="10">
              <el-input v-model="data.next"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="data.remark" ></el-input>
          </el-form-item>
          <el-form-item label="工艺路线">
            <el-collapse accordion>
               <el-collapse-item>
                <el-steps :space="100" :active="1" :align-center="true" finish-status="success">
                    <el-step  title="K"></el-step>
                    <el-step  title="T线"></el-step>
                    <el-step  title="T装"></el-step>
                    <el-step  title="IA"></el-step>
                </el-steps>
               </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">返回上一级</el-button>
            <el-button type="primary">保存</el-button>
          </el-form-item>
          
        </el-form>
      </div>
      </el-main>
    </el-container>
</template>

<script>
export default {
  name: 'PartInformation',
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

