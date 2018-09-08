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
              <project v-if="lx=='xm'||lx==''" :id="lxid"></project>
              <part v-if="lx=='bj'" :id="lxid"></part>
              <son-part v-if="lx=='zj'" :id="lxid"></son-part>
              <routing v-if="lx=='gy'" :id="lxid"></routing>
              <work-shop v-if="lx=='cj'"  :id="lxid"></work-shop>
              <process v-if="lx=='gx'" :id="lxid"></process>
            </el-main>
          </el-container>
        </div>
    </div>
</template>

<script>
import Project from '../components/Project'
import Part from '../components/Part'
import SonPart from '../components/SonPart'
import Routing from '../components/Routing'
import WorkShop from '../components/WorkShop'
import Process from '../components/Process'
export default {
  name: "PlanFinished",
  components:{
    Project,
    Part,
    Routing,
    Process,
    SonPart,
    WorkShop
  },
  data() {
      return {
        lx:'',
        lxid:'',
        filterText: '',
        data: [{
          id:'xm1',
          label: '断轨过山车体',
          children: [{
            id:'bj1',
            label: '轮架',
            children: [{
              id:'zj1',
              label: '子部件 1-1-1',
              children: [{
                id:'gy1',
                isfinish : '2',
                label: '工艺路线 1-1-1-1',
                children: [{
                  id:'cj1',
                  isfinish : '2',
                  label: '车间1',
                  children:[{
                    id:'gx1',
                    isfinish : '2',
                    label: '工序1'
                  }, {
                    id:'gx2',
                    isfinish : '2',
                    label: '工序2'
                  }]
                }, {
                  id:'cj1',
                  isfinish : '2',
                  label: '车间1'
                }]
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
      handleNodeClick(data) {
        // console.log(data.id)
        this.lx = data.id.substr(0,2)
        console.log(lx)
      }
    }
};
</script>
<style scoped>
  
</style>