import axiosInstance from '@/lib/axiosInstance'
import { IAllArticles, IArticle } from './articles.interfaces'
import { ApiResponse } from '../api.interfaces'

const getArticles = async (): Promise<IArticle[]> => {
  const response: ApiResponse<IAllArticles> = await axiosInstance.get('/articles')
  const { items: articles } = response.data

  // sort by lastUpdatedAt descending
  // TODO: make sure this .getTime() works, it was quite long time ago when I did this for last time :D
  return articles.sort(
    (a, b) => new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime()
  )
}

const blogApiService = { getArticles }

export default blogApiService
