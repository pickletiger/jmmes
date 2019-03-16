<template>
  <div id="root">
    <h3>热 处 理 施 工 通 知 单</h3>
    <p>2018年8月30日</p>
    <table border="1" cellspacing="0">
      <tr>
        <td>产 品
          <br>名 称
        </td>
        <td colspan="2">行走轮轴</td>
        <td>产 品 图 号</td>
        <td colspan="2">CAR-44N.01-03</td>
      </tr>
      <tr>
        <td>工 单 号</td>
        <td colspan="2">20#</td>
        <td>数 量</td>
        <td colspan="2">4</td>
      </tr>
      <tr>
        <td>材 料</td>
        <td>口45#</td>
        <td>口40Cr</td>
        <td>口40CrNiMoA</td>
        <td>口2Cr13</td>
        <td>其 他</td>
      </tr>
      <tr>
        <td>施 工
          <br>工 序
        </td>
        <td>口 退 火</td>
        <td>口 调 质</td>
        <td>口 高 频</td>
        <td>口 回 火</td>
        <td>其 他</td>
      </tr>
      <tr>
        <td rowspan="3">硬 度
          <br>要 求
        </td>
        <td colspan="5">口1、HB220-260 口2、HB240-286</td>
      </tr>
      <tr>
        <td colspan="5">口1、HB260-320 口2、HB197-248</td>
      </tr>
      <tr>
        <td colspan="5">口3、HB217-255 口4、其 他</td>
      </tr>
      <tr>
        <td>下 工 序</td>
        <td colspan="2">ID</td>
        <td>填 发 人</td>
        <td colspan="2"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "HotSheep",
  data() {
    return {
      data: []
    };
  },
  methods: {}
};
</script>

<style scoped>
#root {
  width: 150mm;
  text-align: center;
}
table {
  margin: 0 auto;
  width: 90%;
  height: 65mm;
}
p {
  margin: 0;
}
h3 {
  margin: 0;
}
</style>
