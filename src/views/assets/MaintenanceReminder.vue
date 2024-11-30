<template>
        <van-nav-bar title="维护提醒" left-text="返回" left-arrow @click-left="onClickLeft" />
    
      <!-- 搜索框 -->
      <van-search
        v-model="searchValue"
        placeholder="请输入资产编号或名称"
        show-action
        @search="onSearch"
        @clear="clearSearch"
      />
    
      <!-- 列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="list-container"
      >
      
        <van-cell
          v-for="(item, index) in filteredAssets"
          :key="index"
          :title="`资产编号: ${item.code}`"
          :label="`资产名称: ${item.name}`"
          :value="`状态: ${item.status}`"
          is-link
          @click="viewDetails(item)"
        />
      </van-list>
    
      <!-- 详情弹窗 -->
      <van-popup v-model:show="showDetails" position="bottom" :style="{ height: '60%' }">
        <div class="details-popup">
          <h3>资产详情</h3>
          <p><b>资产编号：</b>{{ selectedAsset.code }}</p>
          <p><b>资产名称：</b>{{ selectedAsset.name }}</p>
          <p><b>规格型号：</b>{{ selectedAsset.model }}</p>
          <p><b>维护超时时间：</b>{{ selectedAsset.overdueTime }}</p>
          <p><b>维护人员：</b>{{ selectedAsset.staff }}</p>
          <p><b>维护状态：</b>{{ selectedAsset.status }}</p>
          <van-button type="primary" block @click="showDetails = false">关闭</van-button>
        </div>
      </van-popup>
    </template>
    
    <script setup>
    import { ref, computed } from "vue";
    
    const assets = ref([
      { id: 1, code: "ZC29138223", name: "惠普打印机", model: "HP123", overdueTime: "2024-11-20", staff: "张三", status: "已过期" },
      { id: 2, code: "ZC29138224", name: "联想电脑", model: "Lenovo456", overdueTime: "2024-11-25", staff: "李四", status: "未过期" },
      { id: 3, code: "ZC29138225", name: "戴尔服务器", model: "Dell789", overdueTime: "2024-12-01", staff: "王五", status: "已过期" },
    ]);
    
    const searchValue = ref(""); // 搜索框的值
    const showDetails = ref(false); // 是否显示详情弹窗
    const selectedAsset = ref({}); // 当前选中的资产
    const loading = ref(false); // 列表加载状态
    const finished = ref(true); // 列表是否加载完成
    
    // 过滤后的资产数据
    const filteredAssets = computed(() => {
      if (!searchValue.value) return assets.value;
      return assets.value.filter(
        (item) =>
          item.code.includes(searchValue.value) || item.name.includes(searchValue.value)
      );
    });
    
    // 加载更多数据（示例中无分页，实际可以实现分页逻辑）
    const onLoad = () => {
      loading.value = false; // 假装数据加载完成
    };
    
    // 点击查看详情
    const viewDetails = (item) => {
      selectedAsset.value = item;
      showDetails.value = true;
    };
    
    // 搜索功能
    const onSearch = () => {
      console.log("搜索:", searchValue.value);
    };
    
    // 清空搜索
    const clearSearch = () => {
      searchValue.value = "";
    };
    
    // 返回按钮
    const onClickLeft = () => history.back();
    </script>
    
    <style scoped>
    .list-container {
      padding: 16px;
    }
    .details-popup {
      padding: 16px;
    }
    .details-popup h3 {
      margin-bottom: 16px;
    }
    </style>
    