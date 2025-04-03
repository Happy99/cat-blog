import type { GetStaticPaths, GetStaticProps } from 'next'
import { IArticle, IArticleDetails } from '@/pages/api/articles/articles.interfaces'
import blogApiService from '@/pages/api/articles/articles'
import ArticleDetail from '@/components/Article/ArticleDetail/ArticleDetail'
import RelatedArticles from '@/components/Article/ArticleDetail/RelatedArticles'
interface Props {
  article: IArticleDetails
  relatedArticles: IArticle[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await blogApiService.getArticles()
  const paths = articles.map((article: IArticle) => ({
    params: { id: String(article.articleId) },
  }))

  // We'll prerender only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: false }
}

//@ts-expect-error - pls help me with this, I have no power here
export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: {
  params: { id: string }
}) => {
  const article = await blogApiService.getArticle(params.id)
  const relatedArticles = await blogApiService.getArticles(4)

  return {
    props: { article, relatedArticles },
    // Next.js will invalidate the cache when a
    // request comes in, at most once every 60 seconds.
    revalidate: 60,
  }
}

export default function ArticleDetailPage({
  article,
  relatedArticles,
}: {
  article: IArticleDetails
  relatedArticles: IArticle[]
}) {
  return (
    <main className="row">
      <ArticleDetail article={article} />
      <RelatedArticles relatedArticles={relatedArticles} />
    </main>
  )
}
