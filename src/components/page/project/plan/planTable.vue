<template>
  <div>
    <!-- <div class="crumbs">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-tickets"></i> 计划总表</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <div class="btn">
      <el-button type="primary" @click.native="upload">导入
      <i class="el-icon-upload el-icon--left"></i>
      </el-button>
    </div>
    <div class="search">
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
    </div>
    <div class="table" ref="loading">
      <el-table
      border
      style="width: 100%"
      :data="tableData"
      height="750"
      :highlight-current-row="true"
      :header-row-style="{color: '#000','font-size': '14px'}"
      >
        <el-table-column
          v-for="(item,key) of tableHead"
          :fixed="item.fixed"
          :prop="item.prop"
          :label="item.name"
          :width="item.width"
          :key="key">
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
        :small='true'
        class="pagination">
      </el-pagination>
    </div>
    <upload 
      :dialogFormVisible="showUpload"
      @uploadSuccess="uploadSuccess"
      @closeShow="closeShow"></upload>
    <editor
      :dialogFormVisible="showEditor"
      :rowData="dataEditor"
      @closeShow="closeShow"
      @success="getData"
      ></editor>
  </div>
</template>

<script>
import Upload from '../components/Upload'
import Editor from '../components/Editor'
import axios  from 'axios'
import { Loading } from 'element-ui';
import { Message } from 'element-ui';

