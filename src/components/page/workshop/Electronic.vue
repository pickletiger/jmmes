<template>
  <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 电子看板</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
        	<el-tabs v-model="activeName2" type="card">
				    <el-tab-pane label="车间任务" name="first"><workshop-task></workshop-task></el-tab-pane>
				    <el-tab-pane label="班组工作情况" name="second"><workingcondition></workingcondition></el-tab-pane>
				    <el-tab-pane label="异常预警" name="third"><abnormal></abnormal></el-tab-pane>
				  </el-tabs>
        </div>
        <!--<div class="container" id="Workshop">
          <table-list></table-list>
        </div>-->
    </div>
</template>

<script>
import TableList from './components/ElectronicList'
import WorkshopTask from './components/WorkshopTask'
import workingcondition from './components/workingcondition'
import abnormal from './components/abnormal'
export default {
  name: 'Electronic',
  components: {
    TableList,
    WorkshopTask,
    workingcondition,
    abnormal
  },
  data() {
      return {
        activeName2: 'first'
      };
   }
}
</script>
<style scoped>
  
</style>