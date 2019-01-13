<template>
  <div>
    <el-dialog
      title="检验部件"
      :visible.sync="config.centerDialogVisible"
      width="30%"
      center>
      <el-form 
        :model="form" 
        label-width="80px" 
        label-position="left"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="检验人员" prop="person">
          <el-input 
            v-model="form.person" 
            style="width: 50%;"
            placeholder="请输入检验人员"
          ></el-input>
        </el-form-item>
        <el-form-item label="检验类型">
          <el-select v-model="form.type" placeholder="请选择检验类型">
            <el-option label="全检" value="allCheck"></el-option>
            <el-option label="抽检" value="partCheck"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检验结果" v-if="allCheck">
          <el-select v-model="form.result" placeholder="请选择检验结果">
            <el-option label="合格" value="qualified"></el-option>
            <el-option label="不合格" value="partQualified"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合格率" v-else prop="passRate">
          <el-radio-group v-model="form.passRate">
            <el-radio label="已达到" value="已达到"></el-radio>
            <el-radio label="未达到" value="未达到"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item 
          label="合格数量" 
          v-show="partQualified"
          prop="number"
        >
          <el-input 
            v-model="form.number" 
            style="width: 50%;"
            placeholder="请输入合格数量"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="config.centerDialogVisible = false">取 消</el-button>
        <el-button type="primary"  @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "ExamineDialog",
  props: {
    config: Object
  },
  data () {
    return {
      rules: {
        person: [
          {required: true, message: '请输入检验人', trigger: 'blur' } 
        ],
        number: [
          {required: true, message: '请输入合格数量', trigger: 'blur' }
        ],
        passRate: [
          { required: true, message: '请选择合格率', trigger: 'change'}
        ]
      },
      form: {
        person: "",
        result: 'qualified',
        number: '',
        type: 'allCheck',
        passRate: '已达到'
      },
    }
  },
  computed: {
    // 点击部分合格显示合格数量
    partQualified () {
      if(this.form.type == 'allCheck'){
        return this.form.result == 'partQualified'? true : false;
      }else {
        return false;
      }
    },

    // 判断检验类型
    allCheck () {
      return this.form.type == 'allCheck'? true : false;
    }
  },

  methods: {
    // 检验部件
    submitForm (formName) {

      
      // 检验表单
      this.$refs[formName].validate((valid,obj) => {
        if(this.form.type == 'allCheck' && this.form.result == 'partQualified') {
          // check检验人员和合格数量是否填写
          obj.person || obj.number
          ? console.log('请确认表单是否填写完整')
          : this.saveData()

        }else {
          // check检验人员是否填写
          obj.person? console.log('请确认表单是否填写完整')
          : this.saveData()
        }
      });
    },

    // 保存检验数据
    saveData () {
      if(this.form.type == "allCheck"){
        var type = "全检"
      }else{
        var type = "抽检"
      }

      if(this.form.result == "partQualified" ||this.form.passRate =="未达到"){
        var result = "4"    //不合格
      }else{
        var result = "3"    //合格
      }
      console.log(result)

      var fd = new FormData()
      fd.append("flag","Test")
      fd.append("Number",this.config.number)            //部件编号
      fd.append("person",this.form.person)
      fd.append("result",result)
      fd.append("type",type)
      console.log(fd)
      axios.post(`${this.baseURL}/examine.php`,fd).then((res)=> {  //ES6写法
        this.config.centerDialogVisible = false;
        this.$message({
          message: '检验成功',
          type: 'success',
          duration: 1500
        });
        location.reload()

      });
     
    }
  },
}  
</script>

<style scoped></style>