<template>
  <div class="main">
    <!-- <div class="table"> -->
    <table id="tab" cellpadding="1" cellspacing="1" border="1">
      <tr style="text-align:center ">
        <td colspan="20" style="border:none;">
          <h1>零件质量记录表</h1>
        </td>
      </tr>
      <tr>
        <th rowspan="2" class="th1">名称</th>
        <th rowspan="2" class="th1">图号</th>
        <th rowspan="2" class="th1">数量</th>
        <th colspan="3" class="th1">自检结果</th>
        <th colspan="6" class="th1">检验员检验结果</th>
        <th rowspan="2" class="th1">日期</th>
      </tr>
      <tr>
        <th class="th1">合格</th>
        <th class="th1">不合格</th>
        <th class="th1">签名</th>
        <th class="th1">首件</th>
        <th class="th1">合格</th>
        <th class="th1">返工合格</th>
        <th class="th1">不合格</th>
        <th class="th1">原因</th>
        <th class="th1">签名</th>
      </tr>
      <tbody>
        <tr v-for="(item,key,index) in table" :key="index">
          <td>{{item.name}}</td>
          <td>{{item.figure_number}}</td>
          <td>{{item.count}}</td>
          <td>√</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "PartsQuality",
  data() {
    return {
      table: [],
      checkList: [],
      schedule: "",
      barcode_option: {
        displayValue: false, //是否默认显示条形码数据
        //textPosition  :'top', //条形码数据显示的位置
        background: "#fff", //条形码背景颜色
        width: "1px",
        height: "55px"
      }
    };
  },
  mounted() {
    // 获取缓存数据
    this.table = JSON.parse(sessionStorage.getItem("table"));
    // 使数据打印分页
    document.getElementsByTagName("html")[0].style.overflow = "visible";
    document.getElementsByTagName("body")[0].style.overflow = "visible";
    document.getElementById("app").style.overflow = "visible";
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
table,
tr {
  border-collapse: collapse;
  text-align: center;
}
td {
  height: 50px;
}
th {
  /* 强制不换行 */
  white-space: nowrap;
  border: 1px solid black;
  border-collapse: collapse;
}
.th1 {
  width: 23mm;
  height: 12mm;
  text-align: center;
}
.th2 {
  width: 9mm;
  text-align: center;
}
.th3 {
  width: 38mm;
  text-align: center;
}
.th4 {
  width: 10mm;
  text-align: center;
}
.th5 {
  width: 11mm;
  text-align: center;
}
.th6 {
  width: 32mm;
  text-align: center;
}
.th7 {
  width: 34mm;
  text-align: center;
}
.th8 {
  width: 15mm;
  text-align: center;
}
.main {
  position: relative;
}
.table {
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
