<template>
    <div class="bgc" style="z-index: -1;">
        <bgc />
    </div>
    <el-button @click="gohistory()" type="primary" class="gotohistorybutton">返回记录</el-button>
    <el-card shadow="always" style="margin:80px 5%">
        <h2>二氧化碳总排放量：{{ myArray.reduce((accumulator, obj) => accumulator + obj.value, 0) }}吨</h2>
        <div id="CO2Value"> </div>
        <div id="CO2Value2"></div>
    </el-card>
    <el-card shadow="always" style="margin:80px 5%" v-show="moudleShow.show1 && fossilData.length > 0">
        <h2>化石燃料总排放量：{{ myArray[0].value }}吨</h2>
        <div id="FossilValue"> </div>
        <div id="FossilValue2"> </div>
        <div class="demo-collapse">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item :title="key.kind" :name="fossilData.indexOf(key)" v-for="key in fossilData">
                    <div>
                        净消耗量:<b>{{ key.net_consumption }}</b>
                    </div>
                    <div>
                        低位发热量<b>{{ key.emission_factor }}</b>
                    </div>
                    <div>
                        单位热值含碳量：<b>{{ key.carbon_content_per_unit_calorific_value }}</b>
                    </div>
                    <div>
                        碳氧化率:<b>{{ key.carbon_oxidation_rate }}</b>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </el-card>
    <el-card shadow="always" style="margin:80px 5%" v-show="moudleShow.show2 && desulfurization.length > 0">
        <h2>脱硫过程脱硫剂消耗量：{{ myArray[5].value }}吨</h2>
        <div id="DesulfurizationValue"> </div>
        <div id="DesulfurizationValue2"> </div>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :title="key.kind" :name="desulfurization.indexOf(key)" v-for="key in desulfurization">
                <div>全年脱硫消耗量：<b>{{ key.desulfurizer_consumption }}</b></div>
                <div>排放因子：<b>{{ key.emission_factor }}</b></div>
            </el-collapse-item>
        </el-collapse>
        <div id=""> {{ }} </div>
    </el-card>
    <el-card shadow="always" style="margin:80px 5%" v-show="moudleShow.show3 && process.length > 0">
        <h2>工业生产过程排放量：{{ myArray[3].value }}吨</h2>
        <div id="ProcessValue"> </div>
        <div id="ProcessValue2"> </div>
        <div style="margin: 10px;">碳粉消耗量：<b>{{ process[0]?.toner_consumption }}</b></div>
        <div style="margin: 10px;">碳粉含碳量：<b>{{ process[0]?.carbon_content_of_toner }}</b></div>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :title="key.name" :name="ProcessData.indexOf(key)" v-for="key in ProcessData"
                v-show="key.value != null || undefined">
                <div>碳酸盐消耗量：<b>{{ key.consumption }}</b></div>
                <div>碳酸盐排放因子：<b>{{ key.factor }}</b></div>
                <div>碳酸盐煅烧比例：<b>{{ key.ratio }}</b></div>
            </el-collapse-item>
        </el-collapse>
    </el-card>
    <el-card shadow="always" style="margin:80px 5%" v-if="process_ceramic && process_ceramic[0]"
        v-show="moudleShow.show3 && process_ceramic.length > 0">
        <h2>工业生产过程排放量：{{ process_ceramic[0].carbon_emissions }}吨</h2>
        <div>原料消耗量：<b>{{ process_ceramic[0].raw_material_consumption }}</b></div>
        <div>全年脱硫消耗量：<b>{{ process_ceramic[0].raw_material_utilization_rate }}</b></div>
        <div>碳酸钙含量：<b>{{ process_ceramic[0].calcium_carbonate_content }}</b></div>
        <div>碳酸镁含量：<b>{{ process_ceramic[0].magnesium_carbonate_content }}</b></div>
    </el-card>
    <el-card shadow="always" style="margin:80px 5%" v-show="moudleShow.show4 && biomass.length > 0">
        <h2>生物质混合燃料燃烧排放：{{ myArray[1].value }}吨</h2>
        <div id="BiomassValue"> </div>
        <div id="BiomassValue2"> </div>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :title="key.kind" :name="biomass.indexOf(key)" v-for="key in biomass">
                <div>消耗量：<b>{{ key.net_consumption }}</b></div>
                <div>低位发热值：<b>{{ key.average_low_calorific_value }}</b></div>
                <div>生物质含量：<b>{{ key.biomass_content }}</b></div>
                <div>单位热值含碳量：<b>{{ key.carbon_content_per_unit_calorific_value }}</b></div>
                <div>碳氧化率：<b>{{ key.carbon_oxidation_rate }}</b></div>
                <div>排放因子：<b>{{ key.emission_factor }}</b></div>
            </el-collapse-item>
        </el-collapse>
        <div id=""> {{ }} </div>
    </el-card>
    <el-card shadow="always" style="margin:80px 5%" v-show="moudleShow.show5 && electricity.length > 0">
        <h2>净购入电力量：{{ myArray[2].value }}吨</h2>
        <div id="ElectricityValue"> </div>
        <div id="ElectricityValue2"> </div>
        <div class="demo-collapse">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="电力" name="3" v-if="electricity && electricity[0]">
                    <div>所属电力公司：<b>{{ electricity[0].kind_electricity }}</b></div>
                    <div>电力消耗量：<b>{{ electricity[0].net_purchase_of_electricity }}</b></div>
                    <div>电力排放因子：<b>{{ electricity[0].emission_factor_electricity }}</b></div>
                </el-collapse-item>
                <el-collapse-item title="热力" name="2" v-if="electricity && electricity[0]">
                    <div>热力消耗量：<b>{{ electricity[0].net_purchase_of_heat }}</b></div>
                    <div>热力排放因子：<b>{{ electricity[0].emission_factor_heat }}</b></div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div id=""> {{ }} </div>
    </el-card>
    <el-button type="primary" class="fileButton" @click="uploadFile()">下载附件</el-button>
