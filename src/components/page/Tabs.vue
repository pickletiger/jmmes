<template>
    <div class="">
        <div class="crumbs">
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
                                <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="danger" @click="allRead($index)">全部标为已读</el-button>
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
                            <el-button type="danger" @click="allDel($index)">删除全部</el-button>
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
                            <el-button type="danger" @click="emptyTrash($index)">清空回收站</el-button>
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
                    
                ]
                }
        },
         created () {
            this.getDataInfo()
        },
        methods: {
             // 获取设备list
            getDataInfo () {
            axios.post('https://www.easy-mock.com/mock/5bb09b6d0478cd27d90001e8/example/mock').then(this.getDataInfoSucc)
            },
            getDataInfoSucc (res){
            // console.log(res.data.rows)
            res = res.data
            if(res.success && res.rows){
                this.rows = res.rows
                // console.log(this.rows)
            }
            },
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
            }
        },
        computed: {
            unreadNum(){
                return this.unread.length;
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

