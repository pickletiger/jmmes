<template>
  <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <authority-list></authority-list>
        </div>
    </div>
</template>

<script>
import AuthorityList from './components/AuthorityList'
export default {
    name: 'Authority',
    components: {
        AuthorityList
  }
}
</script>
<style scoped>
  
</style>