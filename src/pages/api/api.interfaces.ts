export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export interface IPagination {
  offset: number
  limit: number
  total: number
}
