<template>
    <h1 style="text-align: center;color: #79BBFF;">民航企业</h1>
    <div class="contentdiv" v-for="key in allkey">
        <el-card style="margin-bottom: 40px;">
            <div class="title">{{ key.title }}</div>
            <el-button style="margin-bottom: 20px;" @click="key.dialogVisible = true" v-show="key.show1">{{
        key.checkedtitle
    }}</el-button>
            <el-button style="margin-bottom:20px ;" v-show="key.show3" @click="changeRan">{{ key.checkedtitle
                }}</el-button>
            <el-radio-group v-model="key.selectvalue" v-show="key.show2">
                <el-radio v-for="a in key.select" :label="a.checkedvalue">{{ a.checkedlabel }}</el-radio>
            </el-radio-group>
            <el-form-item v-if="key.show2" :label="key.optionTitle" style="margin-top: 20px;">
                <el-input v-model="key.optionValue" placeholder="请输入数字" clearable />
            </el-form-item>
            <el-form-item v-if="key.show2" :label="key.option2Title" style="margin-top: 20px;">
                <el-input v-model="key.option2Value" placeholder="请输入数字" clearable />
            </el-form-item>
            <el-form :inline="true" class="demo-form-inline">
                <el-card v-for="a in key.checkedoptions" v-show="a.checkedvalue" style="margin-bottom: 20px;">
                    <div style="margin-bottom: 10px;font-weight: bolder;">{{ a.checkedlabel }}</div>
                    <el-form-item v-for="k in a.option" :label="k.optionTitle">
                        <el-input v-model="k.optionValue" placeholder="请输入数字" clearable />
                    </el-form-item>
                    <br>
                    <p v-show="!key.show3" style="float: left;margin-right: 10px;color: #79BBFF;">CO₂排放量为</p>
                    <p v-show="!key.show3" style="float: left;color: #79BBFF;">{{ a.CO2value }}</p>
                </el-card>
            </el-form>
            <p style="float: left;margin-right: 10px;color: #79BBFF;" v-if="key.show2 || key.show3">CO₂排放量为</p>
            <p style="float: left;color: #79BBFF;" v-if="key.show2 || key.show3">{{ key.CO2value }}</p>
        </el-card>
        <el-dialog v-model="key.dialogVisible" :title="key.intitle" width="1000">
            <div>
                <el-checkbox :checked="skey.checkedvalue" v-for="skey in key.checkedoptions" v-model="skey.checkedvalue"
                    :label="skey.checkedlabel" size="large" border style="margin-bottom: 20px;" />
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="key.dialogVisible = false">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
    <div class="contentdiv">
        <el-card style="margin-bottom: 40px;">
            <el-form-item label="年度碳排放配额数据：">
                <el-input v-model="quota" placeholder="请输入数字" clearable />
            </el-form-item>
            <el-form-item label="请上传相应的文件："></el-form-item>
            <el-upload class="upload-demo" drag ref="upload" :auto-upload="false" :limit="2" :on-change="changeFile"
                :before-upload="handleBeforeUpload" :before-remove="handleBeforeRemove">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    请将文件拖拽在此 <em> 或者点击上传文件</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        请上传pdf类型文件
                    </div>
                </template>
            </el-upload>

        </el-card>
    </div>
    <el-button type="primary" class="btn" size="large" style="right: 280px;" @click="historyJump">查看记录</el-button>
    <el-button type="primary" class="btn" size="large" style="right:160px;"
        @click="getCarbpnemissions(1)">保存提交</el-button>
    <el-button type="primary" class="btn" size="large" style="right: 40px;"
        @click="getCarbpnemissions(0)">计算结果</el-button>
</template>

<style>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}

.contentdiv {
    margin-left: 5%;
    margin-right: 5%;
}

.title {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 20px;
}

.btn {
    position: fixed;
    bottom: 2%;
}
</style>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { setFossilFuel, setBiomassBlendedFuel, setElectricityAndHeat, setInformation, uploadFile } from '@/apis/accountapi';
import { ElMessage } from 'element-plus'
import { nanoid } from 'nanoid'
import historyJump from '@/hooks/useJumproute';
const enid = "Aviation"
let fileList: File[] = [];
const quota = ref("")
let file = ref();
let urlList: any[] = []
const changeFile = (uploadFile: File, uploadFiles: File[]) => {
    fileList = uploadFiles
    // console.log(fileList)
}

