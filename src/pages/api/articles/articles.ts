import axiosInstance from '@/lib/axiosInstance'
import { IAllArticles, IArticle, IArticleDetails } from './articles.interfaces'
import { ApiResponse } from '../api.interfaces'

const getArticles = async (limit?: number): Promise<IArticle[]> => {
  const response: ApiResponse<IAllArticles> = await axiosInstance.get('/articles', {
    params: { limit },
  })
  const { items: articles } = response.data

  // sort by lastUpdatedAt descending
  // TODO: make sure this .getTime() works, it was quite long time ago when I did this for last time :D
  return articles.sort(
    (a, b) => new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime()
  )
}

const getArticle = async (articleId: string): Promise<IArticleDetails> => {
  const response: ApiResponse<IArticleDetails> = await axiosInstance.get(`/articles/${articleId}`)
  return response.data
}

const blogApiService = { getArticles, getArticle }

export default blogApiService
