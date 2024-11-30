<template>
  <!-- 新增页面 -->
  <van-popup v-model:show="showNewPage" position="bottom" :style="{ height: '100%' }"  closeable>
    <div>
    <!-- 表单部分 -->
    <van-form @submit="onSubmit">
      <!-- 申请编号 -->
      <van-field v-model="formData.applicationId" label="申请编号" placeholder="自动生成" readonly />
      
      <!-- 领用部门 -->
      <van-field v-model="formData.department" label="领用部门" placeholder="请选择" is-link @click="onSelectDepartment" />

      <!-- 领用人 -->
      <van-field v-model="formData.user" label="领用人" placeholder="请选择" is-link @click="onSelectUser" />

      <!-- 时间选择 -->
      <van-field label="借用时间" is-link>
        <template #input>
          <span @click="showStartPicker = true">{{ formData.startDate || '开始时间' }}</span> 至
          <span @click="showEndPicker = true">{{ formData.endDate || '结束时间' }}</span>
        </template>
      </van-field>

      <!-- 领用理由 -->
      <van-field v-model="formData.reason" label="领用理由" type="textarea" placeholder="请输入" />
    </van-form>
     <span>物品列表</span>
    <!-- 物品列表 -->
    <div class="item-list">
      <div v-for="(item, index) in items" :key="index" class="item">
        <van-cell title="物品名称" :value="item.name" />
        <van-cell title="规格型号" :value="item.model" />
        <van-cell title="计量单位" :value="item.unit" />
        <van-cell title="物品单价" :value="item.price" />
        <van-field v-model="item.quantity" label="领用数量" placeholder="请输入" />
      </div>
    </div>

    <div class="action-buttons">
      <van-button type="primary" @click="addItem">+ 添加物品</van-button>
      <van-button type="danger" @click="deleteItems">删除所选</van-button>
    </div>

    <!-- 保存与取消 -->
    <div class="bottom-buttons">
      <van-button type="primary" block @click="save">保存</van-button>
      <van-button block @click="cancel">取消</van-button>
    </div>
  </div>
    </van-popup>
</template>

<script setup>

</script>

<style scoped>

</style>