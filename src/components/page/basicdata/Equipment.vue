<template>
  <div class="table">
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 设备管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="container">
          <equipment-list></equipment-list>
        </div>
    </div>
</template>

<script>
import EquipmentList from './components/EquipmentList'
export default {
  name: 'Equipment',
  components :{
      EquipmentList
  }
}
</script>
<style scoped>
  
</style>