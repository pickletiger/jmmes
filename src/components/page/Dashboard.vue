<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="16">
        <el-card shadow="hover">
          <tabs></tabs>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="schart-box">
            <!-- <div class="content-title">零部件不合格次数统计图</div> -->
            <schart class="schart" canvasId="pie" :data="data2" type="pie" :options="options3"></schart>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <div class="container">
        <div class="schart-box">
         
          <schart class="schart" canvasId="bar" :data="data1" type="bar" :options="options1"></schart>
        </div>
        <div class="schart-box">
          <schart class="schart" canvasId="line" :data="data1" type="line" :options="options2"></schart>
        </div>
        <div class="schart-box">
          <schart class="schart" canvasId="ring" :data="data2" type="ring" :options="options4"></schart>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import Schart from "vue-schart";
import axios from "axios";
export default {
  name: "dashboard",
  components: {
    Tabs: require("./Tabs.vue").default,
    Schart
  },
  data() {
    return {
      name: localStorage.getItem("ms_username"),
      canupload: false,
      message: "first",
      textarea: "",
      showHeader: false,
      labelPosition: "right",
      read: [],
      recycle: [],
      formLabelAlign: {
        name: "",
        region: "admin",
        type: ""
      },
      name: "",
      account: "",
      postword: "",
      data1: [
        { name: "电流安全上限", value: 220 },
        { name: "电流实际最大值", value: 200 },
        { name: "电流实际最小值", value: 120 },
        { name: "电流安全下限", value: 100 }
      ],
      options1: {
        title: "关键零部件电压品控参数",
        autoWidth: true, // 设置宽高自适应
        showValue: true,
        bgColor: "#F9EFCC",
        fillColor: "#00887C",
        contentColor: "rgba(46,199,201,0.3)",
        yEqual: 7
      },
      options2: {
        title: "关键零部件电流品控参数",
        bgColor: "#D5E4EB",
        titleColor: "#00887C",
        fillColor: "red",
        contentColor: "rgba(46,199,201,0.3)"
      },
      options3: {
        title: "轴部件年度统计",
        bgColor: "#eeeeee",
        titleColor: "#ffffff",
        legendColor: "#ffffff",
        radius: 120
      },
      options4: {
        title: "关键零部件年度退产统计",
        bgColor: "#829daa",
        titleColor: "#ffffff",
        legendColor: "#ffffff",
        radius: 120,
        innerRadius: 80
      },
      data2: [{ name: "-", value: 1 }],
      options3: {
        title: "零部件不合格次数比例",
        bgColor: "#FFFFFF",
        titleColor: "#000000",
        legendColor: "#000000",
        radius: 120
      }
    };
  },
  created() {
    this.getDataInfo();
    axios.post(`${this.baseURL}/echarts.php`).then(response => {
      this.data2 = response.data;
    });
  },
  methods: {
    getDataInfo() {
      var account = localStorage.getItem("ms_username");
      var fd = new FormData();
      fd.append("flag", "Select");
      fd.append("account", account);
      axios.post(`${this.baseURL}/dashboard.php`, fd).then(res => {
        res = res.data;
        this.name = res.name;
        this.account = res.account;
      });
    },
    person_save() {
      var fd = new FormData();
      fd.append("flag", "Save");
      fd.append("name", this.name);
      fd.append("account", this.account);
      fd.append("postword", this.postword);

      axios.post(`${this.baseURL}/dashboard.php`, fd).then(function(res) {
        console.log(res);
        res = res.data;
        if ((res.success = "success")) {
          alert("修改成功");
        } else {
          alert("修改失败");
        }
      });
    }
  },
  computed: {
    role() {
      return this.account === "admin" ? "超级管理员" : "普通用户";
    }
  }
};
</script>


<style scoped>
/* .el-row {
        margin-bottom: 20px;
    } */
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
.schart-box {
  display: inline-block;
  margin: 20px;
}
.schart {
  width: 500px;
  height: 400px;
}
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>
