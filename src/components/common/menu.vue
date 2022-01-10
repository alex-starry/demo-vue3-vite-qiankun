<template>
  <template v-for="record in props.records">
    <el-menu-item :index="record.id" v-if="!Array.isArray(record.children) || record.children.length === 0" :route="record.path">
      <el-icon><document /></el-icon>
      <span>{{ record.name }}</span>
    </el-menu-item>
    <el-sub-menu :index="record.id" v-else>
      <template #title>
        <el-icon><document-copy /></el-icon>
        <span>{{ record.name }}</span>
      </template>
      <menu-item :records="record.children" />
    </el-sub-menu>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuItem'
})
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { ElMenuItem, ElSubMenu } from 'element-plus'
import { DocumentCopy, Document } from '@element-plus/icons-vue'
import { IMenuItem } from '../../types';

const props = defineProps({
  records: Array as PropType<IMenuItem[]>
})
</script>
