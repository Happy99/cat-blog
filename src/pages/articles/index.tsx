import PageHeading from '@/components/PageHeading/PageHeading'
import RecentArticlesList from '@/components/Article/RecentArticle/RecentArticleList'

export default function Articles() {
  return (
    <>
      <PageHeading title="Recent articles" />
      <RecentArticlesList />
    </>
  )
}
