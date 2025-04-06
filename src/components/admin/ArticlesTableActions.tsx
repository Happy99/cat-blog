import { useAdmin } from '@/lib/admin/adminContext'
import Link from 'next/link'

export default function ArticlesTableActions({ articleId }: { readonly articleId: string }) {
  const { deleteArticle } = useAdmin()

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this article?')) {
      await deleteArticle(articleId) // Toast handled in articlesService
    }
  }

  return (
    <td>
      <Link href={`/admin/articles/edit/${articleId}`} className="btn btn-sm btn-primary me-2">
        Edit
      </Link>
      <button className="btn btn-sm btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </td>
  )
}
