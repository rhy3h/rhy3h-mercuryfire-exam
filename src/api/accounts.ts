import { httpClient } from './client'
import type { AccountFormDto, GetAccountsQuery } from './types'

export const accountsApi = {
  getAll(query?: GetAccountsQuery) {
    return httpClient.get(`/accounts`, {
      name: query?.name,
      email: query?.email,
    })
  },

  getById(id: string) {
    return httpClient.get(`/account/${id}`)
  },

  create(data: AccountFormDto) {
    return httpClient.post(`/create-account`, data)
  },

  update(id: string, data: AccountFormDto) {
    return httpClient.patch(`/update-account/${id}`, data)
  },

  delete(id: string) {
    return httpClient.delete(`/delete-account/${id}`)
  },
}

export type { AccountFormDto, GetAccountsQuery, RoleLevel, AccountStatus } from './types'
