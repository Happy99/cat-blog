import AuthorDate from '../AuthorDate'
import Image from 'next/image'
import { IArticleDetails } from '@/pages/api/articles/articles.interfaces'

const ArticleDetail = ({ article }: { article: IArticleDetails }) => {
  return (
    <article className="col-md-8 col-12 d-flex flex-column gap-4">
      <h1 className="mb-2">{article.title}</h1>
      <AuthorDate date={article.createdAt} />
      <Image src={'/cat.jpg'} alt={article.title} className="img-fluid" width={760} height={504} />
      <p className="my-3">{article.content}</p>
    </article>
  )
}

export default ArticleDetail
