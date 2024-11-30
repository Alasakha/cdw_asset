<template>
<!-- 返回栏 -->
<van-nav-bar
  title="标题"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
  <div class="asset-entry">
    <!-- 搜索框 -->
    <van-search
      v-model="searchQuery"
      placeholder="搜索资产名称"
      @search="onSearch"
      class="search-bar"
    />

    <!-- 资产列表 -->
    <van-list v-if="paginatedAssets.length > 0" finished="false">
      <van-cell
        v-for="asset in paginatedAssets"
        :key="asset.id"
        :title="asset.name"
        class="asset-item"
        @click="showAssetDetails(asset)"
      >
        <template #footer>
          <van-button size="small" type="info" @click.stop="showAssetDetails(asset)" class="btn-info"  >
            查看详情
          </van-button>
        </template>
      </van-cell>
    </van-list>

    <!-- 分页 -->
    <van-pagination v-model="currentPage" :page-count="pageCount" mode="simple" :items-per-page="itemsPerPage" />
    
    <!-- 资产详情对话框 -->
    <van-dialog v-model:show="showDialog" title="资产详情" class="asset-dialog">
      <div class="dialog-content">
        <p><strong>资产名称:</strong> {{ selectedAsset.name }}</p>
        <p><strong>资产编号:</strong> {{ selectedAsset.code }}</p>
        <p><strong>型号:</strong> {{ selectedAsset.model }}</p>
        <p><strong>入库日期:</strong> {{ selectedAsset.entryDate }}</p>
        <p><strong>数量:</strong> {{ selectedAsset.quantity }}</p>
        <p><strong>备注:</strong> {{ selectedAsset.remarks }}</p>
      </div>
    </van-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Search, Button, Dialog } from 'vant';


//返回栏
const onClickLeft = () => history.back();

// 示例资产数据
const assets = [
  { id: 1, name: '资产A', code: 'A001', model: 'Model A', entryDate: '2024-01-01', quantity: 100, remarks: '备注A' },
  { id: 2, name: '资产B', code: 'B001', model: 'Model B', entryDate: '2024-02-01', quantity: 50, remarks: '备注B' },
  { id: 3, name: '资产C', code: 'C001', model: 'Model C', entryDate: '2024-03-01', quantity: 200, remarks: '备注C' },
];

// 响应式数据
const searchQuery = ref('');
const selectedAsset = ref({});
const showDialog = ref(false);
const currentPage = ref(1)
const itemsPerPage = ref(2)

// 当前页显示的资产数据
const paginatedAssets = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredAssets.value.slice(start, end);
});

// 总页数
const pageCount = computed(() => {
  return Math.ceil(filteredAssets.value.length / itemsPerPage.value);
});

// 过滤资产列表
const filteredAssets = computed(() => {
  return assets.filter(asset =>
    asset.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// 显示资产详细信息
const showAssetDetails = (asset) => {
  selectedAsset.value = asset;
  showDialog.value = true;
};
</script>

<style scoped>
.asset-entry {
  padding: 20px;
  background-color: #f4f7fc;
}

.search-bar {
  margin-bottom: 15px;  /* 缩小搜索框的下方间距 */
}

.asset-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px; /* 缩小卡片之间的间距 */
  padding: 12px; /* 调小卡片内的内边距 */

}

.asset-item .van-cell__title {
  font-size: 14px; /* 缩小标题字体 */
  font-weight: bold;
  color: #333;
}

.asset-item .van-cell__label {
  font-size: 12px; /* 缩小标签字体 */
  color: #999;
}

.asset-item .btn-info {
  margin-top: 8px;  /* 调整按钮和内容的距离 */
}

.asset-dialog .van-dialog__body {
  padding: 20px;
  line-height: 1.6;
  font-size: 14px;
  color: #555;
}

.asset-dialog .dialog-content {
  padding: 8px; /* 调整对话框内容的内边距 */
}

.asset-dialog p {
  margin: 6px 0; /* 减少段落之间的间距 */
}

.asset-dialog strong {
  color: #333;
}

.van-dialog {
  width: 80%;
  max-width: 500px;
}

.search-bar {
  border-radius: 20px; /* 圆角 */
  background-color: #f2f2f2; /* 背景色 */
  padding: 5px 15px; /* 内边距调整 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 加入轻微阴影 */
}
</style>