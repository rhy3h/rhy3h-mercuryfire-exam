<template>
  <div class="grid grid-cols-3 gap-4">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="bg-white rounded-xl border border-gray-200 px-5 py-4"
    >
      <p class="text-sm text-gray-500 mb-1">{{ stat.label }}</p>
      <p class="text-2xl font-bold text-gray-800">{{ stat.value }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stats: { label: string; value: number }[]
}>()
</script>
