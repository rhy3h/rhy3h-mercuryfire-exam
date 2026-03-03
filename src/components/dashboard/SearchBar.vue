<template>
  <div class="flex flex-col sm:flex-row sm:items-center gap-3">
    <!-- Search -->
    <div class="relative flex-1">
      <span class="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
        <Search :size="15" />
      </span>
      <input
        id="account-search"
        :value="modelValue"
        type="text"
        placeholder="搜尋帳號（姓名、郵件、角色）..."
        class="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all bg-white"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <!-- Add Account Button -->
    <button
      id="add-account-button"
      type="button"
      class="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
      style="background: #4f46e5"
      @click="$emit('addAccount')"
    >
      <Plus :size="16" />
      新增帳號
    </button>
  </div>
</template>

<script setup lang="ts">
import { Search, Plus } from 'lucide-vue-next'

defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string]; addAccount: [] }>()
</script>
