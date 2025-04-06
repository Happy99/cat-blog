import { IAllArticles, IArticle, IArticleDetails } from '@/lib/articles/articles.interfaces'
import { axiosBackendInstance, axiosFrontendInstance } from '@/lib/axiosInstance'
import { ApiResponse } from '@/pages/api/api.interfaces'
import { toast } from 'react-toastify'

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

const deleteArticle = async (articleId: string): Promise<string> => {
  const response = await axiosFrontendInstance.delete(`/api/articles/deleteArticle?id=${articleId}`)
  if (response.status === 204) {
    toast.success('Article deleted successfully')
    return 'Article deleted successfully'
  }
  toast.error('Failed to delete article')
  return 'Failed to delete article'
}

export const articlesService = { getArticles, getArticle, deleteArticle }
