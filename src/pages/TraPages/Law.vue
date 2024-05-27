<script lang="ts" setup>
import { ref } from 'vue'
const activeName = ref('1')
const lawList = ref([
    {
        title: "碳排放权交易管理暂行条例", content: [
            { subIndex: 1, label: "为了规范碳排放权交易及相关活动，加强对温室气体排放的控制，积极稳妥推进碳达峰碳中和，促进经济社会绿色低碳发展，推进生态文明建设，制定本条例。" },
            { subIndex: 2, label: "本条例适用于全国碳排放权交易市场的碳排放权交易及相关活动。" },
            { subIndex: 3, label: "碳排放权交易及相关活动的管理，应当坚持中国共产党的领导，贯彻党和国家路线方针政策和决策部署，坚持温室气体排放控制与经济社会发展相适应，坚持政府引导与市场调节相结合，遵循公开、公平、公正的原则。" },
            { subIndex: 4, label: "国家加强碳排放权交易领域的国际合作与交流。" },
            { subIndex: 5, label: "国务院生态环境主管部门负责碳排放权交易及相关活动的监督管理工作。国务院有关部门按照职责分工，负责碳排放权交易及相关活动的有关监督管理工作。" },
            { subIndex: 6, label: "地方人民政府生态环境主管部门负责本行政区域内碳排放权交易及相关活动的监督管理工作。地方人民政府有关部门按照职责分工，负责本行政区域内碳排放权交易及相关活动的有关监督管理工作。" },
            { subIndex: 7, label: "全国碳排放权注册登记机构按照国家有关规定，负－2－责碳排放权交易产品登记，提供交易结算等服务。全国碳排放权交易机构按照国家有关规定，负责组织开展碳排放权集中统一交易。登记和交易的收费应当合理，收费项目、收费标准和管理办法应当向社会公开。" },
            { subIndex: 8, label: "全国碳排放权注册登记机构和全国碳排放权交易机构应当按照国家有关规定，完善相关业务规则，建立风险防控和信息披露制度。" },
            { subIndex: 9, label: "国务院生态环境主管部门会同国务院市场监督管理部门、中国人民银行和国务院银行业监督管理机构，对全国碳排放权注册登记机构和全国碳排放权交易机构进行监督管理，并加强信息共享和执法协作配合。" },
            { subIndex: 10, label: "碳排放权交易应当逐步纳入统一的公共资源交易平台体系。" },
        ]
    },
    {
        title: "碳排放权交易管理办法", content: [
            { subIndex: 1, label: "为落实党中央、国务院关于建设全国碳排放权交易市场的决策部署，在应对气候变化和促进绿色低碳发展中充分发挥市场机制作用，推动温室气体减排，规范全国碳排放权交易及相关活动，根据国家有关温室气体排放控制的要求，制定本办法。" },
            { subIndex: 2, label: "本条例适用于全国碳排放权交易市场的碳排放权交易及相关活动。" },
            { subIndex: 3, label: "全国碳排放权交易及相关活动应当坚持市场导向、循序渐进、公平公开和诚实守信的原则。" },
            { subIndex: 4, label: "生态环境部按照国家有关规定建设全国碳排放权交易市场。全国碳排放权交易市场覆盖的温室气体种类和行业范围，由生态环境部拟订，按程序报批后实施，并向社会公开。" },
            { subIndex: 5, label: "生态环境部按照国家有关规定，组织建立全国碳排放权注册登记机构和全国碳排放权交易机构，组织建设全国碳排放权注册登记系统和全国碳排放权交易系统。" },
            { subIndex: 6, label: "全国碳排放权注册登记机构通过全国碳排放权注册登记系统，记录碳排放配额的持有、变更、清缴、注销等信息，并提供结算服务。全国碳排放权注册登记系统记录的信息是判断碳排放配额归属的最终依据。" },
            { subIndex: 7, label: "全国碳排放权交易机构负责组织开展全国碳排放权集中统一交易。" },
            { subIndex: 8, label: "全国碳排放权注册登记机构和全国碳排放权交易机构应当定期向生态环境部报告全国碳排放权登记、交易、结算等活动和机构运行有关情况，以及应当报告的其他重大事项，并保证全国碳排放权注册登记系统和全国碳排放权交易系统安全稳定可靠运行。" },
        ]
    },
    {
        title: "温室气体自愿减排交易管理办法", content: [
            { subIndex: 1, label: "为了推动实现我国碳达峰碳中和目标，控制和减少人为活动产生的温室气体排放，鼓励温室气体自愿减排行为，规范全国温室气体自愿减排交易及相关活动，根据党中央、国务院关于建设全国温室气体自愿减排交易市场的决策部署以及相关法律法规，制定本办法。" },
        ]
    },
]) 
</script>

<template>
    <div class="app">
        <div class="law">
            <h1 class="title">法律法规</h1>
            <div class="demo-collapse">
                <el-collapse v-model="activeName" accordion class="lawCard">
                    <el-collapse-item :title="item.title" :name="item.title" v-for="(item, index) in lawList"
                        :key="item.title">
                        <div>
                            <el-card>
                                <p v-for="subItem in item.content" :key="subItem.label" class="text item"><span>{{
                                        subItem.subIndex }}.</span>{{ subItem.label }}</p>
                            </el-card>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
    </div>
</template>

<style scoped>
.app {
    height: 90%;
    background-image: url(https://certificate.cets.org.cn/cerjeecms/u/cms/www/202212/17170104ghnn.png);
    background-repeat: no-repeat;
}

.title {
    text-align: center;
    padding-top: 50px;
    margin-top: 0;
    margin-bottom: 50px;
}

.lawCard {
    height: 1000px;
    margin: 10px 5%;

}
</style>