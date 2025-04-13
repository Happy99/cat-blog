import ArticlesTable from '@/components/admin/ArticlesTable'
import PageHeading from '@/components/PageHeading/PageHeading'
import { AdminProvider } from '@/lib/admin/adminContext'
import { IArticle } from '@/lib/articles/articles.interfaces'
import { articlesService } from '@/lib/articles/articleService'
import { validateFrontendSession } from '@/utils/utils'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

interface AdminProps {
  readonly articles: IArticle[]
}

const ArticlesListPage = ({ articles }: AdminProps) => {
  return (
    <AdminProvider initialArticles={articles}>
      <div className="d-flex flex-column flex-lg-row align-items-center gap-4 mb-4">
        <PageHeading title="My articles" />
        <Link href="/admin/articles/new" className="btn btn-primary">
          Create new article
        </Link>
      </div>
      <ArticlesTable />
    </AdminProvider>
  )
}

export default ArticlesListPage

export const getServerSideProps: GetServerSideProps<AdminProps> = async context => {
  const { req } = context

  try {
    const response = await validateFrontendSession(req)
    if (response?.status !== 200) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      }
    }

    const articles = await articlesService.getArticles()

    return {
      props: {
        articles,
      },
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
