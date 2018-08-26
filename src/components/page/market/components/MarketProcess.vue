<template>
  <div>
    <el-container class="project-main">
      <el-header class="header">工序信息</el-header>
      <el-main>
        <div class="main">
          <el-form ref="form"  label-width="80px">
            <el-form-item label="工序名称">
              <el-col :span="10">
                <el-input ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="截止时间">
              <el-col :span="10">
                <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="部件编码">
              <el-col :span="10">
                <el-input ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="工序状态">
              <el-col :span="10">
                <el-input ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期"  style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="工序文档">
              <el-col :span="10">
                <a href="#">工序图纸标准</a>
              </el-col>
            </el-form-item>
            <el-form-item label="工序备注">
              <el-input type="textarea" ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'ProjectProcess',
  data () {
    return {
      date: ''
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