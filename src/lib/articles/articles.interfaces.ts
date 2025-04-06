//TODO: go trough types, some of them are read only, some of them are DateTime
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
  author: 'Petr Stastny'
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
