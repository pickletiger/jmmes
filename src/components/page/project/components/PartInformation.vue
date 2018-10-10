<template>
<div>
  <el-container>
      <el-main>
        <div class="main">
        <el-form ref="form"  label-width="80px">
          <el-form-item label="部件名称">
            <el-col :span="10">
              <el-input v-model="data.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="部件编号">
            <el-col :span="10">
              <el-input v-model="data.id"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="工单号">
            <el-col :span="10">
              <el-input v-model="data.gdh"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="数量">
            <el-col :span="10">
              <el-input v-model="data.number"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="下工序">
            <el-col :span="10">
              <el-input v-model="data.next"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="data.remark" ></el-input>
          </el-form-item>
          <el-form-item label="工艺路线">
            <el-collapse accordion>
               <el-collapse-item>
                <el-steps :space="100" :active="1" :align-center="true" finish-status="success">
                    <el-step  title="K" @click.native="handleStep(1)"></el-step>
                    <el-step  title="T线" @click.native="handleStep(2)"></el-step>
                    <el-step  title="T装" @click.native="handleStep(0)"></el-step>
                    <el-step  title="IA" @click.native="handleStep(0)"></el-step>
                </el-steps>
               </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">返回上一级</el-button>
            <el-button type="primary">保存</el-button>
          </el-form-item>
          
        </el-form>
      </div>
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
  name: 'PartInformation',
  components: {
    VueGoodTable
  },
   data () {
    return {
      dialogTableVisible:false,
      data: {
        name: '槽钢',
        id: '1211111',
        gdh: '15#',
        remark: '备注详情',
        number: 10,
        next: 'K'
      },
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
 .project-main {
    margin-top: -20px;
  }
  .header {
    text-align: center;
    font-size: 24px;
    line-height: 60px;
    background: #fff;
    border-bottom: #eee 1px solid;
    margin-top: -20px;
  }
  .main {
    position: relative;
    width: 100%;
  }
</style>

