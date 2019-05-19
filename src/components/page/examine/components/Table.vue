<template>
  <div>
    <vue-good-table
      title="未检验部件"
      :columns="columns"
      :rows="rows"
      :pagination-options="{enabled: true,mode: 'records'}"
      :search-options="{enabled: true}"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'mode'">
          <div>
            <el-button 
              type="primary"
              v-if="props.row.show_btn"
              @click="mode(props.row.contactId,props.row.selectedTreeNode)"
              :name="props.row.figure_number"
            >
              填写工艺卡
            </el-button>
          </div>
        </span>
        <span v-if="props.column.field == 'check'">
          <div>
            <el-button 
              type="primary" 
              v-if="props.row.show_btn1"
              @click="check(props.row.weldingcontactId)"
              :name="props.row.figure_number"
            >
              填写工艺卡
            </el-button>
          </div>
        </span>
        <span v-if="props.column.field == 'finish'">
          <el-button 
            type="primary"
            @click="print1(props.row)"
          >
            查看
          </el-button>
        </span>
        
        <span v-else-if="props.column.field == 'result'">
          <a 
            :href="`http://jmmes.oss-cn-shenzhen.aliyuncs.com/partUpload/${props.row.photourl}`" 
            target="_blank"
            class="show_img"
            :key="props.index"
          >点击查看</a>
        </span>
        <span v-if="props.column.field == 'checkSituation'">
          <el-button 
            type="primary"
            @click="print()"
          >
            打印
          </el-button>
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
    </vue-good-table>
    <examine-dialog :config="dialog"></examine-dialog>
    <!-- 焊接信息 -->
    <welding-dialog ref="weldcomponent"></welding-dialog>

    <!-- 制造工艺 -->
    <craftsmanship-dialog ref="cratsmanshipcomponent"></craftsmanship-dialog>
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import axios from "axios";
import { Loading } from 'element-ui';
import ExamineDialog from './Dialog';
import WeldingDialog from "../../basicdata/components/WeldingDialog.vue"
import CraftsmanshipDialog from "../../basicdata/components/CraftsmanshipDialog.vue"

export default {
  name: 'ExamineTable',
  props: {
    item: String,
  },
  components: {
    VueGoodTable,
    ExamineDialog,
    WeldingDialog,
    CraftsmanshipDialog
  },
  data () {
    return {
      rows: [],
      dialog: {
        centerDialogVisible: false,
        number: ''
      },
      show_btn:true,
      show_btn1:true,
      loadingInstance: '',
    }
  },
  computed: {
    columns () {
      let head = []
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
              label: '部件图号',
              field: 'figure_number',
              filterable: true,
            },
            
            {
              label: '关键零部件',
              field: 'radio',
              filterable: true,
            },
            {
              label: '工艺路线',
              field: 'route',
              filterable: true,
            },
            {
              label: '数量',
              field: 'count',
              filterable: true,
            },{
              label: '制造工艺卡',
              field: 'mode',
              filterable: true,
            },{
              label: '焊接工艺卡',
              field: 'check',
              filterable: true,
            },{
              label: '完工附件',
              field: 'finish',
              filterable: true,
            }
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
              label: '部件图号',
              field: 'figure_number',
              filterable: true,
            },
            
            {
              label: '关键零部件',
              field: 'radio',
              filterable: true,
            },
            {
              label: '工艺路线',
              field: 'route',
              filterable: true,
            },
            {
              label: '数量',
              field: 'count',
              filterable: true,
            },
            {
              label: '检验日期',
              field: 'checkDate',
            },{
              label: '制造工艺卡',
              field: 'mode',
              filterable: true,
            },{
              label: '焊接工艺卡',
              field: 'check',
              filterable: true,
            },{
              label: '检验详情',
              field: 'result',
            },
            {
              label: '流转单打印',
              field: 'checkSituation',
              filterable: true,
            }
          ]);

      return head;
    },

    // 加载框配置项
    options () {
      let obj = {
        background: "rgba(f,f,f,0.5)",
        text: '加载中',
        spinner: 'el-icon-loading',
      };
      return obj;
    }
  },
  methods: {
    // 打印流转单
    print() {
      let routeData = this.$router.resolve({
        name: "Circulation"
      });
      window.open(routeData.href, '_blank');
    },
    print1(row) {
      localStorage.removeItem("number")
      localStorage.setItem("number",row.number)
      localStorage.setItem("route",row.route)
      let routeData = this.$router.resolve({
        name: "Sending_check"
      });
      window.open(routeData.href, '_blank');
    },
    //制造工艺卡
    mode (contactId,selectedTreeNode) {
      this.dialog.CraftsmanshipDialog = true;
      this.$refs.cratsmanshipcomponent.Handlealter(contactId,selectedTreeNode)
    },


    //焊接工艺卡按钮
    check (e) {
      this.dialog.WeldingDialog = true
      this.$refs.weldcomponent.Handlealter(e)
      // this.dialog.number = e.currentTarget.getAttribute('name');// 部件编码
      
    },

    // 成功回调
    success (ret) {
      this.$nextTick(() => { 
        this.loadingInstance.close();
      })
      console.log(ret.data.data)
      if(ret.data.success == 'success'){
        this.item == '未检验'?
        this.rows = ret.data.data : 
        this.rows = ret.data.data
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
  },
  watch: {

    // 切换页面加载数据
    item: function() {

      this.loadingInstance = Loading.service(this.options)
      var state = this.item
      if(state == "未检验"){
        state = 1
      }else if(state =="合格"){
        state = 3
      }else{
        state = 4
      }
      var fd = new FormData()
          fd.append("flag","State")
          fd.append("state",state)
      axios.post(`${this.baseURL}/examine.php`,fd)
      .then(this.success)
      .catch(this.error)
    }
  },
  mounted () {

    this.loadingInstance = Loading.service(this.options)
    var fd = new FormData()
        fd.append("flag","Select")
    axios.post(`${this.baseURL}/examine.php`,fd)
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