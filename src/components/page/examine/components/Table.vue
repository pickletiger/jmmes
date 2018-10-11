<template>
  <div ref="table">
    <vue-good-table
      title="未检验部件"
      :columns="columns"
      :rows="rows"
      :pagination-options="{enabled: true,mode: 'records'}"
      :search-options="{enabled: true}"
      @on-page-change="onPageChange"
      @on-per-page-change="onPageChange"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'check'">
          <div style="text-align: center;">
            <el-button 
              type="primary"
              @click.native="check"
              :name="props.row.number"
            >
              检验
            </el-button>
          </div>
        </span>
        <span v-else-if="props.column.field == 'result'">
          <a 
            href="static/img/送检单.jpg" 
            target="_blank"
            class="show_img"
            :key="props.index"
          >点击查看</a>
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
    </vue-good-table>
    <el-dialog
      title="检验部件"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-form :model="form" label-width="80px">
        <el-form-item label="检验人员">
          <el-input 
            v-model="form.person" 
            style="width: 50%;"
            placeholder="请输入检验人员"
          ></el-input>
        </el-form-item>
        <el-form-item label="检验结果">
          <el-select v-model="form.result" placeholder="请选择检验结果">
            <el-option label="合格" value="qualified"></el-option>
            <el-option label="不合格" value="notqualified"></el-option>
            <el-option label="部分合格" value="partqualified"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合格数量" v-show="partQualified">
          <el-input 
            v-model="form.number" 
            style="width: 50%;"
            placeholder="请输入合格数量"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false" @click.native="checkComponent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import axios from "axios";
import { Loading } from 'element-ui';

export default {
  name: 'ExamineTable',
  props: {
    item: String
  },
  components: {
    VueGoodTable
  },
  data () {
    return {
      rows: [],
      centerDialogVisible: false,
      form: {
        person: "",
        result: '',
        number: ''
      },
      loadingInstance: '',
      number: ''
    }
  },
  computed: {
    columns () {
      let head = [];
      
      // 判断点击哪个标签页
      this.item == '未检验'
        ? (head = [
            {
              label: '部件编号',
              field: 'number',
              filterable: true,
            },
            {
              label: '部件名称',
              field: 'partName',
              filterable: true,
            },
            {
              label: '工序名称',
              field: 'processName',
              filterable: true,
            },
            {
              label: '目标车间',
              field: 'targetRoom',
            },
            {
              label: '检验部件',
              field: 'check',
              filterable: true,
            },
          ])
        : (head = [
            {
              label: '部件编号',
              field: 'number',
              filterable: true,
            },
            {
              label: '部件名称',
              field: 'partName',
              filterable: true,
            },
            {
              label: '检验情况',
              field: 'checkSituation',
              filterable: true,
            },
            {
              label: '检验日期',
              field: 'checkDate',
            },
            {
              label: '检验车间',
              field: 'checkRoom',
              filterable: true,
            },
            {
              label: '检验详情',
              field: 'result',
            }
          ]);

      return head;
    },

    // 部分合格显示合格数量
    partQualified () {
      let res;
      this.form.result == 'partqualified'? res = true : res = false;

      return res; 
    },

    // 加载框配置项
    options () {
      let obj = {
        target: this.$refs.table,
        background: "rgba(f,f,f,0.5)",
        text: '加载中',
        spinner: 'el-icon-loading',
      };
      return obj;
    }
  },
  methods: {
    // 检验按钮
    check (e) {
      this.form.result = 'qualified';
      this.centerDialogVisible = true;
      this.number = e.currentTarget.getAttribute('name');// 部件编码

      console.log(this.number);
    },

    onPageChange (params) {
      // 若分页显示页数大于当前缓存行数，则加载
      const num = params.currentPage*params.currentPerPage;
      if(num > this.rows.length) {
        // 表格加载框
        this.loadingInstance = Loading.service(this.options);

        axios.post('https://www.easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/checkmodule')
        .then(this.pageSuccess)
        .catch(this.error)
      }
      
    },

    // 分页成功回调
    pageSuccess (ret) {
      // 关闭加载框
      this.$nextTick(() => { 
        this.loadingInstance.close();
      });

      if(ret.data.res == 'success'){
        this.item == '未检验'?
        this.rows.push(...ret.data.data.rowUntested) : 
        this.rows.push(...ret.data.data.row)
      }else {

      }
    },

    // 成功回调
    success (ret) {

      this.$nextTick(() => { 
        this.loadingInstance.close();
      });

      if(ret.data.res == 'success'){
        this.item == '未检验'?
        this.rows = ret.data.data.rowUntested : 
        this.rows = ret.data.data.row
      }else {

      }
    },

    // 失败回调
    error (e) {

      this.$nextTick(() => { 
        this.loadingInstance.close();
      });

      console.log(e);
    },

    // 检验部件
    checkComponent (e) {
      console.log(e);
    },
  },
  watch: {

    // 切换页面加载数据
    item: function() {

        this.loadingInstance = Loading.service(this.options);

        axios.post('https://www.easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/checkmodule')
        .then(this.success)
        .catch(this.error)
    }
  },

  mounted () {

    this.loadingInstance = Loading.service(this.options);

    axios.post('https://www.easy-mock.com/mock/5ba8a1d483dbde41b0055d83/jm/checkmodule')
    .then(this.success)
    .catch(this.error)
  }
}
</script>

<style scoped>
  .show_img:link {
    color: blue;
  }
</style>