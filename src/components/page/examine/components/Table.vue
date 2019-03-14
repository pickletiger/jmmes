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
        <span v-if="props.column.field == 'check'">
          <div>
            <el-button 
              type="primary"
              @click.native="check"
              :name="props.row.number"
            >
              检验
            </el-button>
          </div>
        </span>
                <span v-if="props.column.field == 'finish'">
          <div>
            <a 
            :href="`http://jmmes.oss-cn-shenzhen.aliyuncs.com/partUpload/${props.row.photourl}`" 
            target="_blank"
            class="show_img"
            :key="props.index"
          >点击查看</a>
          </div>
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
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import axios from "axios";
import { Loading } from 'element-ui';
import ExamineDialog from './Dialog';

export default {
  name: 'ExamineTable',
  props: {
    item: String,
  },
  components: {
    VueGoodTable,
    ExamineDialog
  },
  data () {
    return {
      rows: [],
      dialog: {
        centerDialogVisible: false,
        number: ''
      },
      loadingInstance: '',
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
              label: '工序名称',
              field: 'processName',
              filterable: true,
            },
            {
              label: '检验部件',
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
              label: '工序名称',
              field: 'processName',
              filterable: true,
            },
            {
              label: '检验日期',
              field: 'checkDate',
            },
            {
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



    // 检验按钮
    check (e) {
      this.dialog.centerDialogVisible = true;
      this.dialog.number = e.currentTarget.getAttribute('name');// 部件编码
      
      
    },

    // 成功回调
    success (ret) {
      console.log(ret)
    
      this.$nextTick(() => { 
        this.loadingInstance.close();
      });
      if(ret.data.success == 'success'){
        this.item == '未检验'?
        this.rows = ret.data.data : 
        this.rows = ret.data.data
        console.log(ret.data.data[0])
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