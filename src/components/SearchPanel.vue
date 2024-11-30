<template>
        <div class="filter-container">
          <van-field
            v-for="field in fields"
            :key="field.key"
            v-model="filters[field.key]"
            :label="field.label"
            :placeholder="field.placeholder"
            :is-link="field.isLink"
            :readonly="field.readonly"
            @click="field.click && field.click()"
          />
          <div v-if="showAdvancedFilters" class="advanced-filters">
            <van-field
              v-for="field in advancedFields"
              :key="field.key"
              v-model="filters[field.key]" 
              :label="field.label"
              :placeholder="field.placeholder"
              :is-link="field.isLink"
              :readonly="field.readonly"
              @click="field.click && field.click()"
            />
          </div>
          <div class="filter-buttons">
            <van-button type="primary" size="small" @click="handleSearch">查询</van-button>
            <van-button type="default" size="small" @click="handleReset">重置</van-button>
            <van-button type="text" size="small" @click="toggleAdvanced">
              {{ showAdvancedFilters ? "收起" : "展开" }}
            </van-button>
          </div>

        </div>
      </template>
      
      <script setup>
      import { ref, defineProps, defineEmits } from 'vue';
      
      // 接收字段配置、是否展示高级筛选等 props
      const props = defineProps({
        filters: {
          type: Object,
          required: true,
        },
        fields: {
          type: Array,
          required: true, // 必须传入字段配置
        },
        advancedFields: {
          type: Array,
          default: () => [], // 高级筛选字段配置
        },
        showAdvancedToggle: {
          type: Boolean,
          default: true, // 是否显示展开/收起按钮
        },
      });
      
    // 获取 emit 函数
    const emit = defineEmits();

      // 响应式数据
      const showAdvancedFilters = ref(false); // 控制高级筛选显示
  
// 方法：查询按钮的回调
const handleSearch = () => {
  emit('search', props.filters); // 向父组件传递当前的 filters
};
      
// 方法：重置按钮的回调
const handleReset = () => {
  emit('reset'); // 触发父组件的 reset 事件
};
      
      // 方法：展开/收起高级筛选
  const toggleAdvanced = () => {
    showAdvancedFilters.value = !showAdvancedFilters.value;
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
    margin-top: 12px;
    justify-content: space-around;
  }
  </style>
      