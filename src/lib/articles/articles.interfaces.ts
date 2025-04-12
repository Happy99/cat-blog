//TODO: go trough types, make them better - think about structure between article in blog and article in admin
import { IPagination } from '@/pages/api/api.interfaces'

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
  author: string
}

export interface IArticleDetails extends IArticle {
  content: string
  comments: IComment[]
}

export interface IComment {
  commentId: string
  articleId: string
  author: string
  content: string
  postedAt: string
  score: number
}
