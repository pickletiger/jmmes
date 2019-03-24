<template>
  <div class="main">
    <div style="width: 840px;text-align: center;">
      <p style="font-size: 18px;">中山市金马科技娱乐设备股份有限公司</p>
      <p style="font-size: 30px;margin-bottom:0">送&nbsp;检&nbsp;单</p>
      <p style="font-size: 18px;text-align: left;margin-left: 5%;padding: 0;">送检单位：</p>
    </div>
    <table style="width: 800px;margin-top:0px;">
      <tr style="text-align: center; height: 80px;">
        <td style="width: 180px;">产品、零部件名</td>
        <td colspan="2">{{data.name}}</td>
        <td>产品编号</td>
        <td colspan="2">{{data.number}}</td>
      </tr>
      <tr style="text-align: center;">
        <td style="width: 180px;">型号（图号）</td>
        <td>{{data.figure_number}}</td>
        <td>工单号</td>
        <td>{{data.belong_part}}</td>
        <td>数量</td>
        <td>{{data.count}}</td>
      </tr>
      <tr style="text-align: center;">
        <td style="width: 180px;">送检项目</td>
        <td
          colspan="5"
        >□外购 &nbsp;&nbsp;&nbsp;□外协 &nbsp;&nbsp;&nbsp;□化验 &nbsp;&nbsp;&nbsp;□过程产品 &nbsp;&nbsp;&nbsp;□探伤 &nbsp;&nbsp;&nbsp;□整机</td>
      </tr>
      <tr style="text-align: center;height: 150px;">
        <td style="width: 180px;">自检结果</td>
        <td colspan="5">
          <div style="height:25px;margin-top: 120px;">
            <p
              style="text-align: right;"
            >签名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          </div>
        </td>
      </tr>
      <tr style="text-align: center;height: 150px;">
        <td style="width: 180px;">检验结论</td>
        <td colspan="5">
          <div style="height:25px;margin-top: 120px;">
            <p
              style="text-align: right;"
            >签名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          </div>
        </td>
      </tr>
    </table>
    <!-- <img v-for="i in item"  :src="i" class="img"/> -->
    <!-- <div class="page-break"></div> -->
    <div v-if="route">
      <HotSheep></HotSheep>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HotSheep from "./HotSheep";
export default {
  name: "Sending_check",
  data() {
    return {
      data: [],
      item: [{}],
      route: false
    };
  },
  components: {
    HotSheep: require("./HotSheep.vue").default
  },
  created() {
    this.routeData();
    this.getData();
    document.getElementsByTagName("html")[0].style.overflow = "visible";
    document.getElementsByTagName("body")[0].style.overflow = "visible";
    document.getElementById("app").style.overflow = "visible";
  },
  methods: {
    getData() {
      let number = localStorage.getItem("number");
      let route = localStorage.getItem("route");
      console.log(number);
      console.log(route);
      let fd = new FormData();
      fd.append("flag", "Select");
      fd.append("number", number);

      let that = this;
      axios.post(`${this.baseURL}/sending_check.php`, fd).then(function(res) {
        that.data = res.data.data[0];
      });
    },
    routeData() {
      let route = localStorage.getItem("route");
      console.log(route);
      if (route === "T调"||route === "K") {
        this.route = true;
      }
    }
  }
};
</script>

<style scoped>
table,
tr {
  margin: 2rem;
  border-collapse: collapse;
}

td {
  height: 52px;
  width: 150px;
  border: 1px solid black;
  border-collapse: collapse;
}

.main {
  width: 100%;
  align-content: center;
}

* {
  padding: 0;
  margin: 0;
}
.img {
  width: 840px;
  margin-left: 1%;
}
.A4page {
  width: 277mm;
  height: 190mm;
}
/*第一页的第一个表格*/
.pageOneFirst {
  width: 277mm;
  text-align: center;
}
</style>
