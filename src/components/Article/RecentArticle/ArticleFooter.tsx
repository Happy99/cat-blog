import Link from 'next/link'

const ArticleFooter = ({ articleId }: { articleId: string }) => {
  return (
    <div className="d-flex flex-column flex-lg-row gap-2">
      <Link className="text-primary" href={`/articles/${articleId}`}>
        Read whole article
      </Link>
      <span className="text-secondary">0 comments</span>
    </div>
  )
}

export default ArticleFooter
