<template>
  <el-descriptions
    class="margin-top"
    title="余额信息"
    :column="1"
    :size="size"
    border
  >
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <user />
          </el-icon>
          用户地址
        </div>
      </template>
      {{ formData.username }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <office-building />
          </el-icon>
          企业
        </div>
      </template>
      {{
        formData.username == "0x0000000000000000000000000000000000000000"
          ? "用户未上传碳报告"
          : formData.enid
      }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <tickets />
          </el-icon>
          账户状态
        </div>
      </template>
      <el-tag size="small">{{
        formData.username == "0x0000000000000000000000000000000000000000"
          ? "用户未上传碳报告"
          : "正常"
      }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <tickets />
          </el-icon>
          碳额度
          <el-button type="text" @click="carbonDialogVisible = true">
            点击查看
          </el-button>
        </div>
      </template>
      <template v-if="showCarbon">
        {{ formData.Carbon_Coin }}
      </template>
      <template v-else>
        ****
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <office-building />
          </el-icon>
          稳定币余额
          <el-button type="text" @click="stableDialogVisible = true">
            点击查看
          </el-button>
        </div>
      </template>
      <template v-if="showStable">
        {{ formData.Stable_Coin }}
      </template>
      <template v-else>
        ****
      </template>
    </el-descriptions-item>
  </el-descriptions>
  <el-dialog v-model="carbonDialogVisible" title="确认显示碳额度">
    <span>您确定要显示碳额度吗？</span>
    <template #footer>
      <el-button @click="carbonDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirmShowCarbon">确认</el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="stableDialogVisible" title="确认显示稳定币余额">
    <span>您确定要显示稳定币余额吗？</span>
    <template #footer>
      <el-button @click="stableDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirmShowStable">确认</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import {
  Iphone,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from "@element-plus/icons-vue";
import router from "@/router";
import { getUser } from "@/constract/web3utils";
import { getAddress, setEnid } from "@/utils/constract";
import { ElMessage } from "element-plus";

const showCarbon = ref(false);
const showStable = ref(false);
const carbonDialogVisible = ref(false);
const stableDialogVisible = ref(false);

const confirmShowCarbon = () => {
  showCarbon.value = true;
  carbonDialogVisible.value = false;
};

const confirmShowStable = () => {
  showStable.value = true;
  stableDialogVisible.value = false;
};

let formData = reactive({
  username: "",
  enid: "",
  Stable_Coin: "",
  Carbon_Coin: "",
});

const size = ref("large");
const iconStyle = "8px";
const dialogFormVisible = ref(false);
let privatKey_input = ref("");

const onLogin = async () => {
  try {
    const alldata = await getUser(privatKey_input.value, getAddress()!);
    const data = alldata![0];
    const balance = alldata![1];
    if (typeof data === "object" && Array.isArray(data) === false) {
      const typedData = data as { [key: number]: any; __length__: number };
      formData.enid = typedData[0];
      formData.username = typedData[1];
      formData.Carbon_Coin = balance;
      formData.Stable_Coin = typedData[3];
      dialogFormVisible.value = false;
    } else {
      console.error("Invalid data format");
    }
  } catch (error) {
    ElMessage({
      showClose: true,
      message: "私钥错误",
      type: "error",
    });
  }
};

onMounted(() => {
  // dialogFormVisible.value = true
  onLogin();
});
</script>

<style scoped>
.el-descriptions {
  width: 60%;
  position: absolute;
  margin-left: 10%;
  top: 20%;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
  font-family: Helvetica, "Roboto", sans-serif;
  border-radius: 3%;
  box-shadow: 12px 12px 12px 2px #999;
}

.bottomButton {
  position: absolute;
  bottom: 20px;
  right: 30px;
}
</style>
