<template>
  <div class="table">
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 车间计划</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="container">
          <table-list></table-list>
        </div>
    </div>
</template>

<script>
import TableList from "./components/ProductionList.vue";
export default {
  name: "ProductionPlan",
  components: {
    TableList
  }
};
</script>
<style scoped>
</style>