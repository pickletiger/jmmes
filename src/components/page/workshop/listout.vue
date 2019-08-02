<template>
  <div class="table">
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 设备管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="container">
          <table-list></table-list>
        </div>
    </div>
</template>

<script>
import TableList from './components/listoutshow'
export default {
  name: 'Listout',
  components :{
      TableList
  }
}
</script>
<style scoped>

</style>
