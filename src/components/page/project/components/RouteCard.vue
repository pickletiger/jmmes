<template>
  <el-collapse accordion>
  <el-collapse-item title="子部件1">
    <el-form>
    <el-form-item label="工艺路线1"></el-form-item>
      <el-steps :space="100" :active="1" finish-status="success">
        <el-step title="完成"></el-step>
        <el-step title="建设中"></el-step>
        <el-step title="未完成"></el-step>
      </el-steps>
    <el-form-item label="工艺路线2"></el-form-item>
      <el-steps :space="100" :active="0" finish-status="success">
        <el-step title="建设中"></el-step>
        <el-step title="未完成"></el-step>
        <el-step title="未完成"></el-step>
      </el-steps>
  </el-form>
  </el-collapse-item>
  <el-collapse-item title="子部件2">
    <el-form>
    <el-form-item label="工艺路线1"></el-form-item>
      <el-steps :space="100" :active="1" finish-status="success">
        <el-step title="完成"></el-step>
        <el-step title="建设中"></el-step>
        <el-step title="未完成"></el-step>
        <el-step title="未完成"></el-step>
      </el-steps>
  </el-form>
  </el-collapse-item>
</el-collapse>
</template>

<script>
export default {
  name: 'PartSch'
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
    margin-top: -10px;
  }
  .main {
    position: relative;
    width: 100%;
  }
</style>