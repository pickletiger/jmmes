<template>
  <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 电子看板</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <table-list></table-list>
        </div>
    </div>
</template>

<script>
import TableList from './components/ElectronicList'
export default {
  name: 'Electronic',
  components: {
    TableList
  }
}
</script>
<style scoped>
  
</style>