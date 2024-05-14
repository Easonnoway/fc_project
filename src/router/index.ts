import {createRouter, createWebHashHistory} from 'vue-router'

import LoginCom from '@/pages/Login.vue'
import HomeCom from '@/pages/Home.vue'
import SignupCom from '@/pages/Signup.vue'
import AccountingCom from '@/pages/Accounting.vue'
import TradingCom from '@/pages/Trading.vue'
import ElectricCom from '@/pages/AccPages/Electric.vue'
import CeramicsCom from '@/pages/AccPages/Ceramics.vue'
import GlassCom from '@/pages/AccPages/Glass.vue'
import AviationCom from '@/pages/AccPages/Aviation.vue'
import HistoryCom from '@/pages/AccPages/History.vue'
import DetailsCom from '@/pages/AccPages/Details.vue'
import AuditCom from '@/pages/Audit.vue'
import AuditDetailCom from '@/pages/Auditdetail.vue'
import BalanceCom from '@/pages/TraPages/Balance.vue'
import MessageCom from '@/pages/TraPages/Message.vue'
import SellMarCom from '@/pages/TraPages/SellMar.vue'
import TraLoginCom from '@/pages/TraPages/TraLogin.vue'
import TrasignupCom from '@/pages/TraPages/Trasignup.vue'
import WantMarCom from '@/pages/TraPages/WantMar.vue'
import TraHistoryCom from '@/pages/TraPages/TraHistory.vue'

const router = createRouter({
    // history:createWebHistory(),
    history: createWebHashHistory(),
    routes:[
        {  
            name:'login',
            path:'/login',
            component:LoginCom
        },
        {
            name:'home',
            path:'/',
            component:HomeCom
        },
        {
            name:'signup',
            path:'/signup',
            component:SignupCom
        },
        {
            name:'audit',
            path:'/audit',
            component:AuditCom
        },
        {
            name:'auditdetail',
            path:'/auditdetail',
            component:AuditDetailCom
        },
        {
            name:'accounting',
            path:'/accounting',
            component:AccountingCom,
            children:[
                {
                    path:'electric',
                    component:ElectricCom
                },
                {
                    path:'ceramics',
                    component:CeramicsCom
                },
                {
                    path:'glass',
                    component:GlassCom
                },
                {
                    path:'aviation',
                    component:AviationCom
                },
                {
                    path:'history',
                    component:HistoryCom
                },
                {
                    path:'details',
                    component:DetailsCom
                }
            ]
        },
        {
            name:'trading',
            path:'/trading',
            component:TradingCom,
            children:[
                {
                    path:'tralogin',
                    component:TraLoginCom
                },
                {
                    path:'trasignup',
                    component:TrasignupCom
                },
                {
                    path:'message',
                    component:MessageCom
                },
                {
                    path:'sellmar',
                    component:SellMarCom
                },
                {
                    path:'wantmar',
                    component:WantMarCom
                },
                {
                    path:'balance',
                    component:BalanceCom
                },
                {
                    path:'trahistory',
                    component:TraHistoryCom
                },
            ]
        }
    ]
})

export default router