import ArticleDetail from '@/components/Article/ArticleDetail/ArticleDetail'
import RelatedArticles from '@/components/Article/ArticleDetail/RelatedArticles'
import { IArticle, IArticleDetails } from '@/lib/articles/articles.interfaces'
import { articlesService } from '@/lib/articles/articleService'
import type { GetStaticPaths, GetStaticProps } from 'next'

interface Props {
  readonly article: IArticleDetails
  readonly relatedArticles: IArticle[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await articlesService.getArticlesFrontend()
  const paths = articles.map((article: IArticle) => ({
    params: { id: String(article.articleId) },
  }))

  // fallback is 'blocking' because of the revalidation in createArticle.ts
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const params = context.params

  if (!params?.id) {
    return {
      notFound: true,
    }
  }

  const articleId = params.id as string
  const article = await articlesService.getArticleFrontend(articleId)

  // I assume db will be small, so fetching all articles and then slicing, not best solution - could be refactored if db grows
  const allArticles = await articlesService.getArticlesFrontend()
  const relatedArticles = allArticles.filter(a => a.articleId !== articleId).slice(0, 4) // Limit to 4 artcles

  return {
    props: { article, relatedArticles },
    // Next.js will invalidate the cache when a
    // request comes in, at most once every 60 seconds.
    revalidate: 60,
  }
}

const ArticleDetailPage = ({ article, relatedArticles }: Props) => {
  return (
    <main className="row">
      <ArticleDetail article={article} />
      <RelatedArticles relatedArticles={relatedArticles} />
    </main>
  )
}

export default ArticleDetailPage
