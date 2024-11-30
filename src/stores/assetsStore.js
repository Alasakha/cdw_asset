// src/stores/assetsStore.js
import { defineStore } from 'pinia';

export const useAssetsStore = defineStore('assets', {
  state: () => ({
    assets: [
      {
        id: 1,
        applicationId: "SQ20231101",
        department: "技术部",
        applicant: "张三",
        borrowingTime: "2021-12-06 ~ 2021-12-31",
        assetCount: 3,
        status: "未归还",
      },
      {
        id: 2,
        applicationId: "SQ20231102",
        department: "测试部",
        applicant: "李四",
        borrowingTime: "2021-12-06 ~ 2021-12-31",
        assetCount: 3,
        status: "已归还",
      },
    ],
  }),
  actions: {
    // 你可以在这里定义更新资产的动作
    addAsset(asset) {
      this.assets.push(asset);
    },
    updateAsset(updatedAsset) {
      const index = this.assets.findIndex((item) => item.id === updatedAsset.id);
      if (index !== -1) {
        this.assets[index] = updatedAsset;
      }
    },
    // 如果需要，你还可以定义删除资产的函数
    deleteAsset(assetId) {
      this.assets = this.assets.filter((asset) => asset.id !== assetId);
    },
  },
  getters: {
    // 你可以定义一些 getter 来计算和获取特定的资产数据
    getAssetById: (state) => {
      return (id) => state.assets.find((asset) => asset.id === id);
    },
  },
});
