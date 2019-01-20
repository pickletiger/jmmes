<template>
  <div class="main">
    <div class="table">
      <table cellspacing="0">
        <tr style="text-align:center">
          <td colspan="20" style="border:none"> 
            <h1>设备条形码</h1>
          </td>
        </tr>
        <tr align="center">
          <th>设备编号</th>
          <th>设备名称</th>
          <th>条形码</th>
        </tr>
        <tr align="center">
          <td>{{data.number}}</td>
          <td>{{data.name}}</td>
          <td>
            <barcode :value='`${data.id}`' :options="barcode_option"></barcode>
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
      data: [],
      barcode_option:{
        displayValue: false, //是否默认显示条形码数据
        //textPosition  :'top', //条形码数据显示的位置
        background: '#fff', //条形码背景颜色
        width:'2px',
        height: '55px'
      }
    }
  },
  created () {
    // 获取缓存数据
    this.data['id'] = sessionStorage.getItem('id')
    this.data['name'] = sessionStorage.getItem('name')
    this.data['number'] = sessionStorage.getItem('number')
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
    width: 200%;
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
    left: 3%;
  }
</style>