import PageHeading from '@/components/PageHeading/PageHeading'
import { IArticle } from '@/lib/articles/articles.interfaces'
import { articlesService } from '@/lib/articles/articleService'
import { axiosFrontendInstance } from '@/lib/axiosInstance'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

interface AdminProps {
  readonly articles: IArticle[]
}

export default function AdminDashboard({ articles }: AdminProps) {
  return (
    <div className="">
      <div className="d-flex flex-column flex-lg-row align-items-center gap-4 mb-4">
        <PageHeading title="My articles" />
        <Link href="/admin/create" className="btn btn-primary">
          Create new article
        </Link>
      </div>
      {articles.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Perex</th>
              <th>Author</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={index}>
                <td>{article.title}</td>
                <td>{article.perex}</td>
                <td>{article.author}</td>
                <td>0</td>
                <td>
                  <Link
                    href={`/admin/edit/${article.articleId}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Edit
                  </Link>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<AdminProps> = async context => {
  const { req } = context

  try {
    const sessionResponse = await axiosFrontendInstance.get('/api/auth/session', {
      headers: {
        Cookie: req.headers.cookie ?? '',
      },
    })
    const sessionData = sessionResponse.data

    if (!sessionData.username) {
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
    console.error('Error in getServerSideProps:', error)
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }
}
