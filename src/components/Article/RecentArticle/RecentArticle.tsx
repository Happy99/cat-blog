import AuthorDate from '@/components/Article/AuthorDate'
import ArticleFooter from '@/components/Article/RecentArticle/ArticleFooter'
import { IArticle } from '@/lib/articles/articles.interfaces'
import Image from 'next/image'

const RecentArticle = ({ article }: { article: IArticle }) => {
  return (
    <div className="row">
      {/* // TODO: I dont like this, but wireframe does not have full container width for the article */}
      <div className="col-md-8 col-12">
        <article className="d-lg-flex flex-row gap-4">
          <Image src={'/cat.jpg'} alt={article.title} width={272} height={244} />
          <div className="d-flex flex-column gap-2">
            <h4>{article.title}</h4>
            <AuthorDate className="align-items-start" date={article.createdAt} />
            <p>{article.perex}</p>
            <ArticleFooter articleId={article.articleId} />
          </div>
        </article>
      </div>
    </div>
  )
}

export default RecentArticle
