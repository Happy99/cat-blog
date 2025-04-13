import ArticleForm from '@/components/admin/ArticleForm'
import { IArticleDetails } from '@/lib/articles/articles.interfaces'
import { articlesService } from '@/lib/articles/articleService'
import { validateFrontendSession } from '@/utils/utils'
import { GetServerSideProps } from 'next'

interface Props {
  readonly article: IArticleDetails
}

const EditArticlePage = ({ article }: Props) => <ArticleForm article={article} />

export default EditArticlePage

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const { req, params } = context

  const response = await validateFrontendSession(req)
  console.log('_____ SERVER: edit article page - response', response)
  if (response?.status !== 200) {
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
  const article = await articlesService.getArticleFrontend(articleId)

  if (!article) {
    return { notFound: true }
  }

  console.log('___ SERVER: edit article page - article: ', article)

  return {
    props: { article },
  }
}
