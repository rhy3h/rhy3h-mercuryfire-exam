<template>
  <div class="min-h-screen flex flex-col" style="background: #f4f5fb">
    <!-- Header -->
    <DashboardHeader @logout="router.push('/')" />

    <!-- Main content -->
    <main class="flex-1 px-6 py-6 max-w-7xl mx-auto w-full flex flex-col gap-5">
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
      <AccountGrid :accounts="filteredAccounts" @edit="handleEdit" @delete="handleDelete" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
import SearchBar from '@/components/dashboard/SearchBar.vue'
import StatsCards from '@/components/dashboard/StatsCards.vue'
import AccountGrid from '@/components/dashboard/AccountGrid.vue'
import AccountFormModal from '@/components/dashboard/AccountFormModal.vue'
import type { Account } from '@/api/types'

const router = useRouter()
const searchQuery = ref('')
const isModalOpen = ref(false)
const editingAccount = ref<Account | null>(null)

// ── Mock data (將來替換成 API 回傳) ──────────────────────────────────────────
const accounts = ref<Account[]>([
  {
    id: '1',
    name: '張小明',
    email: 'ming.chang@example.com',
    roleLevel: 'ADMIN',
    status: 'ON',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: '李美蘭',
    email: 'meili.li@example.com',
    roleLevel: 'USER',
    status: 'ON',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: '王大寶',
    email: 'dabao.wang@example.com',
    roleLevel: 'EDITOR',
    status: 'OFF',
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    name: '乃乃',
    email: 'rhy3htw@gmail.com',
    roleLevel: 'ADMIN',
    status: 'OFF',
    createdAt: '2026-03-03',
  },
])

// ── Computed ──────────────────────────────────────────────────────────────────
const filteredAccounts = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return accounts.value
  return accounts.value.filter(
    (a: Account) =>
      a.name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.roleLevel.toLowerCase().includes(q),
  )
})

const computedStats = computed(() => [
  { label: '總帳號數', value: accounts.value.length },
  { label: '啟用中', value: accounts.value.filter((a: Account) => a.status === 'ON').length },
  { label: '已停用', value: accounts.value.filter((a: Account) => a.status === 'OFF').length },
])

// ── Handlers (placeholder，之後串 API) ────────────────────────────────────────
function handleAddAccount() {
  editingAccount.value = null
  isModalOpen.value = true
}

function handleSuccess() {
  console.log('Operation successful, refreshing list...')
  // TODO: refresh accounts from API
}

function handleEdit(account: Account) {
  editingAccount.value = account
  isModalOpen.value = true
}

function handleDelete(account: Account) {
  // TODO: call delete API then refresh
  console.log('刪除', account)
}
</script>
