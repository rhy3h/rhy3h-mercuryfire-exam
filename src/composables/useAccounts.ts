import { ref } from 'vue'
import { accountsApi } from '@/api'
import type { Account, AccountFormDto, GetAccountsQuery } from '@/api'

/**
 * Composable — 帳號 CRUD 操作
 *
 * 使用範例：
 * ```vue
 * <script setup lang="ts">
 * import { useAccounts } from '@/composables/useAccounts'
 *
 * const { accounts, loading, error, fetchAll, createAccount, updateAccount, deleteAccount } = useAccounts()
 * onMounted(() => fetchAll())
 * </script>
 * ```
 */
export function useAccounts() {
  const accounts = ref<Account[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAll(query?: GetAccountsQuery) {
    loading.value = true
    error.value = null
    try {
      const result = await accountsApi.getAll(query)
      accounts.value = Array.isArray(result) ? result : []
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  async function fetchById(id: string) {
    loading.value = true
    error.value = null
    try {
      return await accountsApi.getById(id)
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  async function createAccount(data: AccountFormDto) {
    loading.value = true
    error.value = null
    try {
      const result = await accountsApi.create(data)
      return result
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  async function updateAccount(id: string, data: AccountFormDto) {
    loading.value = true
    error.value = null
    try {
      const result = await accountsApi.update(id, data)
      return result
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  async function deleteAccount(id: string) {
    loading.value = true
    error.value = null
    try {
      await accountsApi.delete(id)
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  return {
    accounts,
    loading,
    error,
    fetchAll,
    fetchById,
    createAccount,
    updateAccount,
    deleteAccount,
  }
}