const handleBeforeRemove = (removeFile: File, uploadFiles: File[]) => {
    fileList = uploadFiles
    // console.log(fileList)
}

const handleBeforeUpload = (file: File) => {
    // console.log(file)
}

//上传文件
const submitUpload = async (upfile: any) => {
    let formData = new FormData();
    formData.append("file", upfile.raw);
    // console.log(formData)
    await uploadFile(formData).then(async response => {
        // console.log(response)
        urlList.push(response?.data.data)
    }).catch(error => {
        console.error(error)
        ElMessage({
            showClose: true,
            message: '文件上传失败',
            type: 'success',
        })
    })
}

const getCarbpnemissions = async (is_store: number) => {
    urlList = []
    let oneid = nanoid(20)
    if (is_store == 1) {
        if (quota.value !== '') {
            await Promise.all(fileList.map(item => submitUpload(item)));
        }
        // console.log(urlList.length)
        if(urlList.length != 2){
            ElMessage({
                showClose: true,
                message: '证明文件不足',
                type: 'warning',
            })
            return
        }
        await setInformation({
            linked_id: oneid,
            annual_ce_quota: parseFloat(quota.value),
            file_url_a: urlList[0],
            file_url_b: urlList[1]
        }).then(response => {
            console.log(response)
            ElMessage({
                showClose: true,
                message: '文件上传成功',
                type: 'success',
            })
        }).catch(error => {
            console.log(error)
            ElMessage({
                showClose: true,
                message: '文件上传失败',
                type: 'success',
            })
        })
    }
    allkey.forEach(async item => {
        if (item.checkedoptions !== undefined) {
            item.checkedoptions.forEach(async ele => {
                if (ele.checkedvalue == true) {
                    //第一个
                    if (allkey.indexOf(item) == 0) {
                        ele.option.forEach((op, index) => {
                            if (op.optionValue !== '') {
                                switch (index) {
                                    case 1:
                                        ele.defalutdiwei! = parseFloat(op.optionValue!); break
                                    case 2:
                                        ele.defaluthantan! = parseFloat(op.optionValue!); break
                                    case 3:
                                        ele.defaultyanghua! = parseFloat(op.optionValue!); break
                                }
                            }
                        })
                        if (ele.option[0].optionValue !== '') {
                            await setFossilFuel({
                                linked_id: oneid,
                                is_store: is_store,
                                enterprise_id: enid,
                                kind: ele.checkedlabel,
                                net_consumption: parseFloat(ele.option[0].optionValue!),
                                average_low_calorific_value: ele.defalutdiwei!,
                                carbon_content_per_unit_calorific_value: ele.defaluthantan!,
                                carbon_oxidation_rate: ele.defaultyanghua!,
                            }).then(response => {
                                let message = "计算完毕"
                                if (is_store === 1) {
                                    message = "保存完毕"
                                }
                                ElMessage({
                                    showClose: true,
                                    message: message,
                                    type: 'success',
                                })
                                ele.CO2value = response?.data.data
                                // 处理请求成功的响应
                                // console.log(response);
                            })
                                .catch(error => {
                                    // 处理请求失败的错误
                                    // console.error(error);
                                });
                        }
                    }
                    //第二个 
                }
            });
            if (allkey.indexOf(item) == 1 && item.checkedoptions[0].option[0].optionValue !== '' && item.checkedoptions[1].option[0].optionValue !== '') {
                item.CO2value = 0
                item.checkedoptions.forEach(async element => {
                    // console.log(element)
                    await setBiomassBlendedFuel({
                        linked_id: oneid,
                        is_store: is_store,
                        enterprise_id: enid,
                        kind: element.checkedlabel,
                        biomass_content: parseFloat(element.option[2].optionValue!),
                        net_consumption: parseFloat(element.option[0].optionValue!),
                        average_low_calorific_value: parseFloat(element.option[1].optionValue!),
                        carbon_content_per_unit_calorific_value: parseFloat(element.option[3].optionValue!),
                        carbon_oxidation_rate: parseFloat(element.option[4].optionValue!)
                    }).then(response => {
                        // 处理请求成功的响应
                        let message = "计算完毕"
                        if (is_store === 1) {
                            message = "保存完毕"
                        }
                        ElMessage({
                            showClose: true,
                            message: message,
                            type: 'success',
                        })
                        // console.log(response);
                        item.CO2value += response?.data.data
                    })
                        .catch(error => {
                            // 处理请求失败的错误
                            // console.error(error);
                        });
                });
            }
        } else {
            //第三个
            item.select!.forEach((ele) => {
                // console.log(ele)
                if (ele.checkedvalue === item.selectvalue) {
                    item.finalFactor = ele.factor
                }
            })
            // console.log(item);
            if (item.optionValue !== '') {
                await setElectricityAndHeat({
                    linked_id: oneid,
                    is_store: is_store,
                    enterprise_id: enid,
                    kind_electricity: item.selectvalue!,
                    emission_factor_electricity: item.finalFactor!,
                    net_purchase_of_electricity: parseFloat(item.optionValue!),
                    net_purchase_of_heat: parseFloat(item.option2Value!),
                    emission_factor_heat: item.finalFactor2!,
                }).then(response => {
                    // 处理请求成功的响应
                    let message = "计算完毕"
                    if (is_store === 1) {
                        message = "保存完毕"
                    }
                    ElMessage({
                        showClose: true,
                        message: message,
                        type: 'success',
                    })
                    item.optionValue = response?.data.data
                    // console.log(response);
                })
                    .catch(error => {
                        // 处理请求失败的错误
                        // console.error(error);
                    });
            }
        }
    })
}

