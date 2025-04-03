import { IPagination } from '../api.interfaces'

export interface IAllArticles {
  pagination: IPagination
  items: IArticle[]
}

export interface IArticle {
  articleId: string
  title: string
  perex: string
  imageId: string
  createdAt: string
  lastUpdatedAt: string
}
