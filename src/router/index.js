import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 定义销售部子路径
const marketchildren = [{
    path: '/marketproject',
    component: resolve => require(['../components/page/market/components/MarketProject.vue'], resolve),
    meta: { title: '项目信息' }
}, {
    path: '/marketpart',
    component: resolve => require(['../components/page/market/components/MarketPart.vue'], resolve),
    meta: { title: '部件信息' }
}, {
    path: '/marketsonpart',
    component: resolve => require(['../components/page/market/components/MarketSonpart.vue'], resolve),
    meta: { title: '子部件信息' }
}]
// 定义计划部子路径
const planchildren = [{
    path: '/planproject',
    component: resolve => require(['../components/page/plan/components/PlanProject.vue'], resolve),
    meta: { title: '项目信息' }
}, {
    path: '/planpart',
    component: resolve => require(['../components/page/plan/components/PlanPart.vue'], resolve),
    meta: { title: '部件信息' }
}, {
    path: '/plansonpart',
    component: resolve => require(['../components/page/plan/components/PlanSonpart.vue'], resolve),
    meta: { title: '子部件信息' }
}]
// 定义工艺部子路径
const craftchildren = [{
            path: '/craftproject',
            component: resolve => require(['../components/page/craft/components/CraftProject.vue'], resolve),
            meta: { title: '项目信息' }
        }, {
            path: '/craftpart',
            component: resolve => require(['../components/page/craft/components/CraftPart.vue'], resolve),
            meta: { title: '部件信息' }
        }, {
            path: '/craftsonpart',
            component: resolve => require(['../components/page/craft/components/CraftSonpart.vue'], resolve),
            meta: { title: '子部件信息' }
}]

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
                    component: resolve => require(['../components/page/market/MarketUnreview.vue'], resolve),
                    meta: { title: '未审核项目' }
                },
                {
                    path: '/market',
                    component: resolve => require(['../components/page/market/Market.vue'], resolve),
                    meta: { title: '在建项目' },
                    children: marketchildren
                },
                {
                    path: '/marketfinished',
                    component: resolve => require(['../components/page/market/MarketFinished.vue'], resolve),
                    meta: { title: '已完成项目' },
                    children: marketchildren
                },
                // 计划部
                {
                    path: '/planunreview',
                    component: resolve => require(['../components/page/plan/PlanUnreview.vue'], resolve),
                    meta: { title: '未审核项目' }
                },
                {
                    path: '/plan',
                    component: resolve => require(['../components/page/plan/Plan.vue'], resolve),
                    meta: { title: '在建项目' },
                    children: planchildren
                },
                {
                    path: '/planfinished',
                    component: resolve => require(['../components/page/plan/PlanFinished.vue'], resolve),
                    meta: { title: '已完成项目' },
                    children: planchildren
                },
                // 工艺部
                {
                    path: '/craftunreview',
                    component: resolve => require(['../components/page/craft/CraftUnreview.vue'], resolve),
                    meta: { title: '未审核项目' }
                },
                {
                    path: '/craft',
                    component: resolve => require(['../components/page/craft/Craft.vue'], resolve),
                    meta: { title: '在建项目' },
                    children: craftchildren
                },
                {
                    path: '/craftfinished',
                    component: resolve => require(['../components/page/craft/CraftFinished.vue'], resolve),
                    meta: { title: '已完成项目' },
                    children: craftchildren
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
        }
        // ,
        // {
        //     path: '*',
        //     redirect: '/404'
        // }
    ]
})
