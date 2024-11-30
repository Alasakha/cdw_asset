<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="领用归还" left-text="返回" left-arrow @click-left="onClickLeft" />

  <SearchPanel
  v-model:filters="filters" 
    :fields="searchFields"
    :advancedFields="advancedFields"
    @search="handleSearch"
    @reset="handleReset"
  />

   <!-- 日期选择弹窗 -->
   <van-popup v-model:show="showPopup.date" position="bottom">
     <van-date-picker @confirm="onDateConfirm" @cancel="togglePopup('date')" />
   </van-popup>

   <!-- 状态选择弹窗 -->
   <van-popup v-model:show="showPopup.status" position="bottom">
     <van-picker
       :columns="statusOptions"
       @confirm="onStatusConfirm"
       @cancel="togglePopup('status')"
     />
   </van-popup>

   <!-- 部门选择弹窗 -->
   <van-popup v-model:show="showPopup.department" position="bottom">
  <van-picker
    show-toolbar
    :columns="departOptions"
    @cancel="togglePopup('department')"
    @confirm="onDepartConfirm"
  />
</van-popup>

    <AssetList :filteredAssets="filteredAssets" :onViewDetails="viewDetails" :onRegisterReturn="onRegisterReturn" />

    <!-- 增加、打印、导出 -->
    <div class="action-container">
      <van-button type="primary" block @click="openNewPage">新增</van-button>
      <van-button type="default" block >打印</van-button>
      <van-button type="default" block >导出</van-button>
    </div>

    <!-- 详情弹窗 -->
    <van-popup v-model:show="showDetails" position="bottom" :style="{ height: '60%' }">
      <div class="details-popup">
        <h3>资产详情</h3>
        <p><b>申请编号：</b>{{ selectedAsset.applicationId }}</p>
        <p><b>申请人：</b>{{ selectedAsset.applicant }}</p>
        <p><b>借用时间：</b>{{ selectedAsset.borrowingTime }}</p>
        <p><b>借用资产数量：</b>{{ selectedAsset.assetCount }}</p>
        <p><b>状态：</b>{{ selectedAsset.status }}</p>
        <van-button type="primary" block @click="showDetails = false">关闭</van-button>
      </div>
    </van-popup>
  </div>

  <!-- 新增页面 -->
  <van-popup v-model:show="showNewPage" position="bottom" :style="{ height: '100%' }"  closeable>
    <div>
    <!-- 表单部分 -->
    <van-form @submit="onSubmit">
      <!-- 申请编号 -->
      <van-field v-model="formData.applicationId" label="申请编号" placeholder="自动生成" readonly />
      
      <!-- 领用部门 -->
      <van-field v-model="formData.department" label="领用部门" placeholder="请选择" is-link @click="onSelectDepartment" />

      <!-- 领用人 -->
      <van-field v-model="formData.user" label="领用人" placeholder="请选择" is-link @click="onSelectUser" />

      <!-- 时间选择 -->
      <van-field label="借用时间" is-link>
        <template #input>
          <span @click="showStartPicker = true">{{ formData.startDate || '开始时间' }}</span> 至
          <span @click="showEndPicker = true">{{ formData.endDate || '结束时间' }}</span>
        </template>
      </van-field>

      <!-- 领用理由 -->
      <van-field v-model="formData.reason" label="领用理由" type="textarea" placeholder="请输入" />
    </van-form>
     <span>物品列表</span>
    <!-- 物品列表 -->
    <div class="item-list">
      <div v-for="(item, index) in items" :key="index" class="item">
        <van-cell title="物品名称" :value="item.name" />
        <van-cell title="规格型号" :value="item.model" />
        <van-cell title="计量单位" :value="item.unit" />
        <van-cell title="物品单价" :value="item.price" />
        <van-field v-model="item.quantity" label="领用数量" placeholder="请输入" />
      </div>
    </div>

    <div class="action-buttons">
      <van-button type="primary" @click="addItem">+ 添加物品</van-button>
      <van-button type="danger" @click="deleteItems">删除所选</van-button>
    </div>

    <!-- 保存与取消 -->
    <div class="bottom-buttons">
      <van-button type="primary" block @click="save">保存</van-button>
      <van-button block @click="cancel">取消</van-button>
    </div>
  </div>
    </van-popup>
</template>

