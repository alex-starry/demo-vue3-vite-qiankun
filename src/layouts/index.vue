<template>
  <Component :is="layout"></Component>
</template>

<script setup lang="ts">
import { resolveDynamicComponent, computed } from 'vue'
import { useStore } from 'vuex'
import LayoutBlank from './blank.vue'
import LayoutBasic from './basic.vue'

const store = useStore()

const layout = computed(() => {
  if (store.state.meta.layout === 'blank') {
    return LayoutBlank
  }
  return LayoutBasic
})
const Component = resolveDynamicComponent('Layout')
</script>
