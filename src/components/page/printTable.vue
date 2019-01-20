<template>
  <div class="main">
    <!-- <div class="table"> -->
      <table cellspacing="0" class="tabheader midfontsize">
        <tr style="text-align:center">
          <td colspan="20" style="border:none"> 
            <h1>开料车间生产计划</h1>
          </td>
        </tr>
        <tr align="center">
          <th class="th1">产品名称</th>
          <th class="th2">工单</th>
          <th class="th3">零件图号</th>
          <th class="th4">名称</th>
          <th class="th5">材料</th>
          <th class="th6">规格</th>
          <th class="th7">开料尺寸</th>
          <th class="th8">加工工艺路线</th>
          <th class="th9">数量</th>
          <th>工位</th>
          <th>需求区</th>
          <th>排产时间</th>
          <th>K计划完成</th>
          <th>K完成时间</th>
          <th>备注</th>
          <!-- <th>条形码</th> -->
        </tr>
        <tr v-for="item in table" :key="item.id">
          <td>{{item.product_name}}</td>
          <td>{{item.number}}</td>
          <td>{{item.figure_number}}</td>
          <td>{{item.name}}</td>
          <td></td>
          <td>{{item.child_material}}</td>
          <td>{{item.standard}}</td>
          <td>{{item.route_line}}</td>
          <td>{{item.count}}</td>
          <td>{{item.station}}</td>
          <td></td>
          <td>{{item.schedule_date}}</td>
          <td></td>
          <td></td>
          <td>{{item.remark}}</td>
          <!-- <td>
            <barcode :value='`${item.figure_number}`' :options="barcode_option"></barcode>
          </td> -->
        </tr>
      </table>
      
    <!-- </div> -->
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
    this.table = JSON.parse(sessionStorage.getItem('table'))
    this.checkList = JSON.parse(sessionStorage.getItem('checkList'))
    this.schedule = JSON.parse(sessionStorage.getItem('schedule'))
    this.route = JSON.parse(sessionStorage.getItem('route'))
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
  table,tr {
      border-collapse: collapse;
      text-align: center;
  }
  td,th {
    /* 强制不换行 */
    white-space: nowrap; 
    border: 1px solid black;
    border-collapse: collapse;
  }
  .th1{
      width: 23mm;
      text-align: center;
  }
  .th2{
      width: 9mm;
      text-align: center;
  }
  .th3{
      width: 38mm;
      text-align: center;
  }
  .th4{
      width: 10mm;
      text-align: center;
  }
  .th5{
      width: 11mm;
      text-align: center;
  }
  .th6{
      width: 32mm;
      text-align: center;
  }
  .th7{
      width: 34mm;
      text-align: center;
  }
  .th8{
      width: 15mm;
      text-align: center;
  }
  .main{
    position: relative;
  }
  .table{
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
    /*小四*/
    .midfontsize {
        font-size: 11.2pt;
    }
     /* 头部的表的信息 */
    .tabheader {
        width: 277mm;
        text-align: center;
    }
</style>
