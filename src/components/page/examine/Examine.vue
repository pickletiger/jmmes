<template>
  <div>
    <!-- <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-search"></i> 检验模块</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <div class="examine">
      <el-tabs 
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane 
          label="未检验" 
          name="first"
        ></el-tab-pane>
        <el-tab-pane 
          label="合格" 
          name="second"
        ></el-tab-pane>
        <el-tab-pane 
          label="不合格" 
          name="third"
        ></el-tab-pane>
        <examine-table :item="item"></examine-table>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import ExamineTable from './components/Table.vue'

export default {
  name: "Examine",
  components: {
    ExamineTable
  },
  data () {
    return {
      activeName: 'first',
      item: '未检验',
    }
  },
  methods: {
    handleClick (e) {
      this.item = e.label
    },
  }
}
</script>

<style scoped>
  .iconfont {
    font-size: 14px;
  }
  .examine {
    padding: 30px;
    border-radius: 5px;
    background: #fff;
  }
  
</style>