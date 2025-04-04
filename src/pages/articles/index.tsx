import PageHeading from '@/components/PageHeading/PageHeading'
import { IArticle } from '@/lib/articles/articles.interfaces'
import { articlesService } from '@/lib/articles/articleService'
import RecentArticle from '@/components/Article/RecentArticle/RecentArticle'
import { GetStaticProps } from 'next'

interface IArticlesProps {
  articles: IArticle[]
}

export const getStaticProps: GetStaticProps<IArticlesProps> = async () => {
  const articles = await articlesService.getArticles()

  return {
    props: { articles },
    // Next.js will invalidate the cache when a
    // request comes in, at most once every 60 seconds.
    revalidate: 60,
  }
}

export default function Articles({ articles }: IArticlesProps) {
  return (
    <>
      <PageHeading title="Recent articles" />

      <div className="d-flex flex-column gap-4 mt-5">
        {articles.map((article: IArticle, index: number) => (
          <RecentArticle key={index} article={article} />
        ))}
      </div>
    </>
  )
}
