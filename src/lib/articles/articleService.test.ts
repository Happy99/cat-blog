import mockAxios from 'jest-mock-axios'
import { articlesService } from './articleService'
import { IArticleDetails } from './articles.interfaces'

// Mock the axiosBackendInstance
jest.mock('@/lib/axiosInstance', () => ({
  axiosBackendInstance: mockAxios,
}))

// Test fixtures
const mockArticleFixture: IArticleDetails = {
  articleId: 'db9532ea-b36c-44e0-91db-3d1a40249ad5',
  title: 'What Is the Difference Between Natural and Organic Cat Food?',
  perex:
    "If you prefer your own diet to be natural or organic, you're probably considering feeding your cat a natural or organic cat food, too. What's the difference between the two, though, and how do you decide which is right for your cat? Find out here.",
  content: '#Lorem ipsum dolor sit amet,\n consectetur adipiscing elit.',
  imageId: '523e4567-e89b-12d3-a456-426614174000',
  author: 'Petr Stastny',
  createdAt: '2025-04-03T17:02:55.250772',
  lastUpdatedAt: '2025-04-06T18:12:16.933628',
  comments: [],
}

describe('articlesService', () => {
  beforeEach(() => {
    mockAxios.reset()
  })

  describe('getArticle', () => {
    const articleId = mockArticleFixture.articleId

    describe('when API call is successful', () => {
      beforeEach(() => {
        mockAxios.get.mockResolvedValueOnce({ data: mockArticleFixture })
      })

      it('should make correct API call', async () => {
        // Arrange
        const expectedUrl = `/articles/${articleId}`

        // Act
        await articlesService.getArticle(articleId)

        // Assert
        expect(mockAxios.get).toHaveBeenCalledWith(expectedUrl)
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
      })

      it('should return article details', async () => {
        // Arrange
        const expectedArticle = mockArticleFixture

        // Act
        const result = await articlesService.getArticle(articleId)

        // Assert
        expect(result).toEqual(expectedArticle)
      })
    })

    describe('when API call fails', () => {
      const errorMessage = 'Article not found'

      beforeEach(() => {
        mockAxios.get.mockRejectedValueOnce(new Error(errorMessage))
      })

      it('should throw an error', async () => {
        // Arrange
        const invalidId = 'invalid-id'

        // Act & Assert
        await expect(articlesService.getArticle(invalidId)).rejects.toThrow(errorMessage)

        // Assert API call
        expect(mockAxios.get).toHaveBeenCalledWith(`/articles/${invalidId}`)
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
      })
    })
  })
})
