export type RoleLevel = 'ADMIN' | 'EDITOR' | 'USER' | 'CLIENT'

export type AccountStatus = 'ON' | 'OFF'

export interface AccountFormDto {
  name: string
  email: string
  roleLevel: RoleLevel
  status: AccountStatus
}

export interface GetAccountsQuery {
  name?: string
  email?: string
}
