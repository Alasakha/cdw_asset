<template>
    <div class="filter-container">
      <van-field v-model="filters.applicationId" label="申请编号" placeholder="输入申请编号" />
      <div v-if="showAdvancedFilters" class="advanced-filters">
        <van-field v-model="filters.applicant" label="申请人" placeholder="输入申请人" />
        <van-field v-model="filters.assetName" label="资产名称" placeholder="输入资产名称" />
        <van-field v-model="filters.department" label="所属部门" placeholder="选择部门" is-link readonly  />
        <van-field v-model="filters.status" label="领用状态" placeholder="选择状态" is-link readonly @click="showStatusPicker = true"  />
        <van-field v-model="filters.date" label="选择日期" placeholder="选择日期" is-link readonly @click="showPicker=true" />
      </div>
      <div class="filter-buttons">
        <van-button type="primary" size="small" @click="searchAssets">查询</van-button>
        <van-button type="default" size="small" @click="resetFilters">重置</van-button>
        <van-button type="text" size="small" @click="toggleAdvancedFilters">
          {{ showAdvancedFilters ? "收起" : "展开" }}
        </van-button>
      </div>
    </div>

<van-popup v-model:show="showPicker" position="bottom">
  <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" />
</van-popup>

    <!-- 状态选择弹窗 -->
    <van-popup v-model:show="showStatusPicker" position="bottom">
      <van-picker
        :columns="statusOptions"
         @confirm="onStatusConfirm"
        @cancel="showStatusPicker = false"
        
      />
    </van-popup>

</template>



  <script setup>
  import { ref, defineProps } from "vue";
  const showStatusPicker = ref(false); // 控制状态选择弹窗的显示
  const filters = ref({ 
    applicationId: "", 
    applicant: "",
    assetName: "",
    department: "",
    status: "",
    date: null, // 初始值为null
  });
  const showAdvancedFilters = ref(false);
  const showPicker = ref(false);
  
  const { onSearch, onReset } = defineProps(["onSearch", "onReset"]);
  
  const searchAssets = () => {
    onSearch(filters.value);
  };
  
  const resetFilters = () => {
    filters.value = {
      applicationId: "",
      applicant: "",
      assetName: "",
      department: "",
      status: "",
      date: null,
    };
    onReset();
  };
  
  const toggleAdvancedFilters = () => {
    showAdvancedFilters.value = !showAdvancedFilters.value;
  };

  const onConfirm = ({ selectedValues }) => {
  // 选中的日期会以数组的形式返回，例如 [2024, 11, 24]
  // 格式化日期为字符串，例如 '2024/11/24'
  filters.value.date = selectedValues.join('/');
  showPicker.value = false;
};

// 状态选项
const statusOptions = [
  { text: "未规划", value: "未规划" },
  { text: "规划", value: "规划" },
];
const onStatusConfirm = ({ selectedOptions }) => {
     filters.value.status = selectedOptions[0]?.text;
     showStatusPicker.value = false;
    };
</script>
      
<style scoped>
.filter-container {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.advanced-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-buttons {
  display: flex;
  gap: 8px;
}
</style>