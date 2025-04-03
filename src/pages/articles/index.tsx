import PageHeading from '@/components/PageHeading/PageHeading'
import ArticleList from '@/components/Article/ArticleList.tsx/ArticleList'

export default function Articles() {
  return (
    <>
      <PageHeading title="Recent articles" />
      <ArticleList />
    </>
  )
}
