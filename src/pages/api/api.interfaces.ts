//TODO: go trough types, some of them are read only, some of them are DateTime
export interface ApiResponse<T> {
  data: T
  status: number
  statusText?: string
}

export interface IPagination {
  offset: number
  limit: number
  total: number
}
