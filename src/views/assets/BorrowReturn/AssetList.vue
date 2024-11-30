
<template>
<van-list
v-model="loading"
:finished="finished"
finished-text="没有更多了"
class="list-container"
>
<van-cell 
style="display:  block"
  v-for="(item, index) in filteredAssets"
  :key="index"
  :title="`申请编号: ${item.applicationId}`"
  :label="`申请部门: ${item.department}申请人: ${item.applicant}`"
>
  <template #default>
    <div class="status-and-actions">
      <!-- <div class="status-text">
        <b>借用时间：</b>{{ item.borrowingTime }}
      </div>
      <div class="status-text">
        <b>状态：</b>{{ item.status }}
      </div> -->
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
          type="success"
          @click="onRegisterReturn(item)"
          class="action-btn"
        >
          归还登记
        </van-button>
      </div>
    </div>
  </template>
</van-cell>
</van-list>
</template>


<script setup>
import { ref, defineProps ,onMounted} from "vue";
import { useAssetsStore } from '../../../stores/assetsStore';  // 引入 stor
const loading = ref(false);
const finished = ref(false);

const { filteredAssets, onViewDetails, onRegisterReturn } = defineProps(["filteredAssets", "onViewDetails", "onRegisterReturn"]);

const viewDetails = (item) => {
  onViewDetails(item);
};

const RegisterReturn = () =>{
  onRegisterReturn(item)
}


// 当页面加载时，自动显示所有数据
// 加载数据的处理
onMounted(() => {
  const assetsStore = useAssetsStore(); // 获取 store 实例
  const assets = assetsStore.assets;  // 获取 assets 数据

  if (assets.length === 0) {
    finished.value = true;  // 如果没有数据，标记为加载完成
  } else {
    filteredAssets.value = [...assets];  // 更新filteredAssets
    finished.value = false;  // 由于有数据，表示加载未完成
  }
  loading.value = false;  // 数据加载完成，关闭loading
});
</script>

<style scoped> 
.list-container {
  padding: 16px;
  padding-top: 0px;
}
.status-and-actions {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.action-buttons {
  display: flex;
  justify-content: space-between;
  padding: 0px;
}

</style>