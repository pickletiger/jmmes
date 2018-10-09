<template>
<div>
  <el-container>
    <el-main>
      <el-collapse accordion>
        <!-- v-for(val,key,index) val是内容，key是键值名，index是索引 -->
        <el-collapse-item v-for="(item,key,index) in data" :key="index"  :title="item.name">
          <el-form>
            <el-form-item label="工艺路线1"></el-form-item>
              <el-steps :space="100" :active="item.finished.length" :align-center="true" finish-status="success">
                <!-- 使用插槽嵌套循环 -->
                <!-- element-ui 一些标签不能注册点击事件@click  需使用@click.native -->
                <slot :item="item">
                  <el-step v-for="(finished,f,index) in item.finished" :key="index"  :title="finished.routel" @click.native="handleStep(1)"></el-step>
                  <el-step v-for="(bulid,b,index) in item.bulid" :key="index" :title="bulid.routel" @click.native="handleStep(2)"></el-step>
                  <el-step  v-for="(unfinished,u,index) in item.unfinished" :key="index" :title="unfinished.routel" @click.native="handleStep(0)"></el-step>
                </slot>
              </el-steps>
              <el-button type="primary"  class="btn">查看</el-button>
          </el-form>
          </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
  <el-dialog title="工序详情" :visible.sync="dialogTableVisible">
    <el-form>
      <vue-good-table 
        :columns="columns" 
        :rows="rows" 
        @on-column-filter="selectionChanged"
        :search-options="{enabled: true}"
        :pagination-options="{enabled: true,mode: 'records',perPage: 5,perPageDropdown: [5],dropdownAllowAll: false,}"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'operate'">
            <el-button type="primary">查看</el-button>
            <el-button type="primary">向下增加工序</el-button>
            <el-button type="danger">删除</el-button>
          </span>
          <span v-else>
            {{props.formattedRow[props.column.field]}}
          </span>
        </template>
        <div slot="table-actions">
          <el-button type="primary">往后增加节点</el-button>
        </div>
      </vue-good-table>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import axios from 'axios'
import { VueGoodTable } from "vue-good-table"
export default {
  name: 'PartSch',
  props: {
    proschdata:Array
  },
  components:{
    VueGoodTable
  },
  data () {
    return {
      data:[],
      dialogTableVisible:false,
      columns: [
        {
          label: "工序",
          field: "route",
        },
        {
          label: "部件",
          field: "part"
        },
        {
          label: "部件编号",
          field: "id"
        },
        {
          label: "完成情况",
          field: "isfinished"
        },
        {
          label: "操作",
          field: "operate"
        }
      ],
      rows:[]
    }
  },
   // 监听数据的变化
  watch: {
    proschdata : {
      immediate: true,   //如果不加这个属性，父组件第一次传进来的值监听不到
      handler(val) {
        this.data = []
        this.data = val
        // console.log(val)
      }  
    }
  },
  methods: {
    selectionChanged(params) {
      console.log(params.columnFilters);
    },
    handleStep(isfinished) {
      axios.post('https://easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/routelist',{
        isfinished:isfinished
      }).then(this.getDataInfoSucc)
    },
    getDataInfoSucc(res) {
      // console.log(res.data.data.rows)
      this.rows = res.data.data.rows
      this.dialogTableVisible = true
    }
  }

}
</script>

<style scoped>
.btn{
  margin-top: 20px;
  margin-left: 20px;
}
</style>