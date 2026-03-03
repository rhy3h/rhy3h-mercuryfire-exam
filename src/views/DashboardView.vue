<template>
  <div class="min-h-screen flex flex-col" style="background: #f4f5fb">
    <!-- Header -->
    <DashboardHeader @logout="handleLogout" />

    <!-- Main content -->
    <main class="flex-1 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full flex flex-col gap-5">
      <!-- Search + Add -->
      <SearchBar v-model="searchQuery" @add-account="handleAddAccount" />

      <AccountFormModal
        v-model:open="isModalOpen"
        :initial-data="editingAccount"
        @success="handleSuccess"
      />

      <!-- Stats -->
      <StatsCards :stats="computedStats" />

      <!-- Account Grid -->
      <div v-if="loading" class="flex justify-center py-12">
        <span class="text-gray-500 text-lg">載入中...</span>
      </div>
      <AccountGrid v-else :accounts="filteredAccounts" @edit="handleEdit" @delete="handleDelete" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { refDebounced } from '@vueuse/core'
import { useAccounts } from '@/composables/useAccounts'

import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
import SearchBar from '@/components/dashboard/SearchBar.vue'
import StatsCards from '@/components/dashboard/StatsCards.vue'
import AccountGrid from '@/components/dashboard/AccountGrid.vue'
import AccountFormModal from '@/components/dashboard/AccountFormModal.vue'
import type { Account, RoleLevel } from '@/api/types'

const router = useRouter()
const searchQuery = ref('')
const searchQueryDebounced = refDebounced(searchQuery, 400)
const isModalOpen = ref(false)
const editingAccount = ref<Account | null>(null)

const { accounts, loading, fetchAll, deleteAccount } = useAccounts()

const roleLabelMap: Record<RoleLevel, string> = {
  ADMIN: '管理員',
  EDITOR: '編輯',
  USER: '用戶',
  CLIENT: '客戶',
}

onMounted(() => {
  fetchAll()
})

// ── Computed ──────────────────────────────────────────────────────────────────
const filteredAccounts = computed(() => {
  const q = searchQueryDebounced.value.trim().toLowerCase()
  if (!q) return accounts.value

  return accounts.value.filter((a) => {
    const roleName = roleLabelMap[a.roleLevel] || ''
    return (
      a.name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      roleName.toLowerCase().includes(q) ||
      a.roleLevel.toLowerCase().includes(q)
    )
  })
})

const computedStats = computed(() => [
  { label: '顯示帳號', value: filteredAccounts.value.length },
  {
    label: '啟用中',
    value: filteredAccounts.value.filter((a: Account) => a.status === 'ON').length,
  },
  {
    label: '已停用',
    value: filteredAccounts.value.filter((a: Account) => a.status === 'OFF').length,
  },
])

// ── Handlers (placeholder，之後串 API) ────────────────────────────────────────
function handleAddAccount() {
  editingAccount.value = null
  isModalOpen.value = true
}

function handleSuccess() {
  console.log('Operation successful, refreshing list...')
  fetchAll()
}

function handleEdit(account: Account) {
  editingAccount.value = { ...account }
  isModalOpen.value = true
}

async function handleDelete(account: Account) {
  if (confirm(`確定要刪除帳號 ${account.name} 嗎？`)) {
    await deleteAccount(account.id)
    fetchAll()
  }
}

async function handleLogout() {
  localStorage.removeItem('isLoggedIn')
  router.push('/')
}
</script>
