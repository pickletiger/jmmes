<template>
  <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 文档管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <document-list></document-list>
        </div>
    </div>
</template>

<script>
import DocumentList from "./components/DocumentList"
export default {
  name: 'Document',
  components: {
      DocumentList
  }
}
</script>
<style scoped>
  
</style>