import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                //  销售部
                {
                    path: '/marketunreview',
                    component: resolve => require(['../components/page/project/market/MarketUnreview.vue'], resolve),
                    meta: { title: '未审核项目' }
                },
                {
                    path: '/market',
                    component: resolve => require(['../components/page/project/market/Market.vue'], resolve),
                    meta: { title: '在建项目' }
                },
                {
                    path: '/marketfinished',
                    component: resolve => require(['../components/page/project/market/MarketFinished.vue'], resolve),
                    meta: { title: '已完成项目' }
                },
                {
                    path: '/marketcheck',
                    component: resolve => require(['../components/page/project/market/MarketCheck.vue'], resolve),
                    meta: { title: '订单管理' }
                },
                // 计划部
                {
                    path: '/planunreview',
                    component: resolve => require(['../components/page/project/plan/PlanUnreview.vue'], resolve),
                    meta: { title: '未审核项目' }
                },
                {
                    path: '/plan',
                    component: resolve => require(['../components/page/project/plan/Plan.vue'], resolve),
                    meta: { title: '在建项目' }
                },
                {
                    path: '/planfinished',
                    component: resolve => require(['../components/page/project/plan/PlanFinished.vue'], resolve),
                    meta: { title: '已完成项目' }
                },
                {
                    path: '/plancheck',
                    component: resolve => require(['../components/page/project/plan/PlanCheck.vue'], resolve),
                    meta: { title: '订单查看' }
                },
                {
                    path: '/plantable',
                    component: resolve => require(['../components/page/project/plan/PlanTable.vue'], resolve),
                    meta: { title: '计划总表' }
                },
                // 工艺部
                {
                    path: '/craftunreview',
                    component: resolve => require(['../components/page/project/craft/CraftUnreview.vue'], resolve),
                    meta: { title: '未审核项目' }
                },
                {
                    path: '/craft',
                    component: resolve => require(['../components/page/project/craft/Craft.vue'], resolve),
                    meta: { title: '在建项目' }
                },
                {
                    path: '/craftfinished',
                    component: resolve => require(['../components/page/project/craft/CraftFinished.vue'], resolve),
                    meta: { title: '已完成项目' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/statistics/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 消息通知组件
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: '消息通知' }
                },
                {
                    // 基础数据模块/员工信息管理
                    path: '/staff',
                    component: resolve => require(['../components/page/basicdata/Staff.vue'], resolve),
                    meta: { title: '员工信息管理' }
                },
                {
                    // 基础数据模块/设备管理
                    path: '/equipment',
                    component: resolve => require(['../components/page/basicdata/Equipment.vue'], resolve),
                    meta: { title: '设备管理' }
                },
                {
                    // 基础数据模块/文档管理
                    path: '/document',
                    component: resolve => require(['../components/page/basicdata/Document.vue'], resolve),
                    meta: { title: '文档管理' }
                },
                {
                    // 基础数据模块/原材料管理
                    path: '/material',
                    component: resolve => require(['../components/page/basicdata/Material.vue'], resolve),
                    meta: { title: '原材料管理' }
                },
                {
                    // 车间模块/电子看板
                    path: '/electronic',
                    component: resolve => require(['../components/page/workshop/Electronic.vue'], resolve),
                    meta: { title: '电子看板' }
                },
                {
                    // 车间模块/车间计划
                    path: '/productionplan',
                    component: resolve => require(['../components/page/workshop/ProductionPlan.vue'], resolve),
                    meta: { title: '车间计划' }
                },
                {
                    // 检验模块
                    path: '/examine',
                    component: resolve => require(['../components/page/examine/examine.vue'],resolve),
                    meta: {title: '检验模块'}
                },
                {
                    // 系统设置模块/操作日志
                    path: '/operationlog',
                    component: resolve => require(['../components/page/system/OperationLog.vue'], resolve),
                    meta: { title: '操作日志' }
                },
                {
                    // 系统设置模块/数据备份与还原
                    path: '/data',
                    component: resolve => require(['../components/page/system/Data.vue'], resolve),
                    meta: { title: '数据备份与还原' }
                },
                {
                    // 系统设置模块/车间管理
                    path: '/workshop',
                    component: resolve => require(['../components/page/system/Workshop.vue'], resolve),
                    meta: { title: '车间管理' }
                },
                {
                    // 系统设置模块/权限管理
                    path: '/authority',
                    component: resolve => require(['../components/page/system/Authority.vue'], resolve),
                    meta: { title: '权限管理' }
                },
                {
                    // 系统设置模块/云平台交互
                    path: '/cloudinteraction',
                    component: resolve => require(['../components/page/system/CloudInteraction.vue'], resolve),
                    meta: { title: '云平台交互' }
                }
            ]
        },{
            path: '/tprint',
            component: resolve => require(['../components/page/Tprint.vue'], resolve),
            meta: { title: '打印表格demo' }
        },
        {
            path: '/qrcode',
            component: resolve => require(['../components/page/Qrcode.vue'], resolve),
            meta: { title: '二维码demo' }
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path:'/personal_settings',
            component: resolve => require(['../components/page/Personal_settings.vue'], resolve),
            meta: { title: '个人设置' }
        }
        // ,
        // {
        //     path: '*',
        //     redirect: '/404'
        // }
    ]
})