</template>

<script setup lang="ts">
import bgc from '@/components/EarthBgc.vue'
import * as echarts from "echarts"
import { onMounted, ref, reactive } from "vue";
import { useRecordStore } from "@/store/RecordState";
import { useRouter, useRoute } from 'vue-router'

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {

}

const gohistory = () => {
    router.push('/accounting/history')
}

const router = useRouter();
const route = useRoute();

const fossilData = ref([] as any[])
const biomass = ref([] as any[])
const electricity = ref([] as any[])
const process = ref([] as any[])
const process_ceramic = ref([] as any[])
const desulfurization = ref([] as any[])
const information = ref([] as any[])

interface MyObject {
    name: string;
    value: number;
}

const myArray: MyObject[] = reactive([
    { name: "化石燃料燃烧排放", value: 0 },
    { name: "生物质混合燃料燃烧排放", value: 0 },
    { name: "净购入电力量", value: 0 },
    { name: "工业生产过程排放量", value: 0 },
    { name: "工业生产过程排放量", value: 0 },
    { name: "脱硫过程脱硫剂消耗量", value: 0 },
]);

const uploadFile = () => {
    window.open(information.value[0].file_url_a)
    setTimeout(()=>{
        window.open(information.value[0].file_url_b)
    },100)
}

const moudleShow = reactive(
    {
        show1: true,
        show2: true,
        show3: true,
        show4: true,
        show5: true
    }
)

const showbefore = (enterprise_id: string) => {
    // console.log(enterprise_id)
    switch (enterprise_id) {
        case "陶瓷企业":
            moudleShow.show2 = false
            moudleShow.show4 = false
            break;
        case "发电企业":
            moudleShow.show3 = false
            moudleShow.show4 = false
            break;
        case "平板玻璃企业":
            moudleShow.show2 = false
            moudleShow.show4 = false
            break;
        case "民航企业":
            moudleShow.show2 = false
            moudleShow.show3 = false
            break;
    }
}

const itemId = ref<string | undefined>(route.query.id as string);
const enid = ref<string>(route.query.enid as string);

//为工业生产方向的数据赋值
const ProcessData = reactive([
    {
        name: "FeCO3",
        value: 0,
        consumption: 0,
        factor: 0,
        ratio: 0,
    },
    {
        name: "CaCO3",
        value: 0,
        consumption: 0,
        factor: 0,
        ratio: 0,
    },
    {
        name: "CaMg(CO3)2",
        value: 0,
        consumption: 0,
        factor: 0,
        ratio: 0,
    },
    {
        name: "MgCO3",
        value: 0,
        consumption: 0,
        factor: 0,
        ratio: 0,
    },
    {
        name: "MnCO3",
        value: 0,
        consumption: 0,
        factor: 0,
        ratio: 0,
    },
    {
        name: "Na2CO3",
        value: 0,
        consumption: 0,
        factor: 0,
        ratio: 0,
    },
])

