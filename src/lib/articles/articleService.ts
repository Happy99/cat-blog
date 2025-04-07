import { IAllArticles, IArticle, IArticleDetails } from '@/lib/articles/articles.interfaces'
import { axiosBackendInstance, axiosFrontendInstance } from '@/lib/axiosInstance'
import { ApiResponse } from '@/pages/api/api.interfaces'
import { toast } from 'react-toastify'
import { NewArticleFormSchema, NewArticleFormState } from '../definitions'

const getArticles = async (limit?: number): Promise<IArticle[]> => {
  const response: ApiResponse<IAllArticles> = await axiosBackendInstance.get('/articles', {
    params: { limit },
  })
  const { items: articles } = response.data

  // sort by lastUpdatedAt descending
  return articles.sort(
    (a, b) => new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime()
  )
}

const getArticle = async (articleId: string): Promise<IArticleDetails> => {
  const response: ApiResponse<IArticleDetails> = await axiosBackendInstance.get(
    `/articles/${articleId}`
  )

  return response.data
}

const deleteArticle = async (articleId: string): Promise<string> => {
  const response = await axiosFrontendInstance.delete(`/api/articles/deleteArticle?id=${articleId}`)

  if (response.status === 204) {
    toast.success('Article deleted successfully')
    return 'Article deleted successfully'
  }

  toast.error('Failed to delete article')
  return 'Failed to delete article'
}

const createArticle = async (
  state: NewArticleFormState | undefined,
  formData: FormData
): Promise<NewArticleFormState> => {
  const validatedFields = NewArticleFormSchema.safeParse({
    title: formData.get('title'),
    perex: formData.get('perex'),
    content: formData.get('content'),
    imageId: formData.get('imageId'),
  })

  // form validation before ftchning data
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { title, perex, content, imageId } = validatedFields.data

  try {
    const response = await axiosFrontendInstance.post('/api/articles/newArticle', {
      title,
      perex,
      content,
      imageId,
    })

    console.log('Article creation response:', response)
    if (response.status === 200) {
      toast.success('Article created successfully')
      return {
        message: 'Article created successfully',
      }
    }

    toast.error('Failed to create article')
    return {
      message: 'Failed to create article',
    }
  } catch (error) {
    console.error('Article creation error:', error)
    return {
      message: 'Failed to create article',
    }
  }
}

const articleUploadImage = async (
  formData: FormData,
  setImageId: (imageId: string) => void,
  setImage: (image: File | null) => void,
  setSubmitDisabled: (submitDisabled: boolean) => void
): Promise<string> => {
  try {
    const response = await axiosFrontendInstance.post('/api/images/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    const uploadedImageId = response.data.imageId

    if (uploadedImageId) {
      setImageId(uploadedImageId)
      setImage(null)
      setSubmitDisabled(false)
      toast.success('Image uploaded successfully')
      return 'Image uploaded successfully'
    }

    toast.error('No imageId returned from server')
    return 'No imageId returned from server'
  } catch (err) {
    console.error('Upload error:', err)
    return 'Failed to upload image'
  }
}

export const articlesService = {
  getArticles,
  getArticle,
  deleteArticle,
  createArticle,
  articleUploadImage,
}
