<template>

<!-- 返回栏 -->
<van-nav-bar title="资产标签" left-text="返回" left-arrow  @click-left="onClickLeft">
  <template #right>
    <van-icon name="search" size="18" @click="showPopup"/>
  </template>
</van-nav-bar>

        <div class="asset-management">
          <van-popup v-model:show="show" :style="{ padding: '64px' }">
                <div class="search-bar">
                        <van-field v-model="searchQuery.assetCode" label="资产编号" placeholder="请输入" />
                        <van-field v-model="searchQuery.assetName" label="资产名称" placeholder="请输入" />
                        <van-field v-model="searchQuery.department" label="使用部门" placeholder="请选择" />
                        <van-button type="primary" @click="onSearch">查询</van-button>
                        <van-button @click="resetSearch">重置</van-button>
                </div>
          </van-popup>
          
      
          <!-- 资产列表 -->
          <van-list v-if="paginatedAssets.length > 0" finished="false" class="asset-list">
            <div v-for="(asset, index) in paginatedAssets" :key="index" class="asset-item">
                <div>
                    <p><strong>资产编号:</strong> {{ asset.code }}</p>
                    <p><strong>资产名称:</strong> {{ asset.name }}</p>
                    <p><strong >使用部门:</strong> {{ asset.department }}</p>
                </div>
              <van-button size="small" type="info" @click="showQRCode(asset)">查看二维码</van-button>
            </div>
          </van-list>
      
          <!-- 分页 -->
          <van-pagination
            v-model="currentPage"
            :page-count="pageCount"
            mode="simple"
            :items-per-page="itemsPerPage"
          />
      
          <!-- 二维码弹窗 -->
          <van-dialog v-model:show="showDialog" title="资产详情">
            <div style="margin-left: 10px">
              <p><strong>资产编号:</strong> {{ selectedAsset.code }}</p>
              <p><strong>资产名称:</strong> {{ selectedAsset.name }}</p>
              <p><strong>资产位置:</strong> {{ selectedAsset.location }}</p>
              <img :src="selectedAsset.qrCode" alt="二维码" class="qr-code" />
            </div>
          </van-dialog>
        </div>
      </template>
      
  <script setup>
import { ref, computed } from 'vue';
import { Field, Button, Dialog, Pagination, List } from 'vant';
const show = ref(false);
   
const showPopup = () => {
show.value = true;
};

const onClickLeft = () => history.back();
// 搜索条件
const searchQuery = ref({
  assetCode: '',
  assetName: '',
  department: ''
});

// 示例资产数据
const assets = ref([
  { code: 'ZC29138223', name: '惠普打印机', department: '综合部', location: '仓库A', qrCode: 'path/to/qrcode1.png' },
  { code: 'ZC29138224', name: '联想电脑', department: '财务部', location: '办公室B', qrCode: 'path/to/qrcode2.png' },
  // 添加更多示例数据
]);

// 分页设置
const currentPage = ref(1);
const itemsPerPage = ref(5);

// 计算分页后的资产列表
const paginatedAssets = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredAssets.value.slice(start, end);
});

// 计算过滤后的资产列表
const filteredAssets = computed(() => {
  return assets.value.filter(asset => {
    return (
      (!searchQuery.value.assetCode || asset.code.includes(searchQuery.value.assetCode)) &&
      (!searchQuery.value.assetName || asset.name.includes(searchQuery.value.assetName)) &&
      (!searchQuery.value.department || asset.department.includes(searchQuery.value.department))
    );
  });
});

// 总页数
const pageCount = computed(() => {
  return Math.ceil(filteredAssets.value.length / itemsPerPage.value);
});

// 查询功能
const onSearch = () => {
  currentPage.value = 1; // 每次查询重置到第一页
};

// 重置功能
const resetSearch = () => {
  searchQuery.value = { assetCode: '', assetName: '', department: '' };
  currentPage.value = 1;
};

// 资产详情和二维码
const showDialog = ref(false);
const selectedAsset = ref({});
const showQRCode = (asset) => {
  selectedAsset.value = asset;
  showDialog.value = true;
};

</script>

<style scoped>
/* 搜索栏样式 */
.search-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

/* 资产列表布局 */
.asset-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* 每列最小200px */
  gap: 10px; /* 卡片间距 */
}

.asset-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  font-size: 12px; /* 调小字体大小 */
  line-height: 0.8;
  background: #fff;
}

/* 内容与按钮的布局 */
.asset-info {
  display: flex;
  justify-content: space-between; /* 左右对齐 */
  align-items: center; /* 垂直居中 */
}

.asset-info p {
  margin: 0;
}

/* 按钮样式 */
.asset-info .van-button {
  font-size: 10px; /* 调小按钮字体大小 */
  white-space: nowrap; /* 避免按钮文字换行 */
  padding: 4px 8px; /* 缩小按钮内边距 */
}

.van-nav-bar{
    margin-bottom: 10px;
}
</style>