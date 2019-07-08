<template>
  <div>
    <!-- table上部按钮 -->
    <div slot="table-actions" class="table-actions" >
      <el-button type="danger" value = 'ALL'  @click="select_WS('ALL')">全部车间</el-button>
      <el-button type="primary" class="btn" value = 'K'  @click="select_WS('K')">K开料车间</el-button>
      <el-button type="primary" class="btn" value = 'TK'  @click="select_WS('TK')">TK开料车间</el-button>
      <el-button type="primary" class="btn" value = 'S'  @click="select_WS('S')">安装S</el-button>
      <el-button type="primary" class="btn" value = 'F'  @click="select_WS('F')">玻璃钢F</el-button>
      <el-button type="primary" class="btn" value = 'G'  @click="select_WS('G')">电气G</el-button>
      <el-button type="primary" class="btn" value = 'T'  @click="select_WS('T')">机加T</el-button>
      <el-button type="primary" class="btn" value = 'I'  @click="select_WS('I')">机械车间</el-button>
      <el-button type="primary" class="btn" value = 'L'  @click="select_WS('L')">结构L</el-button>
      <el-button type="primary" class="btn" value = 'J'  @click="select_WS('J')">探伤</el-button>
      <el-button type="primary" class="btn" value = 'W'  @click="select_WS('W')">外协W</el-button>
    </div>
    <br/>
    <div slot="table-actions" class="table-actions" >
      <el-input v-model="searchValue" placeholder="请输入关键词" style="width: 200px;"></el-input>
      <el-select v-model="searchCondition" placeholder="请选择要搜索的内容" style="margin-left: 16px">
        <el-option
          v-for="item in searchOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click.native="search" style="margin-left: 16px">搜索
        <i class="el-icon-search el-icon--right"></i>
      </el-button>
      <el-button type="primary"  @click="dialogFormExport=true">导出</el-button>
      <el-button type="primary" v-if="show_2btn"  @click="dialogVisible = true">排产</el-button>
      <el-button type="primary" v-if="show_4btn"  @click="dialogFormBack = true">退产</el-button>
      <el-button type="primary" v-if="show_5btn"  @click="dialogScrap = true">报废排产</el-button>
      <el-button type="primary" v-if="show_3btn" @click="print()"  >生产计划表</el-button>
      <el-button type="primary" v-if="show_3btn" @click="print2()"  >产品标志卡</el-button>
      <el-button type="primary" v-if="show_2btn" @click="print3()"  >零件质量记录表</el-button>
      <el-button type="primary" @click="clearFilter">清除过滤</el-button>
    </div>
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <!-- 未排产选项卡 -->
      <el-tab-pane label="未排产" name="first">
        <el-table
          ref="filterTable"
          :data="tableData.slice( (currentPage-1)*pageSize, currentPage*pageSize)"
          style="width: 100%"
          :row-class-name="tableRowClassName"
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
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="child_material"
            label="规格"
            width="180"
            :filters="fChild_material"
            :filter-method="filterHandler"
            column-key="child_material"
          >
          </el-table-column>
          <el-table-column
            prop="standard"
            label="开料尺寸"
            :filters="fStandard"
            :filter-method="filterHandler"
            column-key="standard"
          >
          </el-table-column>
          <el-table-column
            prop="route"
            label="加工工艺路线"
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
            prop="backMark"
            label="退产"
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
      </el-tab-pane>


      <!-- 已排产选项卡 -->
      <el-tab-pane label="已排产" name="second">
        <!-- element table 
            arrayObject.slice(start,end)方法使数据分页显示
        -->
        <el-table
          ref="filterTable2"
          :data="tableData2.slice( (currentPage2-1)*pageSize2, currentPage2*pageSize2)"
          style="width: 100%"
          stripe
          @selection-change="handleSelectionChange"
          @filter-change="filterChange"
        >
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
            prop="partid"
            width="60"
            label="partid"
            v-if=false
          >
          </el-table-column>
          <el-table-column
            prop="fid"
            width="60"
            label="fid"
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
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="child_material"
            label="规格"
            width="180"
            :filters="FChild_material"
            :filter-method="filterHandler2"
            column-key="child_material2"
          >
          </el-table-column>
          <el-table-column
            prop="standard"
            label="开料尺寸"
            :filters="FStandard"
            :filter-method="filterHandler2"
            column-key="standard2"
          >
          </el-table-column>
          <el-table-column
            prop="route"
            label="加工工艺路线"
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
            :filter-method="filterHandler2"
          >
          </el-table-column>
          <el-table-column
            prop="demand_area"
            label="需求区"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="schedule_date"
            label="完成时间"
            sortable
            :filter-method="filterHandler2"
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
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :current-page="currentPage2"
            :page-sizes="[10, 25, 50, 100]"
            :page-size="pageSize2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData2.length">
          </el-pagination>
        </div>
      </el-tab-pane>

      <!-- 生产中选项卡 -->
      <el-tab-pane label="生产中" name="third">
        <!-- element table 
            arrayObject.slice(start,end)方法使数据分页显示
        -->
        <el-table
          ref="filterTable3"
          :data="tableData3.slice( (currentPage2-1)*pageSize2, currentPage2*pageSize2)"
          style="width: 100%"
          stripe
          @selection-change="handleSelectionChange"
          @filter-change="filterChange"
        >
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
            prop="partid"
            width="60"
            label="partid"
            v-if=false
          >
          </el-table-column>
          <el-table-column
            prop="fid"
            width="60"
            label="fid"
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
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="child_material"
            label="规格"
            width="180"
            :filters="FChild_material"
            :filter-method="filterHandler2"
            column-key="child_material2"
          >
          </el-table-column>
          <el-table-column
            prop="standard"
            label="开料尺寸"
            :filters="FStandard"
            :filter-method="filterHandler2"
            column-key="standard2"
          >
          </el-table-column>
          <el-table-column
            prop="route"
            label="加工工艺路线"
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
            :filter-method="filterHandler2"
          >
          </el-table-column>
          <el-table-column
            prop="demand_area"
            label="需求区"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="schedule_date"
            label="完成时间"
            sortable
            :filter-method="filterHandler2"
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
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :current-page="currentPage2"
            :page-sizes="[10, 25, 50, 100]"
            :page-size="pageSize2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData3.length">
          </el-pagination>
        </div>
      </el-tab-pane>

       <!-- 报废品选项卡 -->
      <el-tab-pane label="报废品" name="four">
        <!-- element table 
            arrayObject.slice(start,end)方法使数据分页显示
        -->
        <el-table
          ref="filterTable4"
          :data="tableData4.slice( (currentPage2-1)*pageSize2, currentPage2*pageSize2)"
          style="width: 100%"
          stripe
          @selection-change="handleSelectionChange"
          @filter-change="filterChange"
        >
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
            prop="Wid"
            width="60"
            label="Wid"
            v-if=false
          >
          </el-table-column>
          <el-table-column
            prop="partid"
            width="60"
            label="partid"
            v-if=false
          >
          </el-table-column>
          <el-table-column
            prop="fid"
            width="60"
            label="fid"
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
            prop="pNumber"
            label="工单"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="figure_number"
            label="零件图号"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="child_material"
            label="规格"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="route"
            label="加工工艺路线"
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
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :current-page="currentPage2"
            :page-sizes="[10, 25, 50, 100]"
            :page-size="pageSize2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData4.length">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
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
        <el-form-item label="退产原因" :label-width="formLabelWidth">
          <el-input v-model="form.reason" auto-complete="off"></el-input>
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
        <el-form-item label="交付日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="overdata"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="工位" :label-width="formLabelWidth">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="切管"></el-checkbox>
            <el-checkbox label="锯床"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="开料尺寸定额" :label-width="formLabelWidth">
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSchedule">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 报废品排产 -->
    <el-dialog
      title="报废品排产"
      :visible.sync="dialogScrap"
      :before-close="handleClose">
      <el-form>
        <el-form-item label="排产日期" :label-width="formLabelWidth">
         <el-date-picker
            v-model="scheduleScrap"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="交付日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="overdataScrap"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogScrap = false">取 消</el-button>
        <el-button type="primary" @click="handleScrap">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 导出Excel条件对话框 -->
    <el-dialog title="导出" :visible.sync="dialogFormExport">
      <el-form :model="form">
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="form.productName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="车间" :label-width="formLabelWidth">
          <el-select v-model="form.workShop" placeholder="请选择车间">
            <el-option label="全部" value="0"></el-option>
            <!-- <el-option label="W车间" value="1"></el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormExport = false">取 消</el-button>
        <el-button type="primary" @click="exportExcel">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 退产模态框 -->
    <el-dialog title="导出" :visible.sync="dialogFormBack">
      <el-form :model="form">
        <el-form-item label="退产原因" :label-width="formLabelWidth">
          <el-input v-model="form.backReason" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormBack = false">取 消</el-button>
        <el-button type="primary" @click="dialogBack">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import axios from "axios";