const changeRan = () => {
    let key = allkey[1]
    let index = ++key.indexNumber!
    if (index % 2 == 1) {
        key.checkedtitle = "有燃料添加"
    } else {
        key.checkedtitle = "无燃料添加"
    }
    key.checkedoptions!.forEach((option) => {
        option.checkedvalue = !option.checkedvalue
    })
}

const allkey = reactive([
    {
        show1: true,
        dialogVisible: false,
        title: '化石燃料燃烧排放',
        checkedtitle: '选择燃料种类',
        intitle: '请添加燃料种类',
        checkedoptions: [
            {
                checkedlabel: "无烟煤",
                checkedvalue: true,
                CO2value: 0,
                defalutdiwei: 23.2,
                defaluthantan: 0.0278,
                defaultyanghua: 0.94,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "烟煤",
                checkedvalue: true,
                CO2value: 0,
                defalutdiwei: 22.3,
                defaluthantan: 0.0256,
                defaultyanghua: 0.93,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "褐煤",
                checkedvalue: true,
                CO2value: 0,
                defalutdiwei: 14.8,
                defaluthantan: 0.0278,
                defaultyanghua: 0.96,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "型煤",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 17.5,
                defaluthantan: 0.0336,
                defaultyanghua: 0.90,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "焦炭",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 28.4,
                defaluthantan: 0.0288,
                defaultyanghua: 0.93,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "洗中煤",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 8.363,
                defaluthantan: 0.0254,
                defaultyanghua: 0.93,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "洗精煤",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 26.344,
                defaluthantan: 0.0254,
                defaultyanghua: 0.93,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "煤泥",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 10.454,
                defaluthantan: 0.0294,
                defaultyanghua: 0.94,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "原油",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 41.8,
                defaluthantan: 0.0201,
                defaultyanghua: 0.98,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "汽油",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 43.1,
                defaluthantan: 0.0189,
                defaultyanghua: 0.98,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "柴油",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 42.7,
                defaluthantan: 0.0202,
                defaultyanghua: 0.98,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "一般煤油",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 43.1,
                defaluthantan: 0.0196,
                defaultyanghua: 0.98,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "燃料油",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 41.8,
                defaluthantan: 0.0210,
                defaultyanghua: 0.98,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "煤焦油",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 33.5,
                defaluthantan: 0.0220,
                defaultyanghua: 0.98,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "液化天然气",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 51.4,
                defaluthantan: 0.0153,
                defaultyanghua: 0.99,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "液化石油气 ",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 50.2,
                defaluthantan: 0.0172,
                defaultyanghua: 0.99,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "其他石油产品",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 40.9,
                defaluthantan: 0.0200,
                defaultyanghua: 0.98,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "柴油",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 42.65,
                defaluthantan: 0.0202,
                defaultyanghua: 0.99,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "石脑油",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 44.5,
                defaluthantan: 0.020,
                defaultyanghua: 0.98,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "石焦油",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 32.5,
                defaluthantan: 0.0275,
                defaultyanghua: 0.98,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "天然气",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 0.03893,
                defaluthantan: 0.0153,
                defaultyanghua: 0.99,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "水煤气",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 0.001045,
                defaluthantan: 0.0122,
                defaultyanghua: 0.99,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "焦炉煤气",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 0.01735,
                defaluthantan: 0.0136,
                defaultyanghua: 0.99,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "其他煤气",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 0.01576,
                defaluthantan: 0.0122,
                defaultyanghua: 0.99,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "炼厂干气",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 0.00461,
                defaluthantan: 0.0182,
                defaultyanghua: 0.99,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "发生炉煤气",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 0.00523,
                defaluthantan: 0.01196,
                defaultyanghua: 0.995,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "重油催化裂解煤气",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 0.019235,
                defaluthantan: 0.01196,
                defaultyanghua: 0.995,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "重油热裂解煤气",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 0.035544,
                defaluthantan: 0.0122,
                defaultyanghua: 0.995,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "压力气化煤气",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 0.015054,
                defaluthantan: 0.0122,
                defaultyanghua: 0.995,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "高炉煤气",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 0.0033,
                defaluthantan: 0.0708,
                defaultyanghua: 0.995,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        // optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            },
            {
                checkedlabel: "转炉煤气",
                checkedvalue: false,
                CO2value: 0,
                defalutdiwei: 0.0084,
                defaluthantan: 0.0496,
                defaultyanghua: 0.99,
                option: [
                    {
                        optionTitle: '净消耗量（t，Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热量（GJ/t，GJ/Nm³）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳氧化率（%）',
                        optionValue: '',
                    }
                ]
            }
        ],
    },
    {
        show3: true,
        dialogVisible2: false,
        title: '生物质混合燃料燃烧排放',
        checkedtitle: '无燃料添加',
        indexNumber: 0,
        CO2value: 0,
        checkedoptions: [
            {
                kind: "C",
                checkedlabel: '混合燃料（国内）',
                CO2value: 0,
                checkedvalue: true,
                defalutdiwei: 23.2,
                defaluthantan: 0.0278,
                defaultyanghua: 0.94,
                option: [
                    {
                        optionTitle: '消耗量（t）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热值（GJ/t）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '生物质含量（%）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳糖化率（%）',
                        optionValue: '',
                    },
                ]
            },
            {
                kind: "F",
                checkedlabel: '混合燃料（国际）',
                finalfactor: 0.52197,
                checkedvalue: true,
                option: [
                    {
                        optionTitle: '消耗量（t）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '低位发热值（GJ/t）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '生物质含量（%）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '单位热值含碳量（tc/GJ）',
                        optionValue: '',
                    },
                    {
                        optionTitle: '碳糖化率（%）',
                        optionValue: '',
                    },
                ]
            },
        ],
    },
    {
        show2: true,
        title: '净购入电力量',
        selectTitle: '所在区域电网',
        selectvalue: '华北区域电网',
        finalFactor: 0,
        select: [
            {
                checkedlabel: '华北区域电网',
                checkedvalue: '华北区域电网',
                factor: 0.8843
            },
            {
                checkedlabel: '东北区域电网',
                checkedvalue: '东北区域电网',
                factor: 0.7769
            },
            {
                checkedlabel: '华东区域电网',
                checkedvalue: '华东区域电网',
                factor: 0.7035
            },
            {
                checkedlabel: '华中区域电网',
                checkedvalue: '华中区域电网',
                factor: 0.5257
            },
            {
                checkedlabel: '西北区域电网',
                checkedvalue: '西北区域电网',
                factor: 0.6671
            },
            {
                checkedlabel: '南方区域电网',
                checkedvalue: '南方区域电网',
                factor: 0.5271
            },

        ],
        optionTitle: '净购入电力量（Mwh）',
        optionValue: '',
        option2Title: '净购入热力值（GJ）',
        option2Value: '',
        finalFactor2: 0.11,
        CO2value: 0,
    }
])


</script>
