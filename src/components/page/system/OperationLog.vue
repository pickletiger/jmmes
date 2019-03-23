<template>
  <div class="table">
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 操作日志</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="container">
          <operationloglist></operationloglist>
        </div>
    </div>
</template>

<script>
import operationloglist from "./components/operationloglist"
export default {
  name: 'OperationLog',
  components:{
  	operationloglist
  }
}
</script>
<style scoped>
  
</style>