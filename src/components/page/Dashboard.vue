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
                                    <el-input v-model="account" readonly="readonly"></el-input>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <el-input v-model="postword"></el-input>
                                </el-form-item>
                            </el-form>
                            <el-button type="danger" style="float: right; margin-bottom:10px" @click="person_save()">保存</el-button>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="16">
                <el-card shadow="hover" >
                    <div slot="header" class="clearfix">
                        <span>消息通知</span>
                    </div>
                    <tabs></tabs>
                </el-card>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'dashboard',
        components: {
            Tabs:require('./Tabs.vue').default
        },
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                canupload: false,
                message: 'first',
                textarea: '',
                showHeader: false,
                labelPosition: 'right', 
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
        created() {
            this.getDataInfo()
        },
        methods: {
            getDataInfo(){
                var account = localStorage.getItem("ms_username")
                var fd = new FormData
                    fd.append("flag","Select")
                    fd.append("account",account)
                    axios.post(`${this.baseURL}/dashboard.php`,fd).then((res)=>{
                        res = res.data
                        this.name = res.name
                        this.account = res.account
                    });
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
            },
            person_save(){
                var fd = new FormData()
                fd.append("flag","Save")
                fd.append("name",this.name)
                fd.append("account",this.account)
                fd.append("postword",this.postword)

                axios.post(`${this.baseURL}/dashboard.php`,fd).then(function(res){
                    console.log(res)
                    res = res.data
                    if(res.success= "success"){
                        alert("修改成功")
                    }else{
                        alert("修改失败")
                    }
                });
            }
        },
        computed: {
            unreadNum(){
                return this.unread.length;
            }
        },
        computed: {
            role() {
                return this.account === 'admin' ? '超级管理员' : '普通用户';
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
