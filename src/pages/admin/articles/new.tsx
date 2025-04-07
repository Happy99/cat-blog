import PageHeading from '@/components/PageHeading/PageHeading'
import { articlesService } from '@/lib/articles/articleService'
import { useRouter } from 'next/router'
import { useActionState, useEffect, useState } from 'react'

export default function NewArticlePage() {
  const [image, setImage] = useState<File | null>(null)
  const [imageId, setImageId] = useState<string | null>(null)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [state, action] = useActionState(articlesService.createArticle, undefined)
  const router = useRouter()

  useEffect(() => {
    console.log('state', state)
    if (state?.message === 'Article created successfully') {
      router.push('/admin/articles')
    }
  }, [state, router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitDisabled(true)

    const file = e.target.files?.[0]
    if (file) setImage(file)
  }

  const handleUploadImage = async () => {
    if (!image) return

    const formData = new FormData()
    formData.append('image', image)

    await articlesService.articleUploadImage(formData, setImageId, setImage, setSubmitDisabled)
  }

  // TODO: refactor those, make input component, etc with validation to avoid repetations
  return (
    <div className="container py-5">
      <PageHeading title="Create New Article" />

      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        All fields are required - image also. Image has to be uploaded before submitting.
      </div>

      <form action={action}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label required">
            * Title
          </label>
          <input
            type="text"
            className={`form-control ${state?.errors?.title ? 'is-invalid' : ''}`}
            id="title"
            name="title"
          />
          {state?.errors?.title && <div className="invalid-feedback">{state.errors.title}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="perex" className="form-label">
            * Perex
          </label>
          <textarea
            className={`form-control ${state?.errors?.perex ? 'is-invalid' : ''}`}
            id="perex"
            name="perex"
          />
          {state?.errors?.perex && <div className="invalid-feedback">{state.errors.perex}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            * Content (Markdown)
          </label>
          <textarea
            className={`form-control ${state?.errors?.content ? 'is-invalid' : ''}`}
            id="content"
            name="content"
            rows={10}
          />
          {state?.errors?.content && <div className="invalid-feedback">{state.errors.content}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            * Image
          </label>
          <input
            type="file"
            className={`form-control ${state?.errors?.imageId ? 'is-invalid' : ''}`}
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <input type="hidden" name="imageId" value={imageId ?? ''} />
          {state?.errors?.imageId && <div className="invalid-feedback">{state.errors.imageId}</div>}
          {image && (
            <button type="button" className="btn btn-secondary mt-2" onClick={handleUploadImage}>
              Upload Image
            </button>
          )}
          {imageId && <p className="text-success">Image uploaded</p>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitDisabled}>
          Create Article
        </button>
      </form>
    </div>
  )
}
