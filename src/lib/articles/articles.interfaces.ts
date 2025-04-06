//TODO: go trough types, some of them are read only, some of them are DateTime

import { IPagination } from '@/pages/api/api.interfaces'
import { v4 as uuidv4 } from 'uuid'

export type UUID = ReturnType<typeof uuidv4>

export interface IAllArticles {
  pagination: IPagination
  items: IArticle[]
}

export interface IArticle {
  articleId: UUID
  title: string
  perex: string
  imageId: UUID
  createdAt: string
  lastUpdatedAt: string
}

export interface IArticleDetails extends IArticle {
  content: string
  comments: IComment[]
}

export interface IComment {
  commentId: UUID
  articleId: UUID
  author: string
  content: string
  postedAt: Date
  score: number
}
