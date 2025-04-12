import { articlesService } from '@/lib/articles/articleService'
import { NewArticleFormState } from '@/lib/definitions'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface ArticleImageProps {
  readonly articleImageId: string
  readonly state: NewArticleFormState
  readonly setSubmitDisabled: Dispatch<SetStateAction<boolean>>
}

export default function ArticleImage({
  articleImageId,
  state,
  setSubmitDisabled,
}: ArticleImageProps) {
  const [image, setImage] = useState<File | null>(null)
  const [imageId, setImageId] = useState<string>(articleImageId)
  const [imagePreview, setImagePreview] = useState<string>(
    articleImageId ? `/api/images/getImage?id=${articleImageId}` : ''
  )

  useEffect(() => {
    if (imageId) {
      setImagePreview(`/api/images/getImage?id=${imageId}`)
    }
  }, [imageId])

  useEffect(() => {
    // Cleanup to avoid memory leaks
    return () => {
      if (imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

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

  return (
    // petstast: this component looks a bit different than in figma, UX is better this way for me, so I "dovolit si" do it differently :D
    <div className="d-flex flex-column gap-2 mb-3">
      <label htmlFor="image" className="form-label">
        * Featured Image
      </label>

      <input
        type="file"
        className={`form-control ${state?.errors?.imageId ? 'is-invalid' : ''}`}
        id="image"
        accept="image/*"
        onChange={handleImageChange}
        hidden={!!imagePreview}
      />

      {image && (
        <button type="button" className="btn btn-secondary mt-2" onClick={handleUploadImage}>
          Upload Image
        </button>
      )}
      {imagePreview && (
        <div className="d-flex flex-column align-items-start gap-2">
          <Image
            src={imagePreview}
            alt="Preview"
            width={100}
            height={75}
            className="img-thumbnail"
          />
          <div className="d-flex flex-row align-items-center gap-2">
            <button type="button" className="btn text-primary p-0">
              Upload new
            </button>
            <span className="text-muted">|</span>
            <button type="button" className="btn text-danger p-0">
              Delete
            </button>
          </div>
        </div>
      )}

      <input type="hidden" name="imageId" value={imageId ?? ''} />
      {state?.errors?.imageId && <div className="invalid-feedback">{state.errors.imageId}</div>}
    </div>
  )
}
