<script lang="ts" setup>
// 查看详情
import { ref } from 'vue'
let dialogVisible = ref(false)
const getDetails = () => {
    dialogVisible.value = !dialogVisible.value
}
const details_tableData_one = [
    {name:"无烟煤",min:23.2,per:0.0278,rate:94},
    {name:"烟煤",min:22.3,per: 0.0256,rate:93},
    {name:"褐煤",min:14.8,per:0.0278,rate:96},
    {name:"型煤",min:17.5,per:0.0336,rate:90},
    {name:"焦炭",min:28.4,per:0.0288,rate:93},
    {name:"洗中煤",min:8.363,per:0.0254,rate:93},
    {name:"洗精煤",min:26.344,per:0.0254,rate:93},
    {name:"煤泥",min:10.454,per: 0.0294,rate:94},

    {name:"原油",min:41.8,per:0.0201,rate:98},
    {name:"汽油",min:43.1,per:0.0189,rate:98},
    {name:"柴油",min:42.7,per:0.0202,rate:98},
    {name:"一般煤油 ",min:43.1,per:0.0196,rate:98},
    {name:"燃料油",min:41.8,per:0.0210,rate:98},
    {name:"煤焦油",min:33.5,per:0.0220,rate:98},
    {name:"液化天然气",min:51.4,per:0.0153,rate:99},
    {name:"液化石油气",min:50.2,per:0.0172,rate:99},
    {name:"其他石油产品",min:40.9,per:0.0200,rate:98},
    {name:"柴油",min:42.65,per:0.0202,rate:99},

    {name:"天然气",min:0.03893,per:0.0153,rate:99},
    {name:"水煤气",min:0.001045,per:0.0122,rate:99},
    {name:"焦炉煤气",min:0.01735,per: 0.0136,rate:99},
    {name:"其他煤气",min:0.01576,per:0.0122,rate:99},
    {name:"炼厂干气",min:0.00461,per:0.0182,rate:99},
    {name:"发生炉煤气",min:0.00523,per:0.01196,rate:99.5},
    {name:"重油催化裂解煤气",min:0.019235,per:0.01196,rate:99.5},
    {name:"重油热裂解煤气",min:0.035544,per:0.0122,rate:99.5},
    {name:"压力气化煤气",min:0.015054,per:0.0122,rate:99.5},
    {name:"高炉煤气 ",min:0.0033,per:0.0708,rate:99.5},
    {name:"转炉煤气",min:0.0084,per: 0.0496,rate:99},
    ]
const details_tableData_two = [
  {name:'CaCO3',factor:0.440},
  {name:'MgCO3',factor:0.522},
  {name:'Na2CO3',factor:0.415},
  {name:'BaCO3',factor:0.223},
  {name:'Li2CO3',factor:0.596},
  {name:'K2CO3',factor:0.318},
  {name:'SrCO3',factor:0.298},
  {name:'NaHCO3',factor:0.524},
  {name:'FeCO3',factor:0.380},
]
const details_tableData_three = [
  {name:'CaCO3(石灰石或方解石或文石)',factor:0.43971},
  {name:'MgCO3(菱镁石)',factor:0.52187},
  {name:'CaMg(CO3)2(白云石)',factor:0.47732},
  {name:'FeCO3(菱铁矿)',factor:0.37987},
  {name:'MnCO3(菱锰矿)',factor:0.38286},
  {name:'Na2CO3(碳酸钠或纯碱)',factor:0.41492},
]
</script>



<template>
     <el-button type="primary" class="getMore" @click="getDetails">查看默认值标准</el-button>
   <el-dialog
    v-model="dialogVisible"
    title="详情"
    width="auto"
  >
    <!-- 默认值表格 -->
    <span>
        1.净消耗量必须由企业自行填入；<br/>
        2.低位发热量两个选项:一是自行填入,二是使用预设的default值。<br/>
        3.单位热值含碳量两个选项：一是自行填入,二是使用预设的default值。<br/>
        4.碳氧化率默认使用default值,也可自行填入。<br/>
        5.工业生产过程排放量所有选项都为必填。<br/>
        6.净购入电量为必填。<br/>
        7.生物质混合燃料燃烧排放所有为必填,若没有使用则填无<br />
        <!-- 化石燃料燃烧排放 -->
        <h2>化石燃料燃烧排放</h2>
    <el-table :data="details_tableData_one" border style="width: 100%">
    <el-table-column prop="name" label="类型" width="auto" />
    <el-table-column prop="min" label="低位发热值(GJ/t, GJ/万Nm3)" width="auto" />
    <el-table-column prop="per" label="单位热值含碳量(tc/GJ)"width="auto"  />
    <el-table-column prop="rate" label="碳氧化率(%)"width="auto" />
    </el-table>
      <!-- 脱硫过程碳酸盐排放因子 -->
        <h2>脱硫过程碳酸盐排放因子</h2>
    <el-table :data="details_tableData_two" border style="width: 100%">
    <el-table-column prop="name" label="碳酸盐" width="auto" />
    <el-table-column prop="factor" label="排放因子(吨二氧化碳/吨碳酸盐)" width="auto" />
    </el-table>
        <!-- 碳酸盐煅烧排放因子 -->
        <h2>碳酸盐煅烧排放因子</h2>
    <el-table :data="details_tableData_three" border style="width: 100%">
    <el-table-column prop="name" label="碳酸盐" width="auto" />
    <el-table-column prop="factor" label="排放因子(吨二氧化碳/吨碳酸盐)" width="auto" />
    </el-table>
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<style>
</style>