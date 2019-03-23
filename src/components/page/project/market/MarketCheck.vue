<template>
  <div class="table">
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 审核订单</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="container">
          <table-list></table-list>
        </div>
    </div>
</template>

<script>
import TableList from '../components/MarketList'
export default {
  name: 'MarketCheck',
  components: {
    TableList
  }
}
</script>
<style scoped>
  
</style>