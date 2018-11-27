<template>
  <div>
    <!-- table上部按钮 -->
    <div slot="table-actions" >
      <el-dropdown>
        <el-button type="primary">
          车间<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>全部</el-dropdown-item>
          <el-dropdown-item>A</el-dropdown-item>
          <el-dropdown-item>D</el-dropdown-item>
          <el-dropdown-item>G</el-dropdown-item>
          <el-dropdown-item>I</el-dropdown-item>
          <el-dropdown-item>K</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary" @click="exportExcel()">导出</el-button>
      <el-button type="primary" @click="print()">打印</el-button>
      <el-button type="primary" @click="dialogVisible = true">排产</el-button>
      <el-button type="primary" @click="clearFilter">清除过滤</el-button>
    </div>
    <!-- element table 
         arrayObject.slice(start,end)方法使数据分页显示
    -->
    <el-table
      ref="filterTable"
      :data="tableData.slice( (currentPage-1)*pageSize, currentPage*pageSize)"
      style="width: 100%"
      stripe
      @selection-change="handleSelectionChange"
      @filter-change="filterChange"
    >
      <!-- reserve-selection属性保持选中状态 -->
      <el-table-column
        type="selection"
        width="55"
        reserve-selection
      >
      </el-table-column>
      <el-table-column
        prop="modid"
        width="60"
        label="modid"
        v-if=false
      >
      </el-table-column>
      <el-table-column
        prop="routeid"
        width="60"
        label="routeid"
        v-if=false
      >
      </el-table-column>
      <el-table-column
        prop="product_name"
        label="产品名称"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="number"
        label="工单"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="figure_number"
        label="零件图号"
        sortable
        :filters="Ffigure_number"
        :filter-method="filterHandler"
        column-key="figure_number"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        sortable
        :filters="Fname"
        :filter-method="filterHandler"
        column-key="name"
      >
      </el-table-column>
      <el-table-column
        prop="child_material"
        label="规格"
        sortable
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="standard"
        label="开料尺寸"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="count"
        label="数量"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="station"
        label="工位"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="completionTime"
        label="完成时间"
        sortable
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 数据分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>
    <!-- form表单编辑 -->
    <el-dialog title="信息详情" :visible.sync="hasInfoDialog">
      <el-form :model="form">
        <el-form-item label="产品信息" :label-width="formLabelWidth">
          <el-input v-model="form.product_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工单" :label-width="formLabelWidth">
          <el-input v-model="form.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="零件图号" :label-width="formLabelWidth">
          <el-input v-model="form.figure_number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="材料" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格" :label-width="formLabelWidth">
          <el-input v-model="form.child_material" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开料尺寸" :label-width="formLabelWidth">
          <el-input v-model="form.standard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="加工工艺路线" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="form.count" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工位" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="需求区" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排产时间" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="计划完成" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="完成时间" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hasInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="checkComfirm()" >修 改</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="排产"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <el-form>
        <el-form-item label="排产日期" :label-width="formLabelWidth">
         <el-date-picker
            v-model="schedule"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工位" :label-width="formLabelWidth">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="切管"></el-checkbox>
            <el-checkbox label="锯床"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSchedule">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
  
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import axios from "axios";
export default {
  name: "TableList",
  data() {
    return {
      canImport: false,
      hasInfoDialog: false,
      form: {},
      form: {},
      formLabelWidth: "120px",
      dialogVisible: false,
      schedule: "",
      checkList: [],
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      Fname: [
        // {text:'钢板1',value:'钢板1'},
        // {text:'轴',value:'轴'}
      ],
      Ffigure_number: [
        // {text:'FY-48B.03-00',value:'FY-48B.03-00'},
        // {text:'FY-48B.01.03.01-09',value:'FY-48B.01.03.01-09'}
      ],
      columnsKey: [],
      modid: [],
      routeid: []
    };
  },
  components: {
    VueGoodTable
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .post(`${this.baseURL}/productionplan/list.php`)
        .then(this.getDataSucc);
    },
    getDataSucc(res) {
      res = res.data;
      if (res.success && res.rows) {
        this.tableData = res.rows;
        let columns = this.columns;
        let data_length = res.rows.length;
        // checkbox 名称赋值
        let length1 = res.fName.length;
        for(let i=0; i < length1; i++) {
          this.Fname.push({text:res.fName[i].f4,value:res.fName[i].f4});
        }
        // checkbox 零件图号赋值
        let length2 = res.fFigure_number.length;
        for(let i=0; i < length2; i++) {
          this.Ffigure_number.push({text:res.fFigure_number[i].f3,value:res.fFigure_number[i].f3});
        }
        
      }
    },
    handleTableData(e) {
      this.form = e.row;
      this.hasInfoDialog = true;
    },
    handleClose(done) {
      done();
    },
    print() {
      window.print(); //打印方法
    },
    importExcel() {
      this.canImport = true;
    },
    // 导出
    exportExcel() {
      console.log('导出');
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      /* 
        this.pageSize设置值是因为element table里只对本页数据进行过滤
        因此设置此值相当于一页进行多少条数据进行过滤
      */
      this.pageSize = 1000000;
      return row[property] === value;
    },
    // 检测每次表格下拉筛选变化
    filterChange(filters) {
      // 遍历筛选checkbox值（根据column-key返回参数）
      for(let i in filters){
        // 若筛选值为空(即每点击一次重置键)，去除数组内columnKey一个键名，否则插入一个键名
        if(filters[i]=="") {
          this.columnsKey.splice(0,1);
        }else {
          // 先判断是否已有这个键值（即是否已对某列进行筛选，若已有则不插入）
          if(this.columnsKey.indexOf(i) == -1) {
            this.columnsKey.push(i);
          }
        }
      }
      // 若所有列都未被筛选，则重置表格数据
      if(this.columnsKey.length == 0) {
        this.$refs.filterTable.clearFilter();
        this.pageSize = 10;
      }
    },
    // 编辑监听
    handleClick(e) {
      this.form = e;
      this.hasInfoDialog = true;
    },
    // 设置table每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      // console.log(`每页 ${val} 条`);
    },
    // 设置当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 处理选中项
    handleSelectionChange(e) {
      this.modid = [];
      this.routeid = [];
      let selectLength = e.length;
      if (selectLength) {
        // 存储已选值数据
        for (let i=0; i < selectLength; i++) {
          this.modid.push(e[i].modid);
          this.routeid.push(e[i].routeid);
        }
      }
    },
    // 清除过滤
    clearFilter() {
      this.$refs.filterTable.clearFilter();
      this.pageSize = 10;
    },
    // 排产日期操作
    handleSchedule() {
      // console.log(this.schedule + this.checkList);
      
      // console.log(modid + routeid)
      // if(this.selectedValue.length && this.schedule && this.checkList.length){
        var fd = new FormData();
        console.log(this.schedule);
        fd.append('modid',this.modid);
        fd.append('routeid',this.routeid);
        fd.append('checkList',this.checkList);
        fd.append('schedule',this.schedule);
        axios.post(`${this.baseURL}/productionplan/schedule.php`,fd)
        .then(function(res){
          console.log(res.data);
          // console.log(response)
        })
      // }else {
      //   this.messageBox();
      // }
    },
    // 提醒框
    messageBox() {
      this.$alert('操作出错,请填写需要的信息~', '提醒', {
        confirmButtonText: '确定',
      });
    }
  }
};
</script>

<style>
</style>
