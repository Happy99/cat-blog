import ArticleForm from '@/components/admin/ArticleForm'
import { IArticleDetails } from '@/lib/articles/articles.interfaces'
import { articlesService } from '@/lib/articles/articleService'
import { validateFrontendSession } from '@/utils/utils'
import { GetServerSideProps } from 'next'

interface Props {
  readonly article: IArticleDetails
}

export default function EditArticlePage({ article }: Props) {
  return <ArticleForm article={article} />
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const { req, params } = context

  const response = await validateFrontendSession(req)
  console.log('_____ SERVER: edit article page - response', response)
  if (!response || response.status !== 200) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

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
  }
}
