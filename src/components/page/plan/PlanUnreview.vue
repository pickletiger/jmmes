<template>
  <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 项目管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <el-container>
            <el-aside width="200px">
              <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText">
              </el-input>

              <el-tree
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                :default-expand-all="false"
                @node-click="handleNodeClick"
                :filter-node-method="filterNode"
                ref="tree">
              </el-tree>
            </el-aside>
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "Project",
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
      handleNodeClick(data) {
        // console.log(data.id)
        const lx = data.id.substr(0,2)
        console.log(lx)
        switch(lx)
        {
          case 'xm':
          this.$router.push('/planproject')
          break
          case 'bj':
          this.$router.push('/planpart')
          break
          case 'zj':
          this.$router.push('/plansonpart')
          break
        }
        
      }
    },
    data() {
      return {
        filterText: '',
        isfinish: 'green',
        data: [{
          id:'xm1',
          label: '项目 1',
          children: [{
            id:'bj1',
            label: '部件 1-1',
            children: [{
              id:'zj1',
              label: '子部件 1-1-1',
              children: [{
                id:'gy1',
                isfinish : '完成',
                label: '工艺路线 1-1-1-1'
              }]
            }, {
              id:'zj2',
              label: '子部件 1-1-2',
              children: [{
                id:'gy2',
                isfinish : '完成',
                label: '工艺路线 1-1-2-1'
              }, {
                id:'gy3',
                isfinish : '建设中',
                label: '工艺路线 1-1-2-2'
              }]
            }]
          }]
        }, {
          id:'xm2',
          label: '项目2',
          children: [{
            id:'bj2',
            label: '部件2-1',
          }, {
            id:'bj3',
            label: '部件2-2'
          }]
        }, {
          id:'xm3',
          label: '项目3',
          children: [{
            id:'bj4',
            label: '部件3-1'
          }, {
            id:'bj5',
            label: '部件3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
};
</script>
<style scoped>
  
</style>