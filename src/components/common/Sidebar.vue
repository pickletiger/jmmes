<template>
    <div class="sidebar">
        <!-- el-menu 参数 router 为是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转-->
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import axios from "axios";
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: []
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })

            this.getDataInfo();
        },
        methods:{
            getDataInfo(){
                var storage=window.localStorage
                var account=storage.ms_username
                var fd = new FormData()
                fd.append("flag","Sidebar")
                fd.append("account",account)
                axios.post(`${this.baseURL}/common/sidebar.php`,fd).then((res)=> {  //ES6写法
                    let retData = res.data;
                    if(retData.success == "success"){
                        this.items = JSON.parse(retData.data) 
                    }
                    // this.items = JSON.parse() 
                    // this.items = [ {
                    //     icon: 'el-icon-setting',
                    //     index: 'dashboard',
                    //     title: '系统首页'
                    // },
                    // {
                    //     icon: 'el-icon-more',
                    //     index: '2',
                    //     title: '基础数据管理',
                    //     subs: [
                    //         {
                    //             index: 'staff',
                    //             title: '员工信息管理'
                    //         },
                    //         {
                    //             index: 'equipment',
                    //             title: '设备管理'
                    //         },
                    //         {
                    //             index: 'document',
                    //             title: '文档管理'
                    //         },
                    //         {
                    //             index: 'material',
                    //             title: '原材料管理'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-message',
                    //     index: 'tabs',
                    //     title: '消息通知'
                    // },
                    // {   
                    //     icon: 'el-icon-tickets',
                    //     index: '4',
                    //     title: '销售模块',
                    //     subs: [
                    //         {
                    //             index: 'marketunreview',
                    //             title: '未审核项目'
                    //         },
                    //         {
                    //             index: 'market',
                    //             title: '在建项目'
                    //         },
                    //         {
                    //             index: 'marketfinished',
                    //             title: '已完成项目'
                    //         },
                    //         {
                    //             index: 'marketcheck',
                    //             title: '订单管理'
                    //         }
                    //     ]
                    // },
                    // {   
                    //     icon: 'el-icon-tickets',
                    //     index: '5',
                    //     title: '计划模块',
                    //     subs: [
                    //         {
                    //             index: 'planunreview',
                    //             title: '未审核项目'
                    //         },
                    //         {
                    //             index: 'plan',
                    //             title: '在建项目'
                    //         },
                    //         {
                    //             index: 'planfinished',
                    //             title: '已完成项目'
                    //         },
                    //         {
                    //             index: 'plancheck',
                    //             title: '订单查看'
                    //         },
                    //         {
                    //             index: 'plantable',
                    //             title: '计划总表'
                    //         }
                    //     ]
                    // },
                    // {   
                    //     icon: 'el-icon-tickets',
                    //     index: '6',
                    //     title: '工艺模块',
                    //     subs: [
                    //         {
                    //             index: 'craftunreview',
                    //             title: '未审核项目'
                    //         },
                    //         {
                    //             index: 'craft',
                    //             title: '在建项目'
                    //         },
                    //         {
                    //             index: 'craftfinished',
                    //             title: '已完成项目'
                    //         }
                    //     ]
                    // },
                    // {   
                    //     icon: 'el-icon-date',
                    //     index: '7',
                    //     title: '制造模块',
                    //     subs: [
                    //         {
                    //             index: 'electronic',
                    //             title: '电子看板'
                    //         },
                    //         {
                    //             index: 'productionplan',
                    //             title: '车间计划'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-search',
                    //     index: 'examine',
                    //     title: '检验模块'
                    // },
                    // {
                    //     icon: 'el-icon-star-on',
                    //     index: 'charts',
                    //     title: '统计分析'
                    // },
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: '9',
                    //     title: '系统设置',
                    //     subs: [
                    //         {
                    //             index: 'operationlog',
                    //             title: '操作日志'
                    //         },
                    //         {
                    //             index: 'data',
                    //             title: '数据备份与还原'
                    //         },{
                    //             index: 'workshop',
                    //             title: '车间管理'
                    //         },
                    //         {
                    //             index: 'authority',
                    //             title: '权限管理'
                    //         },
                    //         {
                    //             index: 'cloudinteraction',
                    //             title: '云平台交互'
                    //         }
                    //     ]
                    // }];
                    // this.items = res.data;
                    // this.items = [ {
                    //     icon: 'el-icon-more',
                    //     index: '2',
                    //     title: '基础数据管理',
                    //     subs: [
                    //         {
                    //             index: 'staff',
                    //             title: '员工信息管理'
                    //         },
                    //         {
                    //             index: 'equipment',
                    //             title: '设备管理'
                    //         },
                    //         {
                    //             index: 'document',
                    //             title: '文档管理'
                    //         },
                    //         {
                    //             index: 'material',
                    //             title: '原材料管理'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-message',
                    //     index: 'tabs',
                    //     title: '消息通知'
                    // },
                    // {   
                    //     icon: 'el-icon-tickets',
                    //     index: '4',
                    //     title: '销售模块',
                    //     subs: [
                    //         {
                    //             index: 'marketunreview',
                    //             title: '未审核项目'
                    //         },
                    //         {
                    //             index: 'market',
                    //             title: '在建项目'
                    //         },
                    //         {
                    //             index: 'marketfinished',
                    //             title: '已完成项目'
                    //         },
                    //         {
                    //             index: 'marketcheck',
                    //             title: '订单管理'
                    //         }
                    //     ]
                    // }];
                });
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
