<template>
  <div class="menu-page">
    <div class="title">菜单页面</div>
    <van-divider style="border-color: black;" />
    <div class="section-title">资产管理</div>
    <van-grid :column-num="3" clickable class="grid">
      <van-grid-item
        v-for="(item, index) in filteredMenuItems"
        :key="index"
        :icon="item.icon"
        :text="item.text"
        @click="goToPage(item.path)"
      />
    </van-grid>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 假设用户角色
const userRole = ref(0); // 可以从后端获取用户角色并赋值

// 菜单项数据数组，包含角色限制
const menuItems = ref([
  { icon: 'add-o', text: '资产入库', path: '/asset/asset-storage', roles: [0,1] },
  { icon: 'tag-o', text: '资产标签', path: '/asset/asset-label', roles: [0, 1] },
  { icon: 'warning-o', text: '维护提醒', path: '/maintenance-reminder', roles: [0] },
  { icon: 'edit', text: '维护登记', path: '/maintenance-registration', roles: [0, 2] },
  { icon: 'exchange', text: '领用归还', path: '/borrow-return', roles: [0, 1] },
  { icon: 'balance-o', text: '资产调拨', path: '', roles: [0, 1] },
  { icon: 'records', text: '资产盘点', path: '', roles: [0,1, 2] },
  { icon: 'gold-coin-o', text: '资产折旧', path: '', roles: [0] },
  { icon: 'after-sale', text: '资产报废', path: '', roles: [0,1] }
]);

const goToPage = (path) => {
  if (path) {
    router.push(path);
  }
};

// 基于用户角色过滤菜单项
const filteredMenuItems = computed(() => {
  return menuItems.value.filter(item => item.roles.includes(userRole.value));
});
</script>
<style scoped>
/* 页面背景 */
.menu-page {
  background-color: #f4f6f8;
  min-height: 100vh;
  padding: 15px;
}

/* 标题样式 */
.title {
  font-size: 26px;
  line-height: 34px;
  font-weight: 500;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
}

/* 小标题样式 */
.section-title {
  font-size: 15px;
  line-height: 21px;
  font-weight: 400;
  color: #969799;
  margin-bottom: 10px;
  padding-left: 5px;
}

/* 宫格样式 */
.grid {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 轻微阴影 */
}

.van-grid-item {
  padding: 10px;
  text-align: center;
}

/* 图标样式 */
.van-grid-item .van-icon {
  font-size: 28px;
  color: #009688; /* 图标主色调 */
  margin-bottom: 5px;
}

/* 文字样式 */
.van-grid-item .van-grid-item__text {
  font-size: 14px;
  color: #333;
}
</style>
