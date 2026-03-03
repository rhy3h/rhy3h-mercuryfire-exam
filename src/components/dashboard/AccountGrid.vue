<template>
  <div v-if="accounts.length === 0" class="text-center text-gray-400 py-16">
    <UserRound :size="40" class="mx-auto mb-3 opacity-40" />
    <p class="text-sm">目前沒有帳號</p>
  </div>
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <AccountCard
      v-for="account in accounts"
      :key="account.id"
      :account="account"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { UserRound } from 'lucide-vue-next'
import AccountCard, { type AccountItem } from './AccountCard.vue'

defineProps<{ accounts: AccountItem[] }>()
defineEmits<{ edit: [account: AccountItem]; delete: [account: AccountItem] }>()
</script>
