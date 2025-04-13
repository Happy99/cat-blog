import ArticleForm from '@/components/admin/ArticleForm'
import { validateFrontendSession } from '@/utils/utils'
import { GetServerSideProps } from 'next'

const NewArticlePage = () => <ArticleForm />

export default NewArticlePage

export const getServerSideProps: GetServerSideProps = async context => {
  const { req } = context

  try {
    const response = await validateFrontendSession(req)
    console.log('_____ SERVER: new article page - response', response?.status)
    if (response?.status !== 200) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      }
    }

    return {
      props: {},
    }
  } catch (error) {
    console.error('error in getServerSideProps:', error)
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }
}
