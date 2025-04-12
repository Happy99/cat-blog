import AuthorDate from '@/components/Article/AuthorDate'
import { IArticleDetails } from '@/lib/articles/articles.interfaces'
import Image from 'next/image'

const ArticleDetail = ({ article }: { article: IArticleDetails }) => {
  const image = article.imageId
    ? `/api/images/getImage?id=${encodeURIComponent(article.imageId)}`
    : '/cat.jpg'

  return (
    <article className="col-md-8 col-12 d-flex flex-column gap-4">
      <h1 className="mb-2">{article.title}</h1>
      <AuthorDate date={article.createdAt} author={article.author} />
      <Image src={image} alt={article.title} className="img-fluid" width={760} height={504} />
      <p className="my-3">{article.content}</p>
    </article>
  )
}

export default ArticleDetail
