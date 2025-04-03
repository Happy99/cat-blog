'use client'

import { IArticle } from '@/pages/api/articles/articles.interfaces'
import RecentArticle from '@/components/Article/RecentArticle/RecentArticle'
import blogApiService from '@/pages/api/articles/articles'
import { useEffect, useState } from 'react'

export default function ArticleList() {
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState<IArticle[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await blogApiService.getArticles()
      setArticles(articles)
      setIsLoading(false)
    }
    fetchArticles()
  }, [])

  return isLoading ? (
    <div>Loading...</div>
  ) : articles.length > 0 ? (
    <div className="d-flex flex-column gap-4 mt-5">
      {articles.map((article: IArticle, index: number) => (
        <RecentArticle key={index} article={article} />
      ))}
    </div>
  ) : (
    <div>No articles found</div>
  )
}
