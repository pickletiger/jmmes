<template>
  <div>
    <vue-good-table 
      :columns="columns" 
      :rows="rows" 
      @on-column-filter="selectionChanged"
      :search-options="{enabled: true}"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'operate'">
          <el-button type="primary" icon="el-icon-edit" circle @click="dialogFormVisible = true"></el-button>
          <el-button type="primary" icon="el-icon-tickets" circle @click="Displaymodule= true" ></el-button>
          <el-button type="primary" icon="el-icon-message" circle @click="Msgmodule= true" ></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteStaff" ></el-button>
          
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
      <div slot="table-actions">
        <el-button type="primary" @click="dialogFormVisible = true">新建</el-button>
        <el-button type="primary">导入</el-button>
      </div>
    </vue-good-table>
    <el-dialog title="职位设置" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="工号" :label-width="formLabelWidth">
            <el-input  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机"  :label-width="formLabelWidth">
            <el-input  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth">
             <el-select v-model="value">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="显示模块" :visible.sync="Displaymodule">
        <el-form :model="form">
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" show-checkbox></el-tree>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Displaymodule = false">取 消</el-button>
          <el-button type="primary" @click="Displaymodule = false">确 定</el-button>
        </div>
    </el-dialog>

        <el-dialog title="消息来源设置" :visible.sync="Msgmodule">
        <el-form :model="form">
          <el-form-item label="部门" :label-width="formLabelWidth">
             <el-select v-model="value">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Msgmodule = false">取 消</el-button>
          <el-button type="primary" @click="Msgmodule = false">确 定</el-button>
        </div>
    </el-dialog>
  </div>
  
</template>

<script>
import { VueGoodTable } from "vue-good-table";
export default {
  name: "AuthorityList",
  data() {
    return {
      dialogFormVisible: false,
      Displaymodule: false,
      Msgmodule: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
       data: [{
          label: '基础数据管理',
          children: [{
            label: '员工信息管理'
          },{
            label: '设备管理'
          },{
            label: '文档管理'
          },{
            label: '原材料管理'
          }]
        }, {
          label: '销售部',
          children: [{
            label: '未审核项目',
          },{
            label: '在建项目',
          },{
            label: '已完成项目',
          },{
            label: '审核',
          }]
        }, {
          label: '计划部',
          children: [{
            label: '未审核项目',
          },{
            label: '在建项目',
          },{
            label: '已完成项目',
          },{
            label: '审核',
          }]
        }, {
          label: '工艺部',
          children: [{
            label: '未审核项目',
          },{
            label: '在建项目',
          },{
            label: '已完成项目',
          }]
        }, {
          label: '车间',
          children: [{
            label: '电子看板',
          },{
            label: '车间计划',
          }]
        }, {
          label: '统计分析',
        }, {
          label: '系统设置',
          children: [{
            label: '操作日志',
          },{
            label: '数据备份与还原',
          },{
            label: '车间管理',
          },{
            label: '权限管理',
          },{
            label: '云平台交互',
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      formLabelWidth: "120px",
      searchItem: "",
      value1:'',
      options: [{
          value: '选项1',
          label: '销售部'
        }, {
          value: '选项2',
          label: '计划部'
        }, {
          value: '选项3',
          label: '工艺部'
        }, {
          value: '选项4',
          label: '车间'
        }],
        value: '',
        props: {
          label: 'name',
          children: 'zones'
        },
        options1: [{
          value: '选项1',
          label: '超级管理员'
        }, {
          value: '选项2',
          label: '经理'
        }, {
          value: '选项3',
          label: '主管'
        }, {
          value: '选项4',
          label: '普通员工'
        }],
        value: '',
        props: {
          label: 'name',
          children: 'zones'
        },
        count: 1,
      columns: [
        {
          label: "工号",
          field: "specification",
        },
        {
          label: "姓名",
          field: "size"
        },
        {
          label: "手机",
          field: "place"
        },
        {
          label: "职位",
          field: "date"
        },
        {
          label: "操作",
          field: "operate"
        }
      ],
      rows: [
        {
          id: 1,
          specification: "1",
          size: "张三",
          place: "13854215475",
          date: "车间主任"
        },
        {
          id: 2,
          specification: "2",
          size: "李四",
          place: "13555215485",
          date: "工人"
        },
        {
          id: 3,
          specification: "3",
          size: "某某",
          place: "13545215785",
          date: "经理"
        }
      ]
    };
  },
  components: {
    VueGoodTable
  },
  methods: {
    selectionChanged(params) {
      console.log(params.columnFilters);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 删除员工
    deleteStaff() {
        this.$confirm('将删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

      handleCheckChange(data) {
        console.log(data);
      }

      //显示模块设置
      // Displaymodule(){

      // }
  }
};
</script>

<style>
</style>
