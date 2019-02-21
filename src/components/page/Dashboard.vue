<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-row>
                    <el-col>
                        <el-card shadow="hover" class="mgb20">
                            <div class="user-info">
                                <img src="static/img/img.jpg" class="user-avator" alt="">
                                <div class="user-info-cont">
                                    <div class="user-info-name">{{name}}</div>
                                    <div>{{role}}</div>
                                </div>
                            </div>
                            <div class="user-info-list">上次登录时间：<span>2018-01-01</span></div>
                            <div class="user-info-list">上次登录地点：<span>东莞</span></div>
                        </el-card>
                        <el-card shadow="hover" >
                            <div slot="header" class="clearfix">
                                <span>个人信息</span>
                            </div>
                            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                                <el-form-item label="姓名">
                                    <el-input v-model="name"></el-input>
                                </el-form-item>
                                <el-form-item label="账号">
                                    <el-input v-model="account"></el-input>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <el-input v-model="postword"></el-input>
                                </el-form-item>
                            </el-form>
                            <el-button type="danger" style="float: right; margin-bottom:10px" @click="person_save()">保存</el-button>
                            <el-button type="danger" style="float: right; margin-bottom:10px" @click="test()">ceshi</el-button>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="16">
                <el-card shadow="hover" >
                    <div slot="header" class="clearfix">
                        <span>消息通知</span>
                    </div>
                    <div class="container">
                        <el-header style="text-align: right; font-size: 12px; height: 10px">
                            <el-button type="primary" style="z-index:99" @click="canupload = true" icon="el-icon-edit" circle></el-button>
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
                                            <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="handle-row">
                                    <el-button type="danger" style="margin-top:10px" @click="allRead($index)">全部标为已读</el-button>
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
                                                <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <div class="handle-row">
                                        <el-button type="danger" style="margin-top:10px" @click="allDel($index)">删除全部</el-button>
                                    </div>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
                                <template v-if="message === 'third'">
                                    <el-table :data="recycle" :show-header="false" style="width: 100%">
                                        <el-table-column>
                                            <template slot-scope="scope">
                                                <span class="message-title">{{scope.row.title}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="date" width="150"></el-table-column>
                                        <el-table-column width="120">
                                            <template slot-scope="scope">
                                                <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <div class="handle-row">
                                        <el-button type="danger" style="margin-top:10px" @click="emptyTrash($index)">清空回收站</el-button>
                                    </div>
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
                </el-card>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                canupload: false,
                message: 'first',
                textarea: '',
                showHeader: false,
                labelPosition: 'right',
                checkList: ['全部','车间'],  
                unread: [{
                    date: '2018-04-19 20:00:00',
                    title: 'XX项目出现新的节点变更',
                },{
                    date: '2018-04-19 21:00:00',
                    title: 'XX车间焊机温度过高',
                },{
                    date: '2018-04-19 20:00:00',
                    title: 'XX项目即将到达截止日期',
                }],
                read: [

                ],
                recycle: [
                    
                ],
                formLabelAlign: {
                    name: '',
                    region: 'admin',
                    type: ''
                },
                name: '',
                account: '',
                postword: ''
            }
        },
        methods: {
            handleRead(index) {
                const item = this.unread.splice(index, 1);
                console.log(item);
                this.read = item.concat(this.read);
            },
            allRead: function(index){
                const item = this.unread.splice(index);
                console.log(item);
                this.read = item.concat(this.read);
            },
            handleDel(index) {
                const item = this.read.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
            allDel(index) {
                const item = this.read.splice(index);
                this.recycle = item.concat(this.recycle);
            },
            handleRestore(index) {
                const item = this.recycle.splice(index, 1);
                this.read = item.concat(this.read);
            },
            emptyTrash(index) {
                this.recycle.splice(index);
            },
            person_save(){
                var fd = new FormData()
                 fd.append("flag","Save")
                 fd.append("name",this.name)
                 fd.append("account",this.account)
                 fd.append("postword",this.postword)
                 axios.post(`${this.baseURL}/dashboard.php`,fd).then(function(res){
                     console.log(res)
                 })
            },
            test(){
                 axios.post(`${this.baseURL}/Test.php`).then(function(res){
                     console.log(res.data)
                 })
            }
        },
        computed: {
            unreadNum(){
                return this.unread.length;
            }
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

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

</style>
