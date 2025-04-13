import { useAdmin } from '@/lib/admin/adminContext'
import ArticlesTableActions from './ArticlesTableActions'

const ArticlesTable = () => {
  const { articles } = useAdmin()

  return articles.length > 0 ? (
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
        {articles.map(article => (
          <tr key={article.articleId}>
            <td>{article.title}</td>
            <td>{article.perex}</td>
            <td>Petr Stastny</td>
            <td>0</td>
            <ArticlesTableActions articleId={article.articleId} />
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No articles found.</p>
  )
}

export default ArticlesTable
