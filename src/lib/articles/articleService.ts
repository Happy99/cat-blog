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

  console.log('___ SERVER: getArticle - response: ', response.data)
  return response.data
}

const getArticleBackend = async (articleId: string): Promise<IArticleDetails> => {
  console.log('___ CLIENT: getArticleBackend START')
  const response: ApiResponse<IArticleDetails> = await axiosBackendInstance.get(
    `/api/articles/getArticle?id=${articleId}`
  )
  console.log('___ CLIENT: getArticleBackend - response: ', response)
  return response.data
}

const deleteArticle = async (articleId: string): Promise<{ message: string; success: boolean }> => {
  const response = await axiosFrontendInstance.delete(`/api/articles/deleteArticle?id=${articleId}`)
  if (response.status === 204) {
    toast.success('Article deleted successfully')
    return { message: 'Article deleted successfully', success: true }
  }

  toast.error('Failed to delete article')
  return { message: 'Failed to delete article', success: false }
}

const createArticle = async (
  state: NewArticleFormState | undefined,
  formData: FormData
): Promise<NewArticleFormState> => {
  const title = formData.get('title') as string
  const perex = formData.get('perex') as string
  const content = formData.get('content') as string
  const imageId = formData.get('imageId') as string

  const validatedFields = NewArticleFormSchema.safeParse({
    title,
    perex,
    content,
    imageId,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed',
      success: false,
      title,
      perex,
      content,
      imageId,
    }
  }

  const {
    title: validatedTitle,
    perex: validatedPerex,
    content: validatedContent,
    imageId: validatedImageId,
  } = validatedFields.data

  try {
    const response = await axiosFrontendInstance.post('/api/articles/newArticle', {
      title: validatedTitle,
      perex: validatedPerex,
      content: validatedContent,
      imageId: validatedImageId,
    })

    console.log('Article creation response:', response)
    if (response.status === 200) {
      toast.success('Article created successfully')
      return {
        message: 'Article created successfully',
        success: true,
        title: validatedTitle,
        perex: validatedPerex,
        content: validatedContent,
        imageId: validatedImageId,
      }
    }

    toast.error('Failed to create article')
    return {
      message: 'Failed to create article',
      success: false,
    }
  } catch (error) {
    console.error('Article creation error:', error)
    return {
      message: 'Failed to create article',
      success: false,
    }
  }
}

const updateArticle = async (
  state: NewArticleFormState | undefined,
  formData: FormData
): Promise<NewArticleFormState> => {
  const articleId = formData.get('articleId') as string
  const title = formData.get('title') as string
  const perex = formData.get('perex') as string
  const content = formData.get('content') as string
  const imageId = formData.get('imageId') as string

  const validatedFields = NewArticleFormSchema.safeParse({
    title,
    perex,
    content,
    imageId,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed',
      success: false,
      title,
      perex,
      content,
      imageId,
    }
  }

  const {
    title: validatedTitle,
    perex: validatedPerex,
    content: validatedContent,
    imageId: validatedImageId,
  } = validatedFields.data

  console.log('___ CLIENT: updateArticle - imageId: ', validatedImageId)
  console.log('___ CLIENT: updateArticle - type of imageId: ', typeof validatedImageId)
  console.log(
    '___ CLIENT: updateArticle - all objects: ',
    articleId,
    validatedTitle,
    validatedPerex,
    validatedContent,
    validatedImageId
  )

  try {
    const response = await axiosFrontendInstance.patch(
      `/api/articles/editArticle?id=${articleId}`,
      {
        articleId,
        title: validatedTitle,
        perex: validatedPerex,
        content: validatedContent,
        imageId: validatedImageId,
      }
    )

    console.log('Article update response:', response)
    if (response.status === 200 && response.data !== 'An unknown error occurred') {
      toast.success('Article updated successfully')
      return {
        message: 'Article updated successfully',
        success: true,
        title: validatedTitle,
        perex: validatedPerex,
        content: validatedContent,
        imageId: validatedImageId,
      }
    }

    toast.error('Failed to update article')
    return {
      message: 'Failed to update article',
      success: false,
    }
  } catch (error) {
    console.error('Article update error:', error)
    return {
      message: 'Failed to update article',
      success: false,
    }
  }
}

const articleUploadImage = async (
  formData: FormData
): Promise<{ message: string; success: boolean; imageId: string }> => {
  try {
    const response = await axiosFrontendInstance.post('/api/images/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    // 10/04/2025: response.data is an array of objects now, something very weird happened, API is returning 200 instead of 201 now, I would bet that 201 worked before in commitID: 14d8aff259b58dbe42fa4b19dc25bfaea49769c0
    const uploadedImageId = response.data.length > 0 ? response.data[0].imageId : null

    if (uploadedImageId) {
      toast.success('Image uploaded successfully')
      return { message: 'Image uploaded successfully', success: true, imageId: uploadedImageId }
    }

    toast.error('No imageId returned from server')
    return { message: 'No imageId returned from server', success: false, imageId: '' }
  } catch (error) {
    console.error('Upload error:', error)
    return { message: 'Failed to upload image', success: false, imageId: '' }
  }
}

// problem je, ze getArticle vrati neco jineho na clientu - parsovane response.data do konzole v chromu, ale na serveru to vraci klasicky objekt
const articleDeleteImage = async (
  imageId?: string,
  articleId?: string
): Promise<{ message: string; success: boolean }> => {
  try {
    let imageIdtoDelete = imageId ?? ''
    if (articleId) {
      const article = await getArticleBackend(articleId)
      imageIdtoDelete = article.imageId
    }

    const response = await axiosFrontendInstance.delete(
      `/api/images/deleteImage?id=${imageIdtoDelete}`
    )

    if (response.status === 204) {
      toast.success('Image deleted successfully')
      return { message: 'Image deleted successfully', success: true }
    }

    toast.error('Failed to delete image')
    return { message: 'Failed to delete image', success: false }
  } catch (error) {
    console.error('Delete image error:', error)
    return { message: 'Failed to delete image', success: false }
  }
}

export const articlesService = {
  getArticles,
  getArticle,
  deleteArticle,
  createArticle,
  updateArticle,
  articleUploadImage,
  articleDeleteImage,
}
