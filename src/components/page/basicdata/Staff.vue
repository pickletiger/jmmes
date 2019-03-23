<template>
  <div class="table">
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 员工信息管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="container">
          <table-list></table-list>
        </div>
    </div>
</template>

<script>
import TableList from "./components/TableList.vue";
export default {
  name: 'Staff',
  components: {
    TableList
  }
}
</script>
<style scoped>
  
</style>