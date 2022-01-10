<template>
  <el-space :class="$style.comp__ct" :size="16">
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ store.state.user.appName }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item><el-icon :size="20"><edit /></el-icon>修改密码</el-dropdown-item>
          <el-dropdown-item><el-icon :size="20"><switch-button /></el-icon>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ store.state.user.tenantName }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item><el-icon :size="20"><edit /></el-icon>修改密码</el-dropdown-item>
          <el-dropdown-item><el-icon :size="20"><switch-button /></el-icon>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :class="$style.avatar__ct" :size="30" :src="store.state.user.avatar"></el-avatar>{{ store.state.user.nickname }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item><el-icon :size="20"><edit /></el-icon>修改密码</el-dropdown-item>
          <el-dropdown-item><el-icon :size="20"><switch-button /></el-icon>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-space>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { ElSpace, ElDropdown, ElDropdownMenu, ElDropdownItem, ElAvatar, ElIcon } from 'element-plus'
import { ArrowDown, Edit, SwitchButton } from '@element-plus/icons-vue'

const store = useStore()
</script>

<style module>
.comp__ct {
  font-size: 14px;
}
.comp__ct :global(.el-dropdown-link) {
  cursor: pointer;
  font-size: 14px;
}
.comp__ct :global(.el-space__item:last-child) {
  margin-right: 0 !important;
}
.avatar__ct {
  vertical-align: middle;
  margin-right: 8px;
}
</style>
