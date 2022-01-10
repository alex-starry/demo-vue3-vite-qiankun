<template>
  <div :class="$style.comp__ct">
    <h5><el-avatar :class="$style.avatar__ct" :size="32" shape="square" :src="store.state.user.avatar"></el-avatar>{{ store.state.title }}</h5>
    <el-menu ref="refMenu" background-color="#f6f7f9" :router="true" :default-active="activeIndex">
    <!-- <el-menu ref="refMenu" background-color="#f6f7f9" :router="true" :default-active="'1464049595850969090'"> -->
      <el-menu-item index="0" route="/welcome">
        <el-icon><document /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <menu-item :records="menuTree" />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElMenu } from 'element-plus'
import { Document } from '@element-plus/icons-vue'

import MenuItem from './menu.vue'

import http from '../../utils/http'
import { IMenuItem } from '../../types'

const route = useRoute()
const store = useStore()

const refMenu: any = ref(null)
const menuTree = ref([] as IMenuItem[])

const activeIndex = computed(() => {
  if ('/welcome' === route.path) {
    return '0'
  }
  return flatMenu(menuTree.value)
})

// 查找当前菜单和父菜单id
const flatMenu = (menus: IMenuItem[]): string => {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    if (menu.path === route.path) {
      return menu.id
    }
    if (Array.isArray(menu.children) && menu.children.length > 0) {
      return flatMenu(menu.children)
    }
    return ''
  }
  return ''
}

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
  position: relative;
}

.comp__ct :global(h5:after) {
  content: '';
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: #d8d8d8;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: scaleY(0.5);
}
.avatar__ct {
  vertical-align: middle;
  margin-right: 8px;
}
</style>
