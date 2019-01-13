<template>
  <div>
    <el-dialog 
      title="编辑" 
      :visible.sync="show"
      width="30%"
      :center="true"
    >
      <el-form 
        :model="form" 
        label-position="left"
        style="margin-top:16px;"
        label-width="80px" 
      >
         <el-form-item 
          label="名称"
          prop="route">
          <el-select 
            v-model="form.tableName" 
            placeholder="请选择需要编辑项"
            @change="changeEditor"
          >
            <el-option 
              :label="key" 
              :value="key"
              :key="key"
              v-for="(item,key) of rowData"
            >
            </el-option>
          </el-select> 
        </el-form-item>
        <el-form-item 
          label="值"
        >
          <el-input 
            v-model="form.column"
            class="input"
            @change="changeColumn" 
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button 
          type="primary" 
          size="medium"
          @click.native="save"
        >保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { Message } from 'element-ui';
import qs from 'qs';

export default {
  name: 'PlanTableEditor',
  props: {
    dialogFormVisible: Boolean,
    rowData: Object,
  },
  data () {
    return {
      form: {
        tableName: '',
        column: ''
      },
      newData: [],
    }
  },
  computed: {
    // 弹出/关闭模态框
    show: {
      // 弹出时初始化column值和newData
      get () {
        return this.dialogFormVisible;
      },
      // 关闭时通知父组件修改showUpload且初始化newData
      set (newval) {
        let conf = {
          type: 'editor',
          show: newval
        }
        this.$emit('closeShow',conf);
        this.newData = [];
        this.form.tableName = '';
        this.form.column = '';
      }
    },

    // 当前行序号
    serialNumber () {
      return this.rowData['序号'];
    }
  },
  methods: {
    // 选择表头项触发
    changeEditor (e) {
      this.form.column = this.rowData[e];
    },

    // 改变列内容触发
    changeColumn (e) {
      let tableName = this.form.tableName;

      if(tableName!='产品名称'&&tableName!='编号') {
        this.newData.push({
          key: this.form.tableName,
          val: e
        })
      }else {
        let message = {
          message: `${tableName}不允许修改！`,
          duration: 1500,
          showClose: true,
        }
        
        Message.warning(message);
      }
    },

    // 保存编辑后的数据
    save () {

      if(this.newData.length == 0) {
        // 弹出框配置
        let message = {
          message: '您未修改任何数据！',
          duration: 1500,
          showClose: true,
        }

        Message.warning(message);
      }else {
        // 将编号作为查询条件
        this.newData = this.newData.concat({
          key: '编号',
          val: this.rowData['编号']
        },{
          key: '产品名称',
          val: this.rowData['产品名称']
        })

        // 将数组转换为字符串进行传输
        let data = this.transformStr(this.newData);

        // 用qs将提交的数据格式由json变为form编码
        axios.post(`${this.baseURL}/planTable/editor.php`,qs.stringify({ 'data': data })).then(this.success).catch(this.error);
      }
      this.show = false;  
    },

    // 成功回调
    success (res) {
      // console.log(res.data)
      
      if(res.data) {
        let message = {
          message: '编辑成功！',
          duration: 1500,
          showClose: true,
        }

        Message.success(message);
        this.show = false;
        this.$emit('success');
      }else {
        let message = {
          message: '编辑失败！',
          duration: 1500,
          showClose: true,
        }

        Message.error(message);
      }
    },

    // 失败回调
    error (e) {
      let message = {
          message: '编辑失败！',
          duration: 1500,
          showClose: true,
        }

      Message.error(message);
    },

    // 转换为字符串
    transformStr (arr) {
      let str = '';
      arr.forEach((item) => {
        str+=this.match(item.key)+'(*^▽^*)'+item.val+'^_^';
      })

      return str;
    },

    // 匹配数据库字段名
    match (val) {
      let arr = [{ch: '序号',en: 'serial_number'},{ch: '产品名称',en: 'product_name'},{ch: '编号',en: 'numbering'},{ch: '工单',en: 'work_order'},{ch: '安装场地',en: 'installation_site'},{ch: '外观',en: 'exterior'},{ch: '颜色',en: 'colour'},{ch: '拦河',en: 'barrage'},{ch: '控制室',en: 'control_room'},{ch: '基础预埋件',en: 'basic_embedded_parts'},{ch: '站台/自动门',en: 'platform_automatic_door'},{ch: '车体/座舱',en: 'car_body_cockpit'},{ch: '备注',en: 'remarks'},{ch: '优先级',en: 'priority'},{ch: '玻璃钢预埋件状态',en: 'frp_embedded_parts'},{ch: '排产用工艺清单',en: 'scheduling_process_list'},{ch: '重点产品',en: 'important_product'},{ch: '重要材料信息',en: 'important_material_information'},{ch: '交付时间',en: 'due_time'},{ch: '进厂时间',en: 'arrival_time'},{ch: '初始计划开始时间',en: 'initial_planning_start_time'},{ch: '初始计划完成时间',en: 'initial_plan_completion_time'},{ch: '实际计划开始时间',en: 'actual_planned_start_time'},{ch: '实际计划完成时间',en: 'actual_planned_completion_time'},{ch: '计划排产时间',en: 'planned_scheduling_time'},{ch: 'K',en: 'K'},{ch: 'T-焊前',en: 'T_before_welding'},{ch: 'I组焊',en: 'T_welding'},{ch: 'T装配',en: 'T_assembly'},{ch: 'F',en: 'F'},{ch: 'W',en: 'W'},{ch: 'D装配',en: 'D_assembly'},{ch: 'G',en: 'G'},{ch: 'L组焊',en: 'L_welding'},{ch: 'I/L装配',en: 'IL_assembly'},{ch: '外协轨道立柱/塔架/金字架架/转盘',en: 'outer_track_column'},{ch: '厂内轨道立柱/塔架',en: 'in_plant_track_column'},{ch: '座舱/车体/船体',en: 'cockpit'}];

      val = arr.filter(function(item) {
        return item.ch == val;
      });
      return val[0].en;
    }
  }
}
</script>

<style scoped>
  
</style>