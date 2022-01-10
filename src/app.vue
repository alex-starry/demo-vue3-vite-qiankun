<template>
  <Layout />
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, provide } from 'vue'
import { useStore } from 'vuex'
import Layout from './layouts/index.vue'

import http from './utils/http'

const store = useStore()

const menuTree = ref([])
provide('menuTree', menuTree.value)

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

// setMenuTree()
</script>

<style>
@import url(./assets/css/base.css);
@import url(./assets/css/main.css);
</style>
