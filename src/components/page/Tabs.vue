<template>
    <div class="">
        <div class="crumbs">
            <!-- <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-message"></i> 消息通知</el-breadcrumb-item>
            </el-breadcrumb> -->
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
                        <!-- <div class="handle-row">
                            <el-button type="danger" @click="allDel()">删除全部</el-button>
                        </div> -->
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
                            <!-- <el-table-column width="120"> -->
                                <!-- <template slot-scope="scope"> -->
                                    <!-- <el-button @click="handleRestore(scope.row)">还原</el-button> -->
                                <!-- </template> -->
                            <!-- </el-table-column> -->
                        </el-table>
                        <!-- <div class="handle-row">
                            <el-button type="danger" @click="emptyTrash()">清空消息</el-button>
                        </div> -->
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
        </div> 
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: 'tabs',
        data() {
            return {    
                canupload: false,
                message: 'first',
                showHeader: false,
                checkList: ['全部','车间'],
                textarea: [],
                unread: [],
                read: [],
                recycle: []
                }
        },
         created () {
            this.getDataUnread()
            this.getDataRead()
            this.getDataRecycle()
        },
        methods: {
             // 获取未读
            getDataUnread () {
                var fd = new FormData()
                fd.append("flag","Unread")
                var department = localStorage.getItem("ms_department")
                fd.append("department",department)
                axios.post(`${this.baseURL}/tabs.php`,fd).then((unread)=> {  //ES6写法
                    unread = unread.data;
                    // console.log(unread)
                    if (unread.success && unread.data) {
                    this.unread = [];
                    this.unread = unread.data;
                    }

                }); 
            },
            getDataInfoSucc (res){
            // console.log(res.data.rows)
            res = res.data
            if(res.success && res.rows){
                this.rows = res.rows
                // console.log(this.rows)
            }
            },
            //获取已读
            getDataRead () {
                var fd = new FormData()
                fd.append("flag","Read")
                var department = localStorage.getItem("ms_department")
                fd.append("department",department)
                axios.post(`${this.baseURL}/tabs.php`,fd).then((read)=> {  //ES6写法
                    read = read.data;
                    // console.log(read)
                    if (read.success && read.data) {
                    this.read = [];
                    this.read = read.data;
                    }

                });
            },
            //获取回收站
            getDataRecycle () {
                var fd = new FormData()
                fd.append("flag","Recycle")
                axios.post(`${this.baseURL}/tabs.php`,fd).then((recycle)=> {  //ES6写法
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
                var fd = new FormData()
                fd.append("flag","ReadIn")
                fd.append("id",row.id)
                axios.post(`${this.baseURL}/tabs.php`,fd).then((recycle)=> {  //ES6写法
                    recycle = recycle.data;

                });
            },
            //全部标记已读
            allRead(row){
                for(let i=0;i<this.unread.length;i++){
                    console.log(this.unread[i].id)
                    var fd = new FormData()
                    fd.append("flag","allRead")
                    fd.append("id",this.unread[i].id)
                    axios.post(`${this.baseURL}/tabs.php`,fd).then((recycle)=> {  //ES6写法
                    recycle = recycle.data;
                    });
                }
                const item = this.unread.splice(row);
                this.read = item.concat(this.read);
            },
            //删除
            handleDel(row) {
                const item = this.read.splice(row, 1)
                // this.recycle = item.concat(this.recycle)
                var fd = new FormData()
                fd.append("flag","RecycleIn")
                fd.append("id",row.id)
                axios.post(`${this.baseURL}/tabs.php`,fd).then((recycle)=> {  //ES6写法
                recycle = recycle.data;

                });
            },
            //删除全部
            allDel(row) {
                for(let i=0;i<this.read.length;i++){
                    console.log(this.read[i].id)
                    var fd = new FormData()
                    fd.append("flag","allDel")
                    fd.append("id",this.read[i].id)
                    axios.post(`${this.baseURL}/tabs.php`,fd).then((recycle)=> {  //ES6写法
                    recycle = recycle.data;
                    });
                }
                const item = this.read.splice(row)
            },
            //还原
            handleRestore(row) {
                const item = this.recycle.splice(row, 1)
                this.read = item.concat(this.read)
                var fd = new FormData()
                fd.append("flag","Reduction")
                fd.append("id",row.id)
                axios.post(`${this.baseURL}/tabs.php`,fd).then((reduction)=> {  //ES6写法
                reduction = reduction.data

                });
            },
            //清空回收站
            emptyTrash(index) {
                this.recycle.splice(index)
            }
        },
        computed: {
            unreadNum(){
                return this.unread.length
            }
        }
    }

</script>

<style scoped>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>

