import ArticleForm from '@/components/admin/ArticleForm'
import { IArticleDetails } from '@/lib/articles/articles.interfaces'
import { articlesService } from '@/lib/articles/articleService'
import { GetStaticPaths, GetStaticProps } from 'next'

interface Props {
  readonly article: IArticleDetails
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await articlesService.getArticles()
  const paths = articles.map(article => ({
    params: { id: String(article.articleId) },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const params = context.params

  if (!params?.id) {
    return { notFound: true }
  }

  const articleId = params.id as string
  const article = await articlesService.getArticle(articleId)

  if (!article) {
    return { notFound: true }
  }

  console.log('___ SERVER: edit article page - article: ', article)

  return {
    props: { article },
    revalidate: 60,
  }
}

export default function EditArticlePage({ article }: Props) {
  return <ArticleForm article={article} />
}