//// 如果是玻璃企业，给生产过程排放量赋值
const ProcessGetValue = (ProcessData: any) => {
    ProcessData[0].value = process.value[0]?.feco3_carbon_emissions
    ProcessData[0].factor = process.value[0]?.feco3_emission_factor
    ProcessData[0].consumption = process.value[0]?.feco3_carbonate_consumption
    ProcessData[0].ratio = process.value[0]?.feco3_calcination_ratio
    ProcessData[1].value = process.value[0]?.caco3_carbon_emissions
    ProcessData[1].factor = process.value[0]?.caco3_emission_factor
    ProcessData[1].consumption = process.value[0]?.caco3_carbonate_consumption
    ProcessData[1].ratio = process.value[0]?.caco3_calcination_ratio
    ProcessData[2].value = process.value[0]?.camgco32_carbon_emissions
    ProcessData[2].factor = process.value[0]?.camgco32_emission_factor
    ProcessData[2].consumption = process.value[0]?.camgco32_carbonate_consumption
    ProcessData[2].ratio = process.value[0]?.camgco32_calcination_ratio
    ProcessData[3].value = process.value[0]?.mgco3_carbon_emissions
    ProcessData[3].factor = process.value[0]?.mgco3_emission_factor
    ProcessData[3].consumption = process.value[0]?.mgco3_carbonate_consumption
    ProcessData[3].ratio = process.value[0]?.mgco3_calcination_ratio
    ProcessData[4].value = process.value[0]?.mnco3_carbon_emissions
    ProcessData[4].factor = process.value[0]?.mnco3_emission_factor
    ProcessData[4].consumption = process.value[0]?.mnco3_carbonate_consumption
    ProcessData[4].ratio = process.value[0]?.mmnco3_calcination_ratio
    ProcessData[5].value = process.value[0]?.na2co3_carbon_emission
    ProcessData[5].factor = process.value[0]?.na2co3_emission_factor
    ProcessData[5].consumption = process.value[0]?.na2co3_carbonate_consumption
    ProcessData[5].ratio = process.value[0]?.na2co3_calcination_ratio
}

