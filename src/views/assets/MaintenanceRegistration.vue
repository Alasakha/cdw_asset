
<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="设备维护" left-text="返回" left-arrow @click-left="onClickLeft" />

    <!-- 搜索框 -->
    <van-search
      v-model="searchValue"
      placeholder="请输入设备编号或名称"
      show-action
      @clear="clearSearch"
    />

    <!-- 列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="list-container"
    >
      <van-cell
        v-for="(item, index) in filteredDevices"
        :key="index"
        :title="`设备编号: ${item.deviceCode}`"
        :label="`设备名称: ${item.deviceName}`"
      >
        <!-- 维护状态和按钮 -->
        <template #default>
          <div class="status-and-actions">
            <div class="status-text">
              <b>维护状态：</b>{{ item.status }}
            </div>
            <div class="action-buttons">
              <van-button
                size="small"
                type="primary"
                @click="viewDetails(item)"
                class="action-btn"
              >
                查看
              </van-button>
              <van-button
                size="small"
                type="danger"
                @click="onCancelClick(item)"
                class="action-btn"
              >
                撤销
              </van-button>
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>

    <!-- 增加按钮 -->
    <van-button type="primary" block @click="openNewPage">增加</van-button>

    <!-- 详情弹窗 -->
    <van-popup v-model:show="showDetails" position="bottom" :style="{ height: '60%' }">
      <div class="details-popup">
        <h3>设备详情</h3>
        <p><b>设备编号：</b>{{ selectedDevice.deviceCode }}</p>
        <p><b>设备名称：</b>{{ selectedDevice.deviceName }}</p>
        <p><b>设备类型：</b>{{ selectedDevice.deviceType }}</p>
        <p><b>维护时间：</b>{{ selectedDevice.maintenanceDate }}</p>
        <p><b>维护人员：</b>{{ selectedDevice.staff }}</p>
        <p><b>维护状态：</b>{{ selectedDevice.status }}</p>
        <van-button type="primary" block @click="showDetails = false">关闭</van-button>
      </div>
    </van-popup>

    <!-- 撤销确认弹窗 -->
    <van-dialog
      v-model:show="showCancelConfirm"
      title="确认撤销"
      show-cancel-button
      confirm-button-text="确认"
      cancel-button-text="取消"
      @confirm="confirmCancel"
    >
      是否确定要撤销维护状态为 "{{ canceledDevice.deviceName }}" 的设备？
    </van-dialog>

    <!-- 新增页面 -->
    <van-popup v-model:show="showNewPage" position="bottom" :style="{ height: '100%' }">
      <van-nav-bar
        title="新增设备维护"
        left-text="关闭"
        left-arrow
        @click-left="closeNewPage"
      />

      <van-form @submit="submitForm">
        <!-- 表单 -->
        <van-cell-group>
          <van-field label="维护编号" v-model="formData.code" placeholder="自动生成" disabled />
          <van-field
            label="维护时间"
            is-link
            readonly
            v-model="formData.time"
            placeholder="请选择"
            @click="openDatePicker"
          />
          <van-field label="维护人员" v-model="formData.staff" placeholder="请输入" />
          <van-field label="维护花费" v-model="formData.cost" placeholder="请输入" type="number" />
          <van-field
            label="维护状态"
            v-model="formData.status"
            placeholder="请输入"
            type="textarea"
            rows="2"
          />
        </van-cell-group>
        
 <!-- 日期选择器 -->
 <van-picker-group
  v-show="showDatePicker"
  title="预约时间"
  :tabs="['开始时间', '结束时间']"
  @confirm="onConfirm"
  @cancel="onCancel"
>
  <van-time-picker v-model="startTime" />
  <van-time-picker v-model="endTime" />
</van-picker-group>

        <!-- 上传图片 -->
        <van-uploader v-model:file-list="uploadedImages" multiple />

        <!-- 操作按钮 -->
        <div class="button-group">
          <van-button type="primary" block native-type="submit">保存提交</van-button>
          <van-button type="default" block @click="closeNewPage">取消</van-button>
        </div>
      </van-form>
    </van-popup>
  </div>




  
</template>


<script setup>
import { ref, computed } from "vue";
import { showToast } from 'vant';
const devices = ref([
  { id: 1, deviceCode: "SB20231101", deviceName: "路由器", deviceType: "网络设备", maintenanceDate: "2024-11-15", staff: "张三", status: "正常" },
  { id: 2, deviceCode: "SB20231102", deviceName: "交换机", deviceType: "网络设备", maintenanceDate: "2024-11-20", staff: "李四", status: "维护中" },
  { id: 3, deviceCode: "SB20231103", deviceName: "监控摄像头", deviceType: "监控设备", maintenanceDate: "2024-11-25", staff: "王五", status: "待维修" },
]);

const searchValue = ref("");
const showDetails = ref(false);
const selectedDevice = ref({});
const loading = ref(false);
const finished = ref(true);

const showCancelConfirm = ref(false);
const canceledDevice = ref({});

const showNewPage = ref(false);
const formData = ref({
  code: "自动生成",
  time: "",
  staff: "",
  cost: "",
  status: "",
});
const uploadedImages = ref([]);
const showDatePicker = ref(false);
const startTime = ref(['12', '00']);
const endTime = ref(['12', '00']);
// 控制日期选择器显示/隐藏
const onConfirm = () => {
  showToast(`${startTime.value.join(":")} ${endTime.value.join(":")}`);
  showDatePicker.value = false; // 确定后隐藏
};

const onCancel = () => {
  showToast("cancel");
  showDatePicker.value = false; // 取消后隐藏
};

// 打开日期选择器
const openDatePicker = () => {
  showDatePicker.value = true; // 显示日期选择器
};
// 关闭新增页面
const closeNewPage = () => {
  showNewPage.value = false; // 取消时隐藏日期选择器
};


// 搜索设备
const filteredDevices = computed(() => {
  if (!searchValue.value) return devices.value;
  return devices.value.filter(
    (item) =>
      item.deviceCode.includes(searchValue.value) ||
      item.deviceName.includes(searchValue.value)
  );
});

// 查看详情
const viewDetails = (item) => {
  selectedDevice.value = item;
  showDetails.value = true;
};

// 打开新增页面
const openNewPage = () => {
  showNewPage.value = true;
};



// 提交新增表单
const submitForm = () => {
  devices.value.push({
    id: Date.now(),
    deviceCode: `SB${Date.now()}`,
    deviceName: formData.value.staff, // 示例逻辑
    deviceType: "其他",
    maintenanceDate: formData.value.time,
    staff: formData.value.staff,
    status: formData.value.status,
  });
  showNewPage.value = false;
};

// 撤销确认
const confirmCancel = () => {
  const index = devices.value.findIndex((device) => device.id === canceledDevice.value.id);
  if (index !== -1) {
    devices.value.splice(index, 1);
  }
  showCancelConfirm.value = false;
};

const onClickLeft = () => history.back();
const clearSearch = () => searchValue.value =''

</script>
      
 <style scoped>
 .list-container {
   padding: 16px;
 }
 .status-and-actions {
   margin-top: 8px;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
 }
 .status-text {
   margin-bottom: 8px;
 }
 .action-buttons {
   display: flex;
   gap: 8px;
 }
 .details-popup {
   padding: 16px;
 }
 .details-popup h3 {
   margin-bottom: 16px;
 }
 .action-btn {
  transition: all 0.3s;
}

.action-btn:hover {
  transform: scale(1.1);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
}
 </style>
      