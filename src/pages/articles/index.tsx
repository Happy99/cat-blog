import PageHeading from '@/components/PageHeading.tsx/PageHeading'
import Article from '@/components/Article/Article'
const Articles = () => {
  return (
    <>
      <PageHeading title="Recent articles" />
      <div className="d-flex flex-column gap-4 mt-5">
        <Article />
        <Article />
        <Article />
      </div>
    </>
  )
}

export default Articles
