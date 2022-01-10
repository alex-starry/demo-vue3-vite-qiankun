<template>
  <el-container :class="$style.layout__ct">
    <el-aside width="200px">
      <common-left></common-left>
    </el-aside>
    <el-container>
      <el-header :class="$style.header__ct">
        <common-header></common-header>
      </el-header>
      <el-main :class="$style.main__ct" id="container"><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ElContainer, ElAside, ElHeader, ElMain } from 'element-plus'

import CommonHeader from '../components/common/header.vue'
import CommonLeft from '../components/common/left.vue'
</script>

<style module>
.layout__ct {
  min-height: 100vh;
}
.header__ct {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  height: 56px !important;
  background-color: #fff;
}
.main__ct {
  padding: 0 !important;
  position: relative;
}
.main__ct:before {
  content: '';
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: #d8d8d8;
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleY(0.5);
}
</style>
