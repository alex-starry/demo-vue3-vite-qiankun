<template>
  <div :class="$style.page__ct">
    <el-alert :title="'登录成功，' + store.state.title + '欢迎您！'" type="success" effect="dark" />
  </div>
</template>

<script setup lang="ts">
// import moment from 'moment'
// console.log(moment(1641674849143).format('YYYY/MM/DD HH:mm:ss'))
import { useStore } from 'vuex'
import { ElAlert } from 'element-plus'

const store = useStore()
</script>

<style module>
.page__ct {
  height: 100%;
  padding: 16px;
}
</style>