export default {
  name: "TableList",
  inject: ['reload'],
  data() {
    return {
      canImport: false,
      hasInfoDialog: false,
      form: {},
      formLabelWidth: "120px",
      dialogVisible: false,
      dialogScrap:false,
      dialogFormExport: false,
      dialogFormBack: false,
      schedule: "",
      overdata:"",
      scheduleScrap:'',
      overdataScrap:'',
      checkList: ["切管"],
      tableData: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      pageSize: 10,
      pageSize2: 10,
      currentPage: 1,
      currentPage2: 1,
      fStandard: [],
      fChild_material: [],
      FStandard: [],
      FChild_material: [],
      columnsKey: [],
      modid: [],
      routeid: [],
      Wid:[],
      printVal: [],
      activeName: 'first',
      show_2btn: true,
      show_3btn: false,
      show_4btn:false,
      show_5btn:false,
      searchOptions: [
        {
          value: 'product_name',
          label: '产品名称'
        },{
          value: 'number',
          label: '工单'
        },{
          value: 'figure_number',
          label: '零件图号'
        },{
          value: 'name',
          label: '名称'
        },{
          value: 'child_material',
          label: '规格'
        },{
          value: 'standard',
          label: '开料尺寸'
        },{
          value: 'route',
          label: '加工工艺路线'
        },{
          value: 'count',
          label: '数量'
        }], // 搜索下拉选项
      value: '',
      searchValue:'',
      searchCondition:''
    };
  },
  components: {
    VueGoodTable
  },
  mounted() {
    var flag = "Undelivered"
    this.getData(flag)
  },
  methods: {
    // 车间按钮
    select_WS(value){
      let isfinish = ''
      let arr = ''
      if(this.activeName=='first'){
        isfinish = '3'
      }else if(this.activeName=='second'){
        isfinish = '0'
      }else{
        isfinish = '2'
      }
      if(value=='K'){
        arr ='("K","K坡")'
      }else if(value == 'S'){
        arr ='("S安装补贴","S玻璃钢","S厂检","S电气","S调试","S钢结构","S国（省）检","S派人维修","S移交客户","S座舱")'
      }else if(value == 'F'){
        arr ='("F成型","F翻模","F模具","F喷涂","F装配","M木工")'
      }else if(value == 'G'){
        arr ='("GS","G接线","G装灯","G装箱")'
      }else if(value == 'T'){
        arr ='("T粗","T淬","T调","T发黑","T焊","T划线","T坡","T退","T线","T正火","T装")'
      }else if(value == "TK"){
        arr ='("TK")'
      }else if(value == 'I'){
        arr ='("IA","IA1","IB","ID","IG","IS","I钻")'
      }else if(value == 'L'){
        arr ='("LK","L焊","L转","L装")'
      }else if(value == "J"){
        arr ='("J探")'
      }else if(value == 'W'){
        arr ='("FW成型","FW成型底漆","FW底漆","FW面漆","FW模具","TW半精车","TW插","TW粗车","TW调质","TW高频","TW滚","TW精车","TW拉","TW磨","TW刨","TW镗","TW铣","TW线割","W彩锌","W冲压","W镀铬","W镀锌","W发黑","W发泡","W改制","W回火","W机","W浸","W卷","W喷塑","W漆","W渗氮","W折","W退火")'
      }
      var fd = new FormData()
          fd.append("flag","Select")
          fd.append("isfinish",isfinish)
          fd.append("list",arr)
          axios.post(`${this.baseURL}/productionplan/select.php`,fd).then(this.getDataSucc)
      if(value=='ALL'){
          window.location.reload()
      }
    },
    
    getData(flag) {
      var flag = flag
      var fd = new FormData()
          fd.append("flag",flag)
      axios
        .post(`${this.baseURL}/productionplan/list.php`,fd)
        .then(this.getDataSucc);
    },
    getDataSucc(res) {
      if(res.data.success=="error"){
        alert("暂无数据")
      }
      console.log(res.data)
      res = res.data
      if (res.rows) {
        // 未排产
        this.tableData = res.rows
        if(res.fStandard&&res.fChild_material){
          let columns = this.columns
          let data_length = res.rows.length
          // checkbox 开料尺寸赋值
          let length1 = res.fStandard.length
          for(let i=0; i < length1; i++) {
            this.fStandard.push({text:res.fStandard[i].f6,value:res.fStandard[i].f6})
          }
          // checkbox 规格赋值
          let length2 = res.fChild_material.length
          for(let i=0; i < length2; i++) {
            this.fChild_material.push({text:res.fChild_material[i].f5,value:res.fChild_material[i].f5})
          }
        }
        
      }

      if(res.rows2) {
        // 已排产
        this.tableData2 = res.rows2
        // checkbox 规格赋值
        if(res.FStandard&&res.FChild_material){
           let length3 = res.FChild_material.length
          for(let i=0; i < length3; i++) {
            this.FChild_material.push({text:res.FChild_material[i].F5,value:res.FChild_material[i].F5})
          }
          // checkbox 开料尺寸规格赋值
          let length4 = res.FStandard.length
          for(let i=0; i < length4; i++) {
            this.FStandard.push({text:res.FStandard[i].F6,value:res.FStandard[i].F6})
          }
        }
       
      }

      if(res.rows3) {
        // 生产中
        this.tableData3 = res.rows3
      }
      if(res.rows4) {
        // 生产中
        this.tableData4 = res.rows4
      }
    },
    search(){
      var isfinish = ''
      if(this.activeName=='first'){
        isfinish = '3'
      }else if(this.activeName=='second'){
        isfinish = '0'
      }else{
        isfinish = '2'
      }
      var fd = new FormData()
          fd.append("flag","screen")
          fd.append("searchValue",this.searchValue)
          fd.append("searchCondition",this.searchCondition)
          fd.append("isfinish",isfinish)
          axios.post(`${this.baseURL}/productionplan/select.php`,fd).then(this.getDataSucc)
    },
    handleClose(done) {
      done();
    },
    // 打印生产计划
    print() {
      let routeData = this.$router.resolve({
        name: "printTable"
      });
      window.open(routeData.href, '_blank');
    },
    // 打印产品标识卡
    print2() {
      let routeData2 = this.$router.resolve({
        name: "QrcodeList"
      });
      window.open(routeData2.href, '_blank');
    },
    // 打印零件质量记录表
    print3() {
      let routeData3 = this.$router.resolve({
        name: "PartsQuality"
      });
      window.open(routeData3.href, '_blank');
    },
    importExcel() {
      this.canImport = true;
    },
    // 导出
    exportExcel() {
      let that = this
      if(this.form.productName){
        var fd = new FormData()
        fd.append('flag',"0")
        fd.append('name',this.form.productName)
        axios.post(`${this.baseURL}/productionplan/export.php`,fd)
        .then(function(res){
          // 成功回调
          window.open(`${that.baseURL}`+"/productionplan/"+res.data)
          that.dialogFormExport = false
        })
      }else{
        alert('产品名称不能为空！')
      }
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
    filterHandler2(value, row, column) {
      const property = column["property"];
      /* 
        this.pageSize设置值是因为element table里只对本页数据进行过滤
        因此设置此值相当于一页进行多少条数据进行过滤
      */
      this.pageSize2 = 1000000;
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
    filterChange2(filters) {
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
        this.$refs.filterTable2.clearFilter();
        this.pageSize2 = 10;
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
    },
    handleSizeChange2(val) {
      this.pageSize2 = val;
      this.currentPage2 = 1;
    },
    // 设置当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val;
    },
    // 处理选中项
    handleSelectionChange(e) {
      this.modid = []
      this.routeid = []
      this.Wid = []
      // 存储勾选项所有信息
      this.printVal = e
      this.route_line = e
      let selectLength = e.length
      if (selectLength) {
        // 存储已选值数据
        for (let i=0; i < selectLength; i++) {
          this.modid.push(e[i].modid)
          this.routeid.push(e[i].routeid)
          this.Wid.push(e[i].Wid)
        }
      }
      // 清空缓存
      sessionStorage.removeItem('table');
      sessionStorage.removeItem('checkList');
      sessionStorage.removeItem('schedule');
      sessionStorage.removeItem('route');
      // 缓冲数据，作为打印页面传递数据
      sessionStorage.setItem('route',JSON.stringify(this.route_line));
      sessionStorage.setItem('table',JSON.stringify(this.printVal));
      sessionStorage.setItem('checkList',JSON.stringify(this.checkList));
      sessionStorage.setItem('schedule',JSON.stringify(this.schedule));
    },
    // 清除过滤
    clearFilter() {
      this.$refs.filterTable.clearFilter();
      this.$refs.filterTable2.clearFilter();
      this.$refs.filterTable3.clearFilter();
      this.$refs.filterTable4.clearFilter();
      this.pageSize = 10;
      this.pageSize2 = 10;
    },
    // 排产日期操作
    handleSchedule() {
      let that = this;
      if(this.modid.length && this.schedule && this.checkList.length){
        var fd = new FormData()
        fd.append('flag',"Schedule")
        fd.append('modid',this.modid)
        fd.append('routeid',this.routeid)
        fd.append('cuser',localStorage.getItem("ms_username"))
        fd.append('checkList',this.checkList)
        fd.append('schedule',this.schedule)
        fd.append('overdata',this.overdata)
        axios.post(`${this.baseURL}/productionplan/schedule.php`,fd)
        .then(function(res){
          // 成功回调
          that.dialogVisible = false;
          if(res.data=="1"){
            alert("操作成功")
            that.reload()
          }else{
            alert("含有不能排产的零件，请重新选择进行排产！")
          }
        })
      }else {
        // 操作失败
        this.$alert('出错啦（未选择项目或信息填写不全）~', '提醒', {
          confirmButtonText: '确定',
        });
      }
      
    },
    // 报废品排产
  handleScrap(){
    let that = this;
      if(this.modid.length && this.checkList.length){
        var fd = new FormData()
        fd.append('flag',"Scrap")
        fd.append('Wid',this.Wid)
        fd.append('cuser',localStorage.getItem("ms_username"))
        fd.append('checkList',this.checkList)
        fd.append('scheduleScrap',this.scheduleScrap)
        fd.append('overdataScrap',this.overdataScrap)
        axios.post(`${this.baseURL}/productionplan/schedule.php`,fd)
        .then(function(res){
          // 成功回调
          that.dialogVisible = false;
          if(res.data=="1"){
            alert("操作成功")
            that.reload()
          }else{
            alert("含有不能排产的零件，请重新选择进行排产！")
          }
        })
      }else {
        // 操作失败
        this.$alert('出错啦（未选择项目或信息填写不全）~', '提醒', {
          confirmButtonText: '确定',
        });
      }
  },


    //退产操作
    dialogBack(){
      let that = this
      var fd = new FormData()
      fd.append('flag',"Back")
      fd.append('modid',this.modid)
      fd.append('reason',this.form.backReason)
      fd.append('routeid',this.routeid)
      axios.post(`${this.baseURL}/productionplan/schedule.php`,fd)
      .then(function(res){
        // 成功回调
        that.dialogVisible = false;
        alert('操作成功!')
        that.reload()
      })
    },

    // 选项卡切换
    tabClick(tab, event) {
      // console.log(tab.name)
      // 已排产页面隐藏排产按钮
      if (tab.name == 'second') {
        
        this.show_2btn = false
        this.show_3btn = true
        this.show_4btn = true
        this.show_5btn = false
        var flag = "Delivered"
            this.getData(flag)
      }else if(tab.name == 'third'){
        this.show_4btn = false
        this.show_2btn = false
        this.show_3btn = false
        this.show_5btn = false
        var flag = "Production"
            this.getData(flag)
      }else if(tab.name == 'four'){
        this.show_4btn = false
        this.show_2btn = false
        this.show_5btn = true
        this.show_3btn = false
        var flag = "Scrap"
            this.getData(flag)
      }else {
        this.show_5btn = false
        this.show_4btn = false
        this.show_2btn = true
        this.show_3btn = false
      }
    },

    //改变指定行的颜色
     tableRowClassName({row, rowIndex}) {
        if (row.backMark == '是') {
          return 'warning-row';
        }
        return '';
      }
  }
};
</script>
<style scoped>
  .btn{
    background: 	#00DD00;
  }
</style>
<style>
  .warning-row td{
    background: rgb(241, 245, 12) !important;
  }
</style>