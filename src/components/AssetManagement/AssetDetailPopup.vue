<template>
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
      </template>
      
      <script setup>
      import { ref, defineProps, watch } from "vue";
      const selectedAsset = ref({});
      const showDetails = ref(false);
      
      const { assetDetails, onCloseDetails } = defineProps(["assetDetails", "onCloseDetails"]);
      
//         watch(() => assetDetails, (newValue) => {
//   // 处理变化       
//         selectedAsset.value = newDetails;
//         showDetails.value = !!newDetails;
//         });
      </script>
      
      <style scoped>
      /* 相关样式 */
      </style>