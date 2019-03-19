<template>
  <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 云平台交互</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="600px">
            <el-button type="primary" @click="dowmload">下载</el-button>

            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CloudInteraction',
    data (){
        return {
            filterText:'',
            data:[{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                    id: 9,
                    label: '三级 1-1-1'
                    }, {
                    id: 10,
                    label: '三级 1-1-2'
                    }]
                }]
                }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }, {
                    id: 7,
                    label: '二级 2-2'
                }]
                }, {
                id: 4,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],
            defaultProps:{
                children:'children',
                label:'label'
            }
        }
    },
    watch: {
        filterText(val) {
        this.$refs.tree.filter(val);
        }
    },

    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleNodeclick(data,node,self) {
            // console.log(data)
            console.log(node.data.label)
            // console.log(self)
            this.$confirm('是否删除部件： '+node.data.label+' ?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$refs.tree.remove(node)
                    console.log(this.data)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
            });
        },
        //下载
        dowmload(){
             window.open(`${this.baseURL}`+"/Test.php")
        }
    }
}
</script>
<style scoped>
  
</style>