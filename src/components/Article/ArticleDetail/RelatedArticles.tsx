import { IArticle } from '@/lib/articles/articles.interfaces'
import Link from 'next/link'

const truncatePerex = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

const RelatedArticles = ({ relatedArticles }: { relatedArticles: IArticle[] }) => {
  return (
    <div className="col-md-4 border-start">
      <h4 className="mb-4">Related articles</h4>
      <div className="d-flex flex-column gap-4">
        {relatedArticles.map((article, index) => (
          <div key={index} className="d-flex flex-column gap-2">
            <Link className="text-dark" href={`/articles/${article.articleId}`}>
              <h6 className="mb-2">{article.title}</h6>
              <p className="mb-0">{truncatePerex(article.perex, 100)}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedArticles
