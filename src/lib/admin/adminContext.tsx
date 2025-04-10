import { IArticle } from '@/lib/articles/articles.interfaces'
import { articlesService } from '@/lib/articles/articleService'
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

interface AdminContextType {
  articles: IArticle[]
  setArticles: (articles: IArticle[]) => void
  deleteArticle: (articleId: string) => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export const AdminProvider = ({
  children,
  initialArticles,
}: {
  children: ReactNode
  initialArticles: IArticle[]
}) => {
  const [articles, setArticles] = useState(initialArticles)

  const deleteArticle = async (articleId: string) => {
    const imageResponse = await articlesService.articleDeleteImage(articleId)
    console.log('_*******__ adminContext: deleteArticle imageResponse: ', imageResponse)

    const articleResponse = await articlesService.deleteArticle(articleId)
    console.log('_*******__ adminContext: deleteArticle response: ', articleResponse)

    if (
      articleResponse === 'Article deleted successfully' &&
      imageResponse === 'Image deleted successfully'
    ) {
      setArticles(prev => prev.filter(article => article.articleId !== articleId))
    }
  }

  const value = useMemo(
    () => ({
      articles,
      setArticles,
      deleteArticle,
    }),
    [articles]
  )

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) throw new Error('useAdmin must be used within an AdminProvider')

  return context
}
