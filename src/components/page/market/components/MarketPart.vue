<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="部件信息">
        <part-information></part-information>
      </el-tab-pane>
      <el-tab-pane label="部件工艺卡">
        <route-card></route-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PartInformation from './PartInformation'
import RouteCard from './RouteCard'
export default {
  name: 'ProjectPart',
  components: {
    PartInformation,
    RouteCard
  },
  data () {
    return {
      date: ''
    }
  }
}
</script>
<style scoped>
 
</style>