<template>
  <div class="main">
    <div class="table">
      <table cellspacing="0" >
        <tr style="text-align:center">
          <td colspan="20" style="border:none"> 
            <h1>开料车间生产计划</h1>
          </td>
        </tr>
        <tr align="left">
          <th>产品名称</th>
          <th>工单</th>
          <th>零件图号</th>
          <th>名称</th>
          <th>材料</th>
          <th>规格</th>
          <th>开料尺寸</th>
          <th>加工工艺路线</th>
          <th>数量</th>
          <th>工位</th>
          <th>需求区</th>
          <th>排产时间</th>
          <th>K计划完成</th>
          <th>K完成时间</th>
          <th>备注</th>
          <th>条形码</th>
        </tr>
        <tr v-for="item in table" :key="item.id">
          <td>{{item.product_name}}</td>
          <td>{{item.number}}</td>
          <td>{{item.figure_number}}</td>
          <td>{{item.name}}</td>
          <td></td>
          <td>{{item.child_material}}</td>
          <td></td>
          <td>{{item.count}}</td>
          <td>{{checkList[0]}}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{{item.remark}}</td>
          <td>
            <barcode :value="'{num:' + item.figure_number + '}'" :options="barcode_option"></barcode>
          </td>
        </tr>
      </table>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "printTable",
  data () {
    return {
      table: [],
      checkList: [],
      schedule: "",
      barcode_option:{
        displayValue: false, //是否默认显示条形码数据
        //textPosition  :'top', //条形码数据显示的位置
        background: '#fff', //条形码背景颜色
        width:'1px',
        height: '55px'
      }
    }
  },
  mounted () {
    // 获取缓存数据
    this.table = JSON.parse(sessionStorage.getItem('table'));
    this.checkList = JSON.parse(sessionStorage.getItem('checkList'));
    this.schedule = JSON.parse(sessionStorage.getItem('schedule'));
    // 使数据打印分页
    document.getElementsByTagName("html")[0].style.overflow = "visible"
    document.getElementsByTagName("body")[0].style.overflow = "visible"
    document.getElementById("app").style.overflow = "visible"
  }
};
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
    
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  td,th {
    /* 强制不换行 */
    white-space: nowrap; 
    border: 1px solid black;
    border-collapse: collapse;
  }
  .main{
    position: relative;
  }
  .table{
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
</style>
