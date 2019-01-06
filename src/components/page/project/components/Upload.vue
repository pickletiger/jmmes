<template>
  <div>
    <el-dialog
      title="导入计划总表"
      :visible.sync="show"
      width="30%"
    >
      <el-upload
        class="upload-demo"
        :on-success="success"
        :on-exceed="fileExceed"
        drag
        :action="target"
        :auto-upload="false"
        ref="upload"
        multiple
        :data="processDate"
        :limit="1"
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-form
        :model="form"
        label-position="left"
        style="margin-top:16px;"
        label-width="80px"
      >
         <el-form-item
          label="工艺路线"
          prop="route">
          <el-select
            v-model="form.route"
            placeholder="请选择工艺路线"
            @change="selectChange">
            <el-option label="K" value="K"></el-option>
            <el-option label="T-焊前" value="T-焊前"></el-option>
            <el-option label="I组焊" value="I组焊"></el-option>
            <el-option label="T装配" value="T装配"></el-option>
            <el-option label="F" value="F"></el-option>
            <el-option label="W" value="W"></el-option>
            <el-option label="D装配" value="D装配"></el-option>
            <el-option label="G" value="G"></el-option>
            <el-option label="L组焊" value="L组焊"></el-option>
            <el-option label="I/L装配" value="I/L装配"></el-option>
            <el-option label="外协轨道立柱/塔架/金字架架/转盘" value="外协轨道立柱/塔架/金字架架/转盘"></el-option>
            <el-option label="厂内轨道立柱/塔架" value="厂内轨道立柱/塔架"></el-option>
            <el-option label="座舱/车体/船体" value="座舱/车体/船体"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="预期天数"
        >
          <el-input
            v-model="form.date"
            class="input"
            @change="dayChange"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button
          type="primary"
          size="medium"
          @click.native="upload"
        >导入
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui';

export default {
  name: 'PlanTableUpload',
  props: {
    dialogFormVisible: Boolean
  },
  data () {
    return {
      form: {
        date: '',
        route: ''
      },
      processDate: {
        'K': '',
        'T-焊前': '',
        'I组焊': '',
        'T装配': '',
        'F': '',
        'W': '',
        'D装配': '',
        'G': '',
        'L组焊': '',
        'I/L装配': '',
        '外协轨道立柱/塔架/金字架架/转盘': '',
        '厂内轨道立柱/塔架': '',
        '座舱/车体/船体': ''
      }, // 工艺路线预期天数
      target: `${this.baseURL}/planTable/PlanTable.php`
    }
  },
  computed: {
    // 弹出/关闭模态框
    show: {
      get (val) {
        return this.dialogFormVisible;
      },
      // 关闭时通知父组件修改showUpload
      set (newval) {
        let conf = {
          type: 'upload',
          show: newval
        }
        this.$emit('closeShow',conf);
      }
    },
  },
  methods: {

    // 切换工艺路线显示对应预期天数
    selectChange (e) {
      // 判断是否已有存储
      if (localStorage.getItem(e)) {
        this.form.date = localStorage.getItem(e);
      }
    },

    // 改变预期天数则保存
    dayChange (e) {
      localStorage.removeItem(this.form.route);
      localStorage.setItem(this.form.route, e);
      this.processDate[this.form.route] = e;
    },

    // 超出上传限制提示框
    fileExceed (e) {
      let options = {
        message: '已添加文件！',
        type: 'warning',
        duration: 2000,
      }
      Message(options);
    },

    // 上传
    upload () {
      if (this.$refs.upload.uploadFiles && this.$refs.upload.uploadFiles.length >0){
        let flag = false // 已填写预期天数为false
        for (let key in this.processDate) {
          if (!this.processDate[key]) {
            flag = true;
            break;
          }
        }
        if (flag && this.form.date) {
          this.$confirm(`未填写预期天数的工艺路线是否默认${this.form.date}天？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            for (let key in this.processDate) {
              if (!this.processDate[key]) {
                this.processDate[key] = this.form.date;
              }
              localStorage.removeItem(key);
              localStorage.setItem(key, this.processDate[key]);
            }
            this.$refs.upload.submit(); // 上传
          }).catch(() => {})
        } else if (flag && !this.form.date) {
          this.$message({
            type: 'warning',
            message: '请填写预期天数！'
          });
        } else {
          this.$refs.upload.submit(); // 上传
        }
      } else {
        this.$message({
          type: 'warning',
          message: '您未添加任何文件！'
        });
      }
    },

    // 上传成功回调
    success (res) {
      this.$emit('uploadSuccess',res);
    }
  },
  mounted () {
    let processDate = this.processDate;

    // 获取存储在localStorage中的预期天数
    Object.keys(localStorage).forEach((item) => {
      switch (item) {
        case 'D装配':
          processDate[item] = localStorage.getItem(item)
          break;
        case 'F':
          processDate[item] = localStorage.getItem(item)
          break;
        case 'G':
          processDate[item] = localStorage.getItem(item)
          break;
        case 'I/L装配':
          processDate[item] = localStorage.getItem(item)
          break;
        case 'I组焊':
          processDate[item] = localStorage.getItem(item)
          break;
        case 'K':
          processDate[item] = localStorage.getItem(item)
          break;
        case 'L组焊':
          processDate[item] = localStorage.getItem(item)
          break;
        case 'T-焊前':
          processDate[item] = localStorage.getItem(item)
          break;
        case 'T装配':
          processDate[item] = localStorage.getItem(item)
          break;
        case 'W':
          processDate[item] = localStorage.getItem(item)
          break;
        case '厂内轨道立柱/塔架':
          processDate[item] = localStorage.getItem(item)
          break;
        case '外协轨道立柱/塔架/金字架架/转盘':
          processDate[item] = localStorage.getItem(item)
          break;
        case '座舱/车体/船体':
          processDate[item] = localStorage.getItem(item)
          break;
        default:
          break;
      }
    })
  }
}
</script>

<style scoped>
  .input {
    width: 60px;
  }
</style>
