<template>
  <div
    class="min-h-screen flex items-center justify-center"
    style="background: linear-gradient(135deg, #e8eaf6 0%, #dde1f8 40%, #e4e8fb 100%)"
  >
    <div class="bg-white rounded-2xl shadow-lg w-full max-w-md px-10 py-10 mx-4 text-center">
      <div class="flex justify-center mb-4">
        <div
          class="w-14 h-14 rounded-full flex items-center justify-center"
          style="background: #4f46e5"
        >
          <LayoutDashboard class="text-white" :size="26" :stroke-width="2.5" />
        </div>
      </div>
      <h1 class="text-xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p class="text-sm text-gray-400 mb-6">歡迎回來，登入成功！</p>
      <button
        type="button"
        class="px-6 py-2 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
        style="background: #4f46e5"
        @click="router.push('/')"
      >
        登出
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { LayoutDashboard } from 'lucide-vue-next'

const router = useRouter()
</script>
