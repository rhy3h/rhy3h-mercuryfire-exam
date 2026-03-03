<template>
  <DialogRoot :open="open" @update:open="$emit('update:open', $event)">
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out"
        :class="open ? 'opacity-100' : 'opacity-0'"
      />
      <DialogContent
        class="fixed left-1/2 top-1/2 z-50 w-full max-w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-0 shadow-2xl transition-all duration-300 ease-out focus:outline-none"
        :class="open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
      >
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <DialogTitle class="text-lg font-bold text-gray-800">
            {{ isEdit ? '編輯帳號' : '新增帳號' }}
          </DialogTitle>
          <DialogClose
            class="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X :size="20" />
          </DialogClose>
        </div>

        <!-- Form -->
        <div class="flex flex-col gap-5 px-6 py-6">
          <!-- Name -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700">
              姓名 <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="請輸入姓名"
              class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-50/50"
            />
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700">
              電子郵件 <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              placeholder="email@example.com"
              class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-50/50"
            />
          </div>

          <!-- Role -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700">
              角色 <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <select
                v-model="form.roleLevel"
                class="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-50/50"
              >
                <option value="ADMIN">管理員</option>
                <option value="EDITOR">編輯</option>
                <option value="USER">用戶</option>
                <option value="CLIENT">訪客</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400"
              >
                <ChevronDown :size="16" />
              </div>
            </div>
          </div>

          <!-- Status -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700">
              狀態 <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <select
                v-model="form.status"
                class="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-50/50"
              >
                <option value="ON">啟用</option>
                <option value="OFF">停用</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400"
              >
                <ChevronDown :size="16" />
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3 px-6 pb-8 pt-2">
          <DialogClose
            class="flex-1 rounded-xl bg-gray-100 py-3 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
          >
            取消
          </DialogClose>
          <button
            type="button"
            class="flex-1 rounded-xl py-3 text-sm font-semibold text-white transition-all hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            style="background: #4f46e5"
            :disabled="loading || !isFormValid"
            @click="handleSubmit"
          >
            {{ loading ? '處理中...' : isEdit ? '儲存變更' : '新增帳號' }}
          </button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from 'reka-ui'
import { X, ChevronDown } from 'lucide-vue-next'
import { useAccounts } from '@/composables/useAccounts'
import type { AccountFormDto, Account } from '@/api/types'

const props = defineProps<{
  open: boolean
  initialData?: Account | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  success: []
}>()

const { createAccount, updateAccount, loading } = useAccounts()

const form = reactive<AccountFormDto>({
  name: '',
  email: '',
  roleLevel: 'USER',
  status: 'ON',
})

const isEdit = computed(() => !!props.initialData)

watch(
  () => props.open,
  (val) => {
    if (val) {
      if (props.initialData) {
        form.name = props.initialData.name
        form.email = props.initialData.email
        form.roleLevel = props.initialData.roleLevel
        form.status = props.initialData.status
      } else {
        form.name = ''
        form.email = ''
        form.roleLevel = 'USER'
        form.status = 'ON'
      }
    }
  },
)

const isFormValid = computed(() => {
  return form.name.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
})

async function handleSubmit() {
  if (!isFormValid.value || loading.value) return

  try {
    if (isEdit.value && props.initialData) {
      await updateAccount(props.initialData.id, { ...form })
    } else {
      await createAccount({ ...form })
    }
    emit('success')
    emit('update:open', false)
  } catch (error) {
    console.error('Operation failed:', error)
    alert(isEdit.value ? '編輯帳號失敗' : '新增帳號失敗')
  }
}
</script>
