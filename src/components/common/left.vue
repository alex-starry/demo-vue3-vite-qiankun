<template>
  <div :class="$style.comp__ct">
    <h5><el-avatar :class="$style.avatar__ct" :size="32" shape="square" :src="store.state.user.avatar"></el-avatar>{{ store.state.title }}</h5>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { ElSpace, ElDropdown, ElDropdownMenu, ElDropdownItem, ElAvatar, ElIcon } from 'element-plus'
import { ArrowDown, Edit, SwitchButton } from '@element-plus/icons-vue'

import http from '../../utils/http'

const store = useStore()

const menuTree = ref([])

// 设置菜单树
const setMenuTree = async () => {
  const res: any = await http({
    apiName: 'treeUserMenu',
    params: {
      appCode: store.state.user.appCode,
    }
  })
  menuTree.value = res
}

setMenuTree()
</script>

<style module>
.comp__ct :global(h5) {
  height: 56px;
  line-height: 56px;
  background-color: #fff;
  padding: 0 16px;
}
.avatar__ct {
  vertical-align: middle;
  margin-right: 8px;
}
</style>
