<template>
  <div class="crumbs">
    <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-message"></i> 消息通知</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-header style="text-align: right; font-size: 12px; height: 20px">
                <el-button type="primary" @click="canupload = true" icon="el-icon-edit" circle></el-button>
            </el-header>
            <el-tabs v-model="message">
                <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
                    <el-table :data="unread" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" width="180"></el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleRead(scope.row)">标为已读</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="danger" @click="allRead()">全部标为已读</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`已读消息(${read.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`全部消息(${recycle.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="recycle" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
            </el-tabs>
            <el-dialog title="消息编辑" :visible.sync="canupload">
                <h4>消息编辑人：admin</h4>
            <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="textarea">
                </el-input>
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="全部"></el-checkbox>
                    <el-checkbox label="车间"></el-checkbox>
                    <el-checkbox label="质保部"></el-checkbox>
                    <el-checkbox label="工艺部"></el-checkbox>
                    <el-checkbox label="计划部"></el-checkbox>
                    <el-checkbox label="销售部"></el-checkbox>
                </el-checkbox-group>
            </el-dialog>
    </div>-->
    <el-tabs v-loading="loading" v-model="activeName" type="card">
      <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
        <el-form :inline="true" class="el-form1">
          <el-form-item>
            <el-input placeholder="输入关键字" v-model="filterText" style="width:250px;height:35px"></el-input>
            <el-button type="primary" @click="handleFifter()">查询</el-button>
            <el-button type="danger" @click="allRead()">全部标为已读</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="filterTable" :data="unread" style="width: 100%">
          <el-table-column prop="address" label="部件信息" :formatter="formatter"></el-table-column>
          <el-table-column
            prop="workshop"
            label="车间"
            width="100"
            :filters="[{ text: 'K开料车间', value: 'K开料车间' }, { text: 'TK开料车间', value: 'TK开料车间' }, { text: '安装S', value: '安装S' }, { text: '玻璃钢F', value: '玻璃钢F' }, { text: '电气G', value: '电气G' }, { text: '机加T', value: '机加T' }, { text: '结构L', value: '结构L' }, { text: '探伤', value: '探伤' }, { text: '外协W', value: '外协W' }]"
            :filter-method="filterRoute"
            filter-placement="bottom-end"
          ></el-table-column>
          <el-table-column
            prop="route"
            label="工序"
            width="100"
            filter-placement="bottom-end"
          ></el-table-column>
          <el-table-column
            prop="cuser"
            label="负责人"
            width="100"
            filter-placement="bottom-end"
          ></el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="100"
            :filters="[{ text: '就工', value: '就工' },{ text: '完工', value: '完工' },{ text: '逾期', value: '逾期' }]"
            :filter-method="filterState"
            filter-placement="bottom-end"
          ></el-table-column>
          <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
          <el-table-column width="120">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="handleRead(scope.row)">标为已读</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="handle-row"></div>
      </el-tab-pane>

      <el-tab-pane :label="`已读消息(${read.length})`" name="second">
        <el-table ref="filterTable" :data="read" style="width: 100%">
          <!-- <el-table-column prop="name" label="" width="180"></el-table-column> -->
          <el-table-column prop="address" label="部件信息" :formatter="formatter"></el-table-column>
          <el-table-column
            prop="route"
            label="车间"
            width="100"
            :filters="[{ text: 'K开料车间', value: 'K开料车间' }, { text: 'TK开料车间', value: 'TK开料车间' }, { text: '安装S', value: '安装S' }, { text: '玻璃钢F', value: '玻璃钢F' }, { text: '电气G', value: '电气G' }, { text: '机加T', value: '机加T' }, { text: '结构L', value: '结构L' }, { text: '探伤', value: '探伤' }, { text: '外协W', value: '外协W' }]"
            :filter-method="filterRoute"
            filter-placement="bottom-end"
          ></el-table-column>
          <el-table-column
            prop="route"
            label="工序"
            width="100"
            filter-placement="bottom-end"
          ></el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="100"
            :filters="[ { text: '就工', value: '0' },{ text: '完工', value: '1' }]"
            :filter-method="filterState"
            filter-placement="bottom-end"
          ></el-table-column>
          <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
          <el-table-column width="120">
            <template slot-scope="scope">
              <el-button size="big" type="danger" @click="handleDel(scope.row)">删除消息</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="handle-row">
          <el-button type="danger" @click="allDel()">删除全部消息</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="`全部消息(${recycle.length})`" name="third">
        <el-table ref="filterTable" :data="recycle" style="width: 100%">
          <!-- <el-table-column prop="name" label="" width="180"></el-table-column> -->
          <el-table-column prop="address" label="部件信息" :formatter="formatter"></el-table-column>
          <el-table-column
            prop="route"
            label="车间"
            width="100"
            :filters="[{ text: 'K开料车间', value: 'K开料车间' }, { text: 'TK开料车间', value: 'TK开料车间' }, { text: '安装S', value: '安装S' }, { text: '玻璃钢F', value: '玻璃钢F' }, { text: '电气G', value: '电气G' }, { text: '机加T', value: '机加T' }, { text: '结构L', value: '结构L' }, { text: '探伤', value: '探伤' }, { text: '外协W', value: '外协W' }]"
            :filter-method="filterRoute"
            filter-placement="bottom-end"
          ></el-table-column>
          <el-table-column
            prop="tag"
            label="工序"
            width="100"
            :filters="[{ text: '切管', value: '切管' }, { text: '锯床', value: '锯床' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          ></el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="100"
            :filters="[ { text: '就工', value: '0' },{ text: '完工', value: '1' }]"
            :filter-method="filterState"
            filter-placement="bottom-end"
          ></el-table-column>
          <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { Loading } from 'element-ui';
import axios from "axios";
export default {
  inject: ["reload"],
  name: "tabs",
  data() {
    return {
      loading: true,
      activeName: "first",
      canupload: false,
      filterText: "",
      showHeader: false,
      checkList: ["全部", "车间"],
      textarea: [],
      unread: [],
      read: [],
      recycle: []
    };
  },
  created() {
    this.getDataTime();
    setTimeout(() => {
      this.getDataUnread();
    }, 1500);

    this.getDataRead();
    this.getDataRecycle();
  },
  methods: {
    // 过滤查询
    handleFifter() {
      console.log(this.filterText);
      var fd = new FormData();
      fd.append("flag", "Search");
      fd.append("modid", this.filterText);
      var department = localStorage.getItem("ms_department");
      fd.append("department", department);
      axios.post(`${this.baseURL}/tabs.php`, fd).then(unread => {
        //ES6写法
        unread = unread.data;
        console.log(unread.data);
        if (unread.success && unread.data) {
          this.unread = [];
          this.unread = unread.data;
        }
      });
    },

    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterState(value, row) {
      return row.state === value;
    },
    filterRoute(value, row) {
      //   return row.state === value;
      if (row.route.indexOf(value) !== -1) {
        return value;
      }
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    // 获取逾期消息
    getDataTime() {
      console.log("time");
      var fd = new FormData();
      fd.append("flag", "Overdue");
      // console.log("flag");
      // var department = localStorage.getItem("ms_department");
      // fd.append("department", department);
      axios.post(`${this.baseURL}/tabs.php`, fd).then(Overdue => {
        //ES6写法
        Overdue = Overdue.data;
        // console.log(unread.data.length);
        if (Overdue.success && Overdue.data) {
          this.Overdue = [];
          this.Overdue = Overdue.data;
        }
      });
    },

    // 获取未读
    getDataUnread() {
      var fd = new FormData();
      fd.append("flag", "Unread");
      var department = localStorage.getItem("ms_department");
      fd.append("department", department);
      axios.post(`${this.baseURL}/tabs.php`, fd).then(unread => {
        //ES6写法
        unread = unread.data;
        // console.log(unread.data.length);
        if (unread.success && unread.data) {
          this.unread = [];
          this.unread = unread.data;
          this.loading = false;
        }
      });
    },
    getDataInfoSucc(res) {
      console.log(res.data.rows);
      res = res.data;
      if (res.success && res.rows) {
        this.rows = res.rows;
        console.log(this.rows);
      }
    },
    //获取已读
    getDataRead() {
      var fd = new FormData();
      fd.append("flag", "Read");
      var department = localStorage.getItem("ms_department");
      fd.append("department", department);
      axios.post(`${this.baseURL}/tabs.php`, fd).then(read => {
        //ES6写法
        read = read.data;
        // console.log(read)
        if (read.success && read.data) {
          this.read = [];
          this.read = read.data;
        }
      });
    },
    //获取全部消息
    getDataRecycle() {
      var fd = new FormData();
      fd.append("flag", "Recycle");
      axios.post(`${this.baseURL}/tabs.php`, fd).then(recycle => {
        //ES6写法
        recycle = recycle.data;
        // console.log(recycle)
        if (recycle.success && recycle.data) {
          this.recycle = [];
          this.recycle = recycle.data;
        }
      });
    },
    //进入已读
    handleRead(row) {
      console.log(row.id);
      const item = this.unread.splice(row, 1);
      // console.log(this.unread);
      this.read = item.concat(this.read);
      var fd = new FormData();
      fd.append("flag", "ReadIn");
      fd.append("id", row.id);
      axios.post(`${this.baseURL}/tabs.php`, fd).then(recycle => {
        //ES6写法
        recycle = recycle.data;
      });
    },
    //全部进入已读
    allRead(row) {
      for (let i = 0; i < this.unread.length; i++) {
        console.log(this.unread[i].id);
        var fd = new FormData();
        fd.append("flag", "allRead");
        fd.append("id", this.unread[i].id);
        axios.post(`${this.baseURL}/tabs.php`, fd).then(recycle => {
          //ES6写法
          recycle = recycle.data;
        });
      }
      const item = this.unread.splice(row);
      this.read = item.concat(this.read);
    },
    //删除
    handleDel(row) {
      const item = this.read.splice(row, 1);
      this.recycle = item.concat(this.recycle);
      var fd = new FormData();
      fd.append("flag", "RecycleIn");
      fd.append("id", row.id);
      axios.post(`${this.baseURL}/tabs.php`, fd).then(recycle => {
        //ES6写法
        recycle = recycle.data;
      });
    },
    //全部删除
    allDel(row) {
      for (let i = 0; i < this.read.length; i++) {
        console.log(this.read[i].id);
        var fd = new FormData();
        fd.append("flag", "allDel");
        fd.append("id", this.read[i].id);
        axios.post(`${this.baseURL}/tabs.php`, fd).then(recycle => {
          //ES6写法
          recycle = recycle.data;
        });
      }
      const item = this.read.splice(row);
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  computed: {
    unreadNum() {
      return this.unread.length;
    }
  }
};
</script>

<style scoped>
/* * {
  margin: 0;
  padding: 0;
} */
.message-title {
  cursor: pointer;
}
.el-tabs--card {
  height: 420px;
  overflow: scroll;
}
.el-card__body {
  padding-bottom: 0 !important;
}
form {
  height: 34px !important;
  padding: 0;
}
</style>

