<template>
  <div class="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4">
    <!-- Top: Avatar + Name + Status -->
    <div class="flex items-center gap-3">
      <div
        class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style="background: #7c3aed"
      >
        <UserRound class="text-white" :size="20" />
      </div>
      <div class="flex flex-col items-start gap-2 flex-wrap">
        <span class="font-semibold text-gray-800">{{ account.name }}</span>
        <span
          class="text-xs font-medium px-2 py-0.5 rounded-full"
          :class="account.status === 'ON' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'"
        >
          {{ account.status === 'ON' ? '啟用' : '停用' }}
        </span>
      </div>
    </div>

    <!-- Info rows -->
    <div class="flex flex-col gap-1.5 text-sm text-gray-600">
      <div class="flex items-center gap-2">
        <Mail :size="14" class="text-gray-400 flex-shrink-0" />
        <span class="truncate">{{ account.email }}</span>
      </div>
      <div class="flex items-center gap-2">
        <ShieldCheck :size="14" class="text-gray-400 flex-shrink-0" />
        <span>{{ roleLabelMap[account.roleLevel] }}</span>
      </div>
      <div class="flex items-center gap-2">
        <CalendarDays :size="14" class="text-gray-400 flex-shrink-0" />
        <span>{{ account.createdAt }}</span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-2 pt-1 border-t border-gray-100">
      <button
        type="button"
        class="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-gray-200 text-sm text-indigo-400 bg-indigo-100 hover:bg-gray-50 transition-colors"
        @click="$emit('edit', account)"
      >
        <Pencil :size="13" />
        編輯
      </button>
      <button
        type="button"
        class="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-red-200 text-sm text-red-500 bg-red-100 hover:bg-red-50 transition-colors"
        @click="$emit('delete', account)"
      >
        <Trash2 :size="13" />
        刪除
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserRound, Mail, ShieldCheck, CalendarDays, Pencil, Trash2 } from 'lucide-vue-next'
import type { RoleLevel, Account } from '@/api/types'

const roleLabelMap: Record<RoleLevel, string> = {
  ADMIN: '管理員',
  EDITOR: '編輯',
  USER: '用戶',
  CLIENT: '客戶',
}

defineProps<{ account: Account }>()
defineEmits<{ edit: [account: Account]; delete: [account: Account] }>()
</script>