export default {
  name: 'PlanTable',
  components: {
    Upload,
    Editor
  },
  data () {
    return {
      // 表头
        tableHead: [
          {name:'序号',prop:'序号',width: 80,fixed:'left'},
          {name:'产品名称',prop:'产品名称',width: 80,fixed:'left'},
          {name:'编号',prop:'编号',width: 80,fixed:'left'},
          {name:'工单',prop:'工单',width: 80,fixed:'left'},
          {name:'安装场地',prop:'安装场地',width: 80,fixed:'left'},
          {name:'外观',prop:'外观',width: 80,fixed:'left'},
          {name:'颜色',prop:'颜色',width: 80,fixed:'left'},
          {name:'拦河',prop:'拦河',width: 80,fixed:false},
          {name:'控制室',prop:'控制室',width: 80,fixed:false},
          {name:'基础预埋件',prop:'基础预埋件',width: 80,fixed:false},
          {name:'站台/自动门',prop:'站台/自动门',width: 80,fixed:false},
          {name:'车体/座舱',prop:'车体/座舱',width: 80,fixed:false},
          {name:'备注',prop:'备注',width: 80,fixed:false},
          {name:'优先级',prop:'优先级',width: 80,fixed:false},
          {name:'玻璃钢预埋件状态',prop:'玻璃钢预埋件状态',width: 80,fixed:false},
          {name:'排产工艺清单',prop:'排产工艺清单',width: 80,fixed:false},
          {name:'重点产品',prop:'重点产品',width: 80,fixed:false},
          {name:'重要材料信息',prop:'重要材料信息',width: 80,fixed:false},
          {name:'交付时间',prop:'交付时间',width: 100,fixed:false},
          {name:'进厂时间',prop:'进厂时间',width: 100,fixed:false},
          {name:'初始计划开始时间',prop:'初始计划开始时间',width: 100,fixed:false},
          {name:'初始计划完成时间',prop:'初始计划完成时间',width: 100,fixed:false},
          {name:'实际计划开始时间',prop:'实际计划开始时间',width: 100,fixed:false},
          {name:'实际计划完成时间',prop:'实际计划完成时间',width: 100,fixed:false},
          {name:'计划排产时间',prop:'计划排产时间',width: 100,fixed:false},
          {name:'K',prop:'K',width: 100,fixed:false},
          {name:'T-焊前',prop:'T-焊前',width: 100,fixed:false},
          {name:'T组焊',prop:'T组焊',width: 100,fixed:false},
          {name:'T装配',prop:'T装配',width: 100,fixed:false},
          {name:'F',prop:'F',width: 100,fixed:false},
          {name:'W',prop:'W',width: 100,fixed:false,fixed:false},
          {name:'D装配',prop:'D装配',width: 100,fixed:false},
          {name:'G',prop:'G',width: 100,fixed:false},
          {name:'L组焊',prop:'L组焊',width: 100,fixed:false},
          {name:'I/L装配',prop:'I/L装配',width: 100,fixed:false},
          {name:'外协轨道立柱/塔架/金字架架/转盘',prop:'外协轨道立柱/塔架/金字架架/转盘',width: 100,fixed:false},
          {name:'厂内轨道立柱/塔架',prop:'厂内轨道立柱/塔架',width: 100,fixed:false},
          {name:'座舱/车体/船体',prop:'座舱/车体/船体',width: 100,fixed:false},
        ],
        showUpload: false,
        showEditor: false,
        dataEditor: {},
        tableData: [], // 表格数据
        count: 0, // 总行数
        loadingInstance: '', // 加载框对象
        pageSize: 10, // 每页条数
        currentPage: 1, // 当前页
        options: {
          text: '加载中...',
          background: "rgba(f,f,f,0.3)",
          text: '加载中',
          spinner: 'el-icon-loading',
        }, // 加载框配置
        message: {
          message: '暂无数据！',
          duration: 3000,
        }, // 弹出框配置
        searchOptions: [{value: '0',label: '全部'},{value: 'serial_number',label: '序号'},{value: 'product_name',label: '产品名称'},{value: 'numbering',label: '编号'},{value: 'work_order',label: '工单'},{value: 'installation_site',label: '安装场地'},{value: 'exterior',label: '外观'},{value: 'colour',label: '颜色'},{value: 'barrage',label: '拦河'},{value: 'control_room',label: '控制室'},{value: 'basic_embedded_parts',label: '基础预埋件'},{value: 'platform_automatic_door',label: '站台/自动门'},{value: 'car_body_cockpit',label: '车体/座舱'},{value: 'remarks',label: '备注'},{value: 'priority',label: '优先级'},{value: 'frp_embedded_parts',label: '玻璃钢预埋件状态'},{value: 'scheduling_process_list',label: '排产工艺清单'},{value: 'important_product',label: '重点产品'},{value: 'important_material_information',label: '重要材料信息'},{value: 'due_time',label: '交付时间'},{value: 'arrival_time',label: '进厂时间'},{value: 'initial_planning_start_time',label: '初始计划开始时间'},{value: 'initial_plan_completion_time',label: '初始计划完成时间'},{value: 'actual_planned_start_time',label: '实际计划开始时间'},{value: 'actual_planned_completion_time',label: '实际计划完成时间'},{value: 'planned_scheduling_time',label: '计划排产时间'},{value: 'K',label: 'K'},{value: 'T_before_welding',label: 'T-焊前'},{value: 'T_welding',label: 'T组焊'},{value: 'T_assembly',label: 'T装配'},{value: 'F',label: 'F'},{value: 'W',label: 'W'},{value: 'D_assembly',label: 'D装配'},{value: 'G',label: 'G'},{value: 'L_welding',label: 'L组焊'},{value: 'IL_assembly',label: 'I/L装配'},{value: 'outer_track_column',label: '外协轨道立柱/塔架/金字架架/转盘'},{value: 'in_plant_track_column',label: '厂内轨道立柱/塔架'},{value: 'cockpit',label: '座舱/车体/船体'}], // 搜索下拉选项
        searchCondition: '',
        searchValue: ''
    }
  },
  methods: {
    // 打开编辑模态框
    handleClick (row) { 
      this.showEditor = true;
      this.dataEditor = row;
    },

    // 打开上传模态框
    upload () {
      this.showUpload = true;
    },

    // 关闭模态框
    closeShow (val) {
      val.type == 'upload'?this.showUpload = val.show :
      this.showEditor = val.show;
    },

    // 改变每页条数
    handleSizeChange (pageSize) {
      this.pageSize = pageSize;
      this.options.text = '加载中...';
      this.getData();
    },

    // 改变当前页
    handleCurrentChange (current) {
      this.currentPage = current;
      this.options.text = '加载中...';
      this.getData();
    },

    // 改变当前页和每页条数时加载数据
    getData () {
      axios.get(`${this.baseURL}/planTable/loadTable.php?pageSize=${this.pageSize}&current=${this.currentPage}&searchValue=${this.searchValue || 0}&searchCondition=${this.searchCondition || 0}`).then(this.success).catch(this.error);
      this.loadingInstance = Loading.service(this.options);
    },

    // 搜索记录
    search() {
      this.currentPage = 1;
      this.getData();
    },

    // 上传成功回调
    uploadSuccess (res) {
      // console.log(res);
      if(res.result) {
        this.options.text = '上传成功，正在加载...';
        this.getData();
        this.showUpload = false
      }else {
        console.log('上传失败')
      }
    },

    // 成功回调
    success (ret) {
      if(ret.data && ret.data.ret) {
        this.tableData = ret.data.data;
        this.count = Number(ret.data.count);
      }else {
        Message.warning(this.message);
      }
      // 关闭加载框
      this.$nextTick(() => {
        this.loadingInstance.close();
      });
    },

    // 失败回调
    error (e) {
      // 关闭加载框
      this.$nextTick(() => { 
        this.loadingInstance.close();
      });
      Message.warning(this.message);
    }
  },
  created () {
    axios.get(`${this.baseURL}/planTable/loadTable.php?pageSize=${this.pageSize}&current=${this.currentPage}&searchValue=${this.searchValue || 0}&searchCondition=${this.searchCondition || 0}`).then(this.success).catch(this.error);

    this.loadingInstance = Loading.service(this.options);
  },
  mounted () {
    this.options.target = this.$refs['loading'];
  }
}
</script>

<style scoped>
  .btn {
    margin: 8px 0;
    float: right;
  }
  .pagination {
    float: right;
  }
  .table {
    height: 600px;
  }
  .search {
    display: flex;
    float: left;
    margin: 8px 0;
  }
</style>