<script setup>
import { useAssetsStore } from '../../../stores/assetsStore';  // 引入 stor
import { ref, computed ,onMounted,defineProps,defineEmits,watch } from "vue";
import AssetFilters from './AssetFilters.vue'
import AssetList from './AssetList.vue'
import SearchPanel from '../../../components/SearchPanel.vue';
import { useSearch } from '../../../hook/useSearch';
// 定义emit函数
const emit = defineEmits();
const showNewPage = ref(false)
const selectedAsset = ref({});
const showDetails = ref(false);
const assetsStore = useAssetsStore();  // 获取 store 实例
const showPopup = ref({
  date: false,
  status: false,
  depart: false,
  newPage: false,
  details: false,
});
const filters = ref({
  applicationId: '',
  applicant: '',
  assetName: '',
  department: '',
  status: '',
  date: '',
});
// 获取 assets 数据
const assets = assetsStore.assets;
const {  searchAssets, filteredAssets } = useSearch(assets);
const searchFields = [
  { key: 'applicationId', label: '申请编号', placeholder: '输入申请编号' },
];

const advancedFields = [
  { key: 'applicant', label: '申请人', placeholder: '输入申请人' },
  { key: 'department', label: '所属部门', placeholder: '选择部门', isLink: true, readonly: true, click: () => togglePopup('department') },
  { key: 'status', label: '状态', placeholder: '选择状态', isLink: true, readonly: true, click: () => togglePopup('status') },
  { key: 'date', label: '日期', placeholder: '选择日期', isLink: true, readonly: true, click: () => togglePopup('date') },
];

onMounted(()=>{
  searchAssets(filters.value)
})

const handleSearch = () => {
  console.log(filters.value)
  searchAssets(filters.value); // 调用查询方法
};

const handleReset = () => {
  filters.value = {
    applicationId: "",
    applicant: "",
    assetName: "",
    department: "",
    status: "",
    date: "",
  };
  searchAssets( filters.value); // 调用 searchAssets 方法，重新加载所有数据
};

const viewDetails = (item) => {
  selectedAsset.value = item;
  showDetails.value = true;  // 展示资产详情弹窗
};

const onRegisterReturn = (item) => {
  filteredAssets.value = filteredAssets.value.filter((asset) => asset.id != item.id);
};

const onClickLeft = () => history.back();

const openNewPage = () => {
  showNewPage.value = true
}

// 增加框里逻辑
const formData = ref({
  applicationId: '自动生成',
  department: '',
  user: '',
  data:'',
  reason: '',
});

const items = ref([
  {
    name: '惠普打印机',
    model: 'HP-5136',
    unit: '台',
    price: '1500.00',
    quantity: '',
  },
]);

const showStartPicker = ref(false);
const showEndPicker = ref(false);

const onSelectDepartment = () => {
  console.log('选择领用部门');
};

const onSelectUser = () => {
  console.log('选择领用人');
};

const addItem = () => {
  items.value.push({
    name: '',
    model: '',
    unit: '',
    price: '',
    quantity: '',
  });
};

const deleteItems = () => {
  // 删除逻辑
  items.value.pop();
};

// 状态选项（可以传入 props 或直接硬编码）
const statusOptions = [
  { text: '未规划', value: '未规划' },
  { text: '规划', value: '规划' },
];
// 状态选项（可以传入 props 或直接硬编码）
const departOptions = [
  { text: '测试部', value: '测试部' },
  { text: '技术部', value: '技术部' },
];

// 日期选择回调
const onDateConfirm = ({ selectedValues }) => {
  filters.value.date = selectedValues.join('/');
  console.log(filters.value.date)
  togglePopup('date');
  emit('update:modelValue', filters.value.date);  // 使用emit触发事件
};

// 确认状态选择
const onStatusConfirm = ({ selectedOptions }) => {
  filters.value.status = selectedOptions[0]?.text;
  togglePopup('status');
  emit('update:modelValue', filters.value.status);  // 更新父组件的状态字段
};

// 确认状态选择
const onDepartConfirm = ({ selectedOptions }) => {
  filters.value.department = selectedOptions[0]?.text;
   togglePopup('department');
  emit('update:modelValue', filters.value.department);  // 更新父组件的状态字段
};

const togglePopup = (popupName) => {
  showPopup.value[popupName] = !showPopup.value[popupName];
};
</script>

<style scoped>
.details-popup {
  padding: 16px;
}
.data_title{
  padding:15px;
  font-family: '黑体';
}
.item-list {
  margin: 16px 0;
}
.bottom-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  background: #fff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}
</style>
