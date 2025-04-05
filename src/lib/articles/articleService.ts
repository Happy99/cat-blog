import { ApiResponse } from '@/api/api.interfaces'
import { IAllArticles, IArticle, IArticleDetails } from '@/lib/articles/articles.interfaces'
import { axiosBackendInstance } from '@/lib/axiosInstance'

const getArticles = async (limit?: number): Promise<IArticle[]> => {
  const response: ApiResponse<IAllArticles> = await axiosBackendInstance.get('/articles', {
    params: { limit },
  })
  const { items: articles } = response.data

  // TODO: make sure this .getTime() works, it was quite long time ago when I did this for last time :D
  // sort by lastUpdatedAt descending
  return articles.sort(
    (a, b) => new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime()
  )
}

const getArticle = async (articleId: string): Promise<IArticleDetails> => {
  const response: ApiResponse<IArticleDetails> = await axiosBackendInstance.get(
    `/articles/${articleId}`
  )
  return response.data
}

export const articlesService = { getArticles, getArticle }
