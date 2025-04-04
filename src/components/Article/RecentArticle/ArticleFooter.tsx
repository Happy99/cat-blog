import { UUID } from '@/lib/articles/articles.interfaces'
import Link from 'next/link'

const ArticleFooter = ({ articleId }: { articleId: UUID }) => {
  return (
    <div className="d-flex flex-column flex-lg-row gap-2">
      <Link className="text-primary" href={`/articles/${articleId}`}>
        Read whole article
      </Link>
      {/* //TODO: count comments - find out where to get them, please dont tell me that I have to fetch one article by one */}
      <span className="text-secondary">0 comments</span>
    </div>
  )
}

export default ArticleFooter
