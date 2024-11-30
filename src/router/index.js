import { createRouter, createWebHistory } from 'vue-router';
import AssetStorage from '../views/assets/AssetStorage.vue';   // 资产入库页面
import Home from '../views/Menu.vue'
import AssetLabel from '../views/assets/AssetLabel.vue';       // 资产标签页面
import MaintenanceReminder from '../views/assets/MaintenanceReminder.vue'; // 维护提醒页面
import MaintenanceRegistration from '../views/assets/MaintenanceRegistration.vue'; // 维护登记页面
import BorrowReturn from '../views/assets/BorrowReturn/index.vue';  // 领用归还页面
// import AssetTransfer from '../views/AssetTransfer.vue'; // 资产调拨页面
// import AssetInventory from '../views/AssetInventory.vue'; // 资产盘点页面
// import AssetDepreciation from '../views/AssetDepreciation.vue'; // 资产折旧页面
// import AssetScrap from '../views/AssetScrap.vue';   // 资产报废页面

const routes = [
  { path: '/home', name: 'Home', component: Home },     
  { path: '/asset/asset-storage', name: 'AssetStorage', component: AssetStorage },
  { path: '/', redirect: '/home'},
  { path: '/asset/asset-label', name: 'AssetLabel', component: AssetLabel },
  { path: '/maintenance-reminder', name: 'MaintenanceReminder', component: MaintenanceReminder },
  { path: '/maintenance-registration', name: 'MaintenanceRegistration', component: MaintenanceRegistration },
  { path: '/borrow-return', name: 'BorrowReturn', component: BorrowReturn },
//   { path: '/asset-transfer', name: 'AssetTransfer', component: AssetTransfer },
//   { path: '/asset-inventory', name: 'AssetInventory', component: AssetInventory },
//   { path: '/asset-depreciation', name: 'AssetDepreciation', component: AssetDepreciation },
//   { path: '/asset-scrap', name: 'AssetScrap', component: AssetScrap }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;