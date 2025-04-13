import { articlesService } from '@/lib/articles/articleService'
import { NewArticleFormState } from '@/lib/definitions'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

interface ArticleImageProps {
  readonly articleImageId: string
  readonly state: NewArticleFormState
  readonly setSubmitDisabled: Dispatch<SetStateAction<boolean>>
}

const ArticleImage = ({ articleImageId, state, setSubmitDisabled }: ArticleImageProps) => {
  const [image, setImage] = useState<File | null>(null)
  const [imageId, setImageId] = useState<string>(articleImageId)
  const [imagePreview, setImagePreview] = useState<string>(
    articleImageId ? `/api/images/getImage?id=${articleImageId}` : ''
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (imageId) {
      setImagePreview(`/api/images/getImage?id=${imageId}`)
    }
  }, [imageId])

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  useEffect(() => {
    console.log('___ CLIENT: useEffect - image: ', image)
  }, [image])

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0]
    if (!file) {
      // File selection cancelled
      setSubmitDisabled(false)
      return
    }

    // If replacing an existing image, delete it first
    if (imageId) {
      console.log('___ CLIENT: handleImageChange - imageId: ', imageId)
      console.log('___ CLIENT: handleImageChange DELETE IMAGE')
      await handleDeleteImage(true)
      console.log('___ CLIENT: handleImageChange UPLOAD IMAGE')
      //   await handleUploadImage()
    }

    setImage(file)
    setSubmitDisabled(true)
    console.log('___ CLIENT: handleImageChange - file: ', file)

    // Set preview for new image
    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)
  }

  const handleUploadImage = async (): Promise<void> => {
    console.log('___ CLIENT: handleUploadImage STARTED')
    if (!image) return

    const formData = new FormData()
    console.log('___ CLIENT: handleUploadImage - image: ', image)
    formData.append('image', image)

    console.log('___ CLIENT: handleUploadImage - formData: ', formData)

    const { success, imageId } = await articlesService.articleUploadImage(formData)
    if (success) {
      console.log('___ CLIENT: handleUploadImage - imageId: ', imageId)
      setImageId(imageId)
      setImage(null)
      setSubmitDisabled(false)
    }
  }

  const handleDeleteImage = async (skipConfirm = false): Promise<void> => {
    if (!skipConfirm) {
      const confirmed = confirm('Are you sure you want to delete this image?')
      if (!confirmed) return
    }

    const { success } = await articlesService.articleDeleteImage(imageId, '')
    if (success) {
      setImageId('')
      setImage(null)
      setImagePreview('')
      setSubmitDisabled(false)

      if (state?.errors?.imageId) {
        state.errors.imageId = []
      }
    }
  }

  return (
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
        ref={fileInputRef}
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
          {!image && (
            <div className="d-flex flex-row align-items-center gap-2">
              <button type="button" className="btn text-primary p-0" onClick={triggerFileInput}>
                Upload new
              </button>
              <span className="text-muted">|</span>
              <button
                type="button"
                className="btn text-danger p-0"
                onClick={() => handleDeleteImage()}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      <input type="hidden" name="imageId" value={imageId ?? ''} />
      {state?.errors?.imageId && <div className="invalid-feedback">{state.errors.imageId}</div>}
    </div>
  )
}

export default ArticleImage
