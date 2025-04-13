import RecentArticle from '@/components/Article/RecentArticle/RecentArticle'
import PageHeading from '@/components/PageHeading/PageHeading'
import { IArticle } from '@/lib/articles/articles.interfaces'
import { articlesService } from '@/lib/articles/articleService'
import { GetStaticProps } from 'next'

interface IArticlesProps {
  readonly articles: IArticle[]
}

export const getStaticProps: GetStaticProps<IArticlesProps> = async () => {
  const articles = await articlesService.getArticlesFrontend()

  return {
    props: { articles },
    // Next.js will invalidate the cache when a
    // request comes in, at most once every 60 seconds.
    revalidate: 60,
  }
}

const ArticlesPage = ({ articles }: IArticlesProps) => {
  return (
    <>
      <PageHeading title="Recent articles" />

      <div className="d-flex flex-column gap-4 mt-5">
        {articles.map((article: IArticle) => (
          <RecentArticle key={article.articleId} article={article} />
        ))}
      </div>
    </>
  )
}

export default ArticlesPage
