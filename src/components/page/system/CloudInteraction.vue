<template>
  <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 云平台交互</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="600px">
            <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText">
            </el-input>

            <el-tree
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                show-checkbox
                default-expand-all
                :filter-node-method="filterNode"
                ref="tree">
            </el-tree>
        </div>
        <el-button @click="getCheckedNodes">通过 node 获取</el-button>
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
                    id: 6,
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
            },
            leafOnly: false, 
            includeHalfChecked: true
        }
    },
    watch: {
        filterText(val) {
        this.$refs.tree2.filter(val);
        }
    },

    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        getCheckedNodes() {
            console.log(this.$refs.tree.getCheckedNodes(this.leafOnly,this.includeHalfChecked))
        }
        
    }
}
</script>
<style scoped>
  
</style>