//声明周期函数，自动执行初始化
onMounted(() => {
    // console.log(enid)
    showbefore(enid.value)
    //取出来数据然后与id值进行对比
    // console.log(itemId.value)
    const detailDatas = useRecordStore().detailData
    // console.log(detailDatas)
    detailDatas.biomass_blended_fuel.forEach((item) => {
        if ((item.linked_id) == itemId.value) {
            biomass.value.push(item)
            myArray[1].value += item.carbon_emissions
        }
    })
    detailDatas.electricity_and_heat.forEach((item) => {
        if ((item.linked_id) == itemId.value) {
            electricity.value.push(item)
            myArray[2].value += item.carbon_emissions
        }
    })
    detailDatas.fossil_fuel.forEach((item) => {
        // console.log(item.linked_id)
        // console.log(itemId.value)
        if ((item.linked_id) == itemId.value) {
            fossilData.value.push(item)
            myArray[0].value += item.carbon_emissions
        }
    })
    detailDatas.industrial_process.forEach((item) => {
        if ((item.linked_id) == itemId.value) {
            process.value.push(item)
            myArray[3].value += item.carbon_emissions
        }
    })
    detailDatas.industrial_process_ceramic.forEach((item) => {
        if ((item.linked_id) == itemId.value) {
            process_ceramic.value.push(item)
            myArray[4].value += item.carbon_emissions
        }
    })
    detailDatas.desulfurization.forEach((item) => {
        if ((item.linked_id) == itemId.value) {
            desulfurization.value.push(item)
            myArray[5].value += item.carbon_emissions
        }
    })
    information.value = detailDatas.information
    // console.log(fossilData)
    // console.log(electricity)
    // console.log(desulfurization.value)
    // console.log(biomass.value)
    // console.log(process)
    // 如果是玻璃企业，给生产过程排放量赋值
    ProcessGetValue(ProcessData)
    // console.log(process.value[0]?.camgco32_carbon_emissions)
    // console.log(ProcessData)
    init()
    // console.log(myArray)
    //最关键的一步是判断它是哪种企业，要渲染什么东西上去
});
//初始化函数
function init() {
    // 基于准备好的dom，初始化echarts实例
    let CO2allChart = echarts.init(document.getElementById("CO2Value"), null, {});
    let CO2allChart2 = echarts.init(document.getElementById("CO2Value2"), null, {});
    let FossilChart = echarts.init(document.getElementById("FossilValue"), null, {});
    let FossilChart2 = echarts.init(document.getElementById("FossilValue2"), null, {});
    let ElectricityChart = echarts.init(document.getElementById("ElectricityValue"), null, {});
    let ElectricityChart2 = echarts.init(document.getElementById("ElectricityValue2"), null, {});
    let DesulfurizationChart = echarts.init(document.getElementById("DesulfurizationValue"), null, {});
    let DesulfurizationChart2 = echarts.init(document.getElementById("DesulfurizationValue2"), null, {});
    let BiomassChart = echarts.init(document.getElementById("BiomassValue"), null, {});
    let BiomassChart2 = echarts.init(document.getElementById("BiomassValue2"), null, {});
    let ProcessChart = echarts.init(document.getElementById("ProcessValue"), null, {});
    let ProcessChart2 = echarts.init(document.getElementById("ProcessValue2"), null, {});
    // 绘制CO2总图表

    let options = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        series: [
            {
                type: 'pie',
                stillShowZeroSum: false,
                data: myArray.filter(obj => obj.value !== 0),
                label: {
                    show: true,
                    formatter: '{b} : {d}%'
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },

        ]
    };
    let option2 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: myArray.filter(obj => obj.value !== 0).map(obj => obj.name),
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: myArray.filter(obj => obj.value !== 0)
            }
        ]
    };

    let Fossil = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        series: [
            {
                type: 'pie',
                data: fossilData.value.map((item: any) => {
                    const { kind, carbon_emissions } = item;
                    return { name: kind, value: carbon_emissions };
                }),
                label: {
                    show: true,
                    formatter: '{b} : {d}%'
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },

        ]
    };
    let Fossil2 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: fossilData.value.map((item: any) => {
                    const { kind, carbon_emissions } = item;
                    return { name: kind, value: carbon_emissions };
                }).map(obj => obj.name),
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: fossilData.value.map((item: any) => {
                    const { kind, carbon_emissions } = item;
                    return { name: kind, value: carbon_emissions };
                }),
            }
        ]
    };

    let DesulfurizationValue = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        series: [
            {
                type: 'pie',
                data: desulfurization.value.map((item: any) => {
                    const { kind, carbon_emissions } = item;
                    return { name: kind, value: carbon_emissions };
                }),
                label: {
                    show: true,
                    formatter: '{b} : {d}%'
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
        ]
    };

    let DesulfurizationValue2 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: desulfurization.value.map((item: any) => {
                    const { kind, carbon_emissions } = item;
                    return { name: kind, value: carbon_emissions };
                }).map(obj => obj.name),
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: desulfurization.value.map((item: any) => {
                    const { kind, carbon_emissions } = item;
                    return { name: kind, value: carbon_emissions };
                }),
            }
        ]
    };


    let BiomassValue = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        series: [
            {
                type: 'pie',
                data: biomass.value.map((item: any) => {
                    const { kind, carbon_emissions } = item;
                    return { name: kind, value: carbon_emissions };
                }),
                label: {
                    show: true,
                    formatter: '{b} : {d}%'
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },

        ]
    };

    let BiomassValue2 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: biomass.value.map((item: any) => {
                    const { kind, carbon_emissions } = item;
                    return { name: kind, value: carbon_emissions };
                }).map(obj => obj.name),
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: biomass.value.map((item: any) => {
                    const { kind, carbon_emissions } = item;
                    return { name: kind, value: carbon_emissions };
                }),
            }
        ]
    };


    if (electricity.value && electricity.value[0]) {
        let ElectricityValue = {
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} ({d}%)'
            },
            series: [
                {
                    type: 'pie',
                    data: [
                        {
                            name: "电力",
                            value: electricity.value[0].carbon_emissions_electricity
                        },
                        {
                            name: "热力",
                            value: electricity.value[0].carbon_emissions_heat
                        }
                    ],
                    label: {
                        show: true,
                        formatter: '{b} : {d}%'
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },

            ]
        };
        let ElectricityValue2 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: [
                    "电力","热力"
                    ],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: [
                        {
                            name: "电力",
                            value: electricity.value[0].carbon_emissions_electricity
                        },
                        {
                            name: "热力",
                            value: electricity.value[0].carbon_emissions_heat
                        }
                    ],
                }
            ]
        };
        ElectricityChart.setOption(ElectricityValue)
        ElectricityChart2.setOption(ElectricityValue2)
    }

    let ProcessValue = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        series: [
            {
                type: 'pie',
                data: ProcessData.filter(obj => obj.value !== 0),
                label: {
                    show: true,
                    formatter: '{b} : {d}%'
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },

        ]
    };
    let ProcessValue2 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ProcessData.filter(obj => obj.value !== 0).map(obj => obj.name),
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: ProcessData.filter(obj => obj.value !== 0)
                }
            ]
        };
    // 渲染图表
    CO2allChart.setOption(options);
    CO2allChart2.setOption(option2)
    FossilChart.setOption(Fossil);
    FossilChart2.setOption(Fossil2);
    DesulfurizationChart.setOption(DesulfurizationValue)
    DesulfurizationChart2.setOption(DesulfurizationValue2)
    BiomassChart.setOption(BiomassValue)
    BiomassChart2.setOption(BiomassValue2)
    ProcessChart.setOption(ProcessValue)
    ProcessChart2.setOption(ProcessValue2)
}
</script>

