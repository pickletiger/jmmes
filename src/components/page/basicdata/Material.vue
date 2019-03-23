<template>
  <div class="table">
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 原材料管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="container">
          <material-list></material-list>
        </div>
    </div>
</template>

<script>
import MaterialList from './components/MaterialList'
export default {
  name: 'Material',
  components: {
      MaterialList
  }
}
</script>
<style scoped>
  
</style>