<template>
  <header
    class="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between"
  >
    <!-- Left: Logo + Title -->
    <div class="flex items-center gap-3">
      <div
        class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style="background: #4f46e5"
      >
        <Users class="text-white" :size="18" :stroke-width="2" />
      </div>
      <div>
        <h1 class="text-base font-bold text-gray-800 leading-tight">帳號管理系統</h1>
        <p class="text-xs text-gray-400 leading-tight">管理您的所有帳號</p>
      </div>
    </div>

    <!-- Right: Logout -->
    <button
      id="logout-button"
      type="button"
      class="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
      @click="$emit('logout')"
    >
      <LogOut :size="16" />
      登出
    </button>
  </header>
</template>

<script setup lang="ts">
import { Users, LogOut } from 'lucide-vue-next'

defineEmits<{ logout: [] }>()
</script>