<style scoped>
#CO2Value {
    width: 50vh;
    height: 50vh;
    margin-top: 0px;
    margin: 0 auto;
    float: left;
    margin-left: 0;
    margin-left: 100px;
}

#CO2Value2 {
    width: 50vh;
    height: 50vh;
    margin-top: 0px;
    margin: 0 auto;
    margin-right: 0;
    margin-right: 100px;
    margin-right: 100px;
}

#FossilValue {
    width: 50vh;
    height: 50vh;
    margin-top: 0px;
    margin: 0 auto;
    float: left;
    margin-left: 0;
    margin-left: 100px;
}

#FossilValue2 {
    width: 50vh;
    height: 50vh;
    margin-top: 0px;
    margin: 0 auto;
    margin-right: 0;
    margin-right: 100px;
}

#ElectricityValue {
    width: 50vh;
    height: 50vh;
    margin-top: 0px;
    margin: 0 auto;
    float: left;
    margin-left: 0;
    margin-left: 100px;
}

#ElectricityValue2 {
    width: 50vh;
    height: 50vh;
    margin-top: 0px;
    margin: 0 auto;
    margin-right: 0;
    margin-right: 100px;
}

#DesulfurizationValue {
    width: 50vh;
    height: 50vh;
    margin-top: 0px;
    margin: 0 auto;
    float: left;
    margin-left: 0;
    margin-left: 100px;
}

#DesulfurizationValue2 {
    width: 50vh;
    height: 50vh;
    margin-top: 0px;
    margin: 0 auto;
    margin-right: 0;
    margin-right: 100px;
}

#BiomassValue {
    width: 50vh;
    height: 50vh;
    margin-top: 0px;
    margin: 0 auto;
    float: left;
    margin-left: 0;
    margin-left: 100px;
}

#BiomassValue2 {
    width: 50vh;
    height: 50vh;
    margin-top: 0px;
    margin: 0 auto;
    margin-right: 0;
    margin-right: 100px;
}

#ProcessValue {
    width: 50vh;
    height: 50vh;
    margin-top: 0px;
    margin: 0 auto;
    float: left;
    margin-left: 0;
    margin-left: 100px;
}

#ProcessValue2 {
    width: 50vh;
    height: 50vh;
    margin-top: 0px;
    margin: 0 auto;
    margin-right: 0;
    margin-right: 100px;
}

.fileButton{
    position: fixed;
    bottom: 2%;
    right: 2%
}
.gotohistorybutton{
    position: fixed;
    bottom :2% ;
    right: 10%;
}
</style>