//TODO: start using this generic type for all responses!!!!
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
