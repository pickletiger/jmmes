<template>
  <div class="main">
    <div class="table">
      <table cellspacing="0">
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
        </tr>
        <tr>
          <td>xxx</td>
          <td>xxx</td>
          <td>xxx</td>
          <td>xxx</td>
          <td>xxx</td>
          <td>xxx</td>
          <td>xxx</td>
          <td>xxx</td>
          <td>xxx</td>
          <td>xxx</td>
          <td>xxx</td>
          <td>xxx</td>
          <td>xxx</td>
          <td>xxx</td>
          <td>xxx</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  
};
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
  table {
    border-collapse: collapse;
  }
  td,th {
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
