import Image from 'next/image'
import Link from 'next/link'
import { IArticle } from '@/pages/api/articles/articles.interfaces'

const Article = ({ article }: { article: IArticle }) => {
  // could be extracted to utils -> YAGNI concept for now
  function formatDate(dateStr: string) {
    const date = new Date(dateStr)
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()

    return `${month}/${day}/${year}`
  }

  return (
    <div className="row">
      {/* // TODO: I dont like this, but wireframe does not have full container width for the article */}
      <div className="col-md-8 col-12">
        <article className="d-flex flex-row gap-4">
          <Image src={'/cat.jpg'} alt="article image" width={272} height={244} />
          <div className="d-flex flex-column gap-2">
            <h4>{article.title}</h4>
            <div className="d-flex flex-column flex-lg-row gap-0 gap-lg-2 align-items-center text-secondary">
              <address className="mb-0">John Doe</address>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-dot d-none d-lg-block"
                viewBox="0 0 16 16"
              >
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
              </svg>
              <time>{formatDate(article.createdAt)}</time>
            </div>
            <p>{article.perex}</p>
            <div className="d-flex flex-column flex-lg-row gap-2">
              <Link className="text-primary" href={`/articles/${article.articleId}`}>
                Read whole article
              </Link>
              <span className="text-secondary">0 comments</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default Article
