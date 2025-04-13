import { IArticleDetails } from '@/lib/articles/articles.interfaces'
import { articlesService } from '@/lib/articles/articleService'
import { NewArticleFormState } from '@/schemas/article'
import { useRouter } from 'next/router'
import { useActionState, useEffect, useState } from 'react'
import PageHeading from '../PageHeading/PageHeading'
import ArticleFormField from './ArticleFormField'
import ArticleImage from './ArticleImage'

interface ArticleFormProps {
  readonly article?: IArticleDetails
}

const ArticleForm = ({ article }: ArticleFormProps) => {
  const initialFormState: NewArticleFormState = {
    errors: {},
    message: '',
    success: false,
    ...(article && {
      title: article.title,
      perex: article.perex,
      content: article.content,
      imageId: article.imageId,
    }),
  }
  const isEdit = !!article
  const [state, action, pending] = useActionState(
    isEdit ? articlesService.updateArticle : articlesService.createArticle,
    initialFormState
  )
  const router = useRouter()
  const [submitDisabled, setSubmitDisabled] = useState(false)

  useEffect(() => {
    if (state?.success) {
      router.push('/admin/articles')
    }
  }, [state, router])

  return (
    <div className="container py-5">
      <form action={action}>
        {isEdit && <input type="hidden" name="articleId" value={article.articleId} />}
        <div className="d-flex flex-row gap-4 align-items-center mb-4">
          <PageHeading title={isEdit ? 'Edit Article' : 'Create New Article'} />
          <button type="submit" className="btn btn-primary" disabled={submitDisabled || pending}>
            {pending ? 'Publishing...' : 'Publish Article'}
          </button>
        </div>

        <div
          className={`alert alert-warning alert-dismissible fade show ${
            submitDisabled ? 'd-block' : 'd-none'
          }`}
          role="alert"
        >
          All fields are required - image also. Image has to be uploaded before submitting.
        </div>

        <ArticleFormField
          label="Article Title"
          name="title"
          value={state.title}
          errors={state?.errors?.title}
          placeholder="My First Article"
        />

        <ArticleImage
          articleImageId={state.imageId ?? ''}
          setSubmitDisabled={setSubmitDisabled}
          state={state}
        />

        <ArticleFormField
          label="Perex"
          name="perex"
          type="textarea"
          value={state.perex}
          errors={state?.errors?.perex}
        />

        <ArticleFormField
          label="Content (Markdown)"
          name="content"
          type="textarea"
          value={state.content}
          errors={state?.errors?.content}
          rows={10}
        />
      </form>
    </div>
  )
}

export default ArticleForm
