import mockAxios from 'jest-mock-axios'
import { articlesService } from './articleService'
import { IArticle } from './articles.interfaces'

// Mock the axiosFrontendInstance
jest.mock('@/lib/axiosInstance', () => ({
  axiosFrontendInstance: mockAxios,
}))

// Test fixtures
const mockArticlesFixture: IArticle[] = [
  {
    articleId: 'test-id-1',
    title: 'Test Title 1',
    perex: 'Test perex 1',
    imageId: 'test-image-id-1',
    author: 'Test Author 1',
    createdAt: '2024-01-01T00:00:00.000Z',
    lastUpdatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    articleId: 'test-id-2',
    title: 'Test Title 2',
    perex: 'Test perex 2',
    imageId: 'test-image-id-2',
    author: 'Test Author 2',
    createdAt: '2024-01-02T00:00:00.000Z',
    lastUpdatedAt: '2024-01-02T00:00:00.000Z',
  },
]

describe('articlesService', () => {
  beforeEach(() => {
    mockAxios.reset()
  })

  it('should make correct API call when getting articles', async () => {
    // Arrange
    const expectedUrl = '/api/articles/getArticles'
    mockAxios.get.mockResolvedValueOnce({
      data: {
        items: mockArticlesFixture,
        pagination: {
          offset: 0,
          limit: 10,
          total: 2,
        },
      },
    })

    // Act
    await articlesService.getArticles()

    // Assert
    expect(mockAxios.get).toHaveBeenCalledWith(expectedUrl)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
  })

  it('should return articles with correct types', async () => {
    // Arrange
    mockAxios.get.mockResolvedValueOnce({
      data: {
        items: mockArticlesFixture,
        pagination: {
          offset: 0,
          limit: 10,
          total: 2,
        },
      },
    })

    // Act
    const result = await articlesService.getArticles()

    // Assert
    expect(Array.isArray(result)).toBe(true)
    result.forEach(article => {
      expect(typeof article.articleId).toBe('string')
      expect(typeof article.title).toBe('string')
      expect(typeof article.perex).toBe('string')
      expect(typeof article.imageId).toBe('string')
      expect(typeof article.author).toBe('string')
      expect(typeof article.createdAt).toBe('string')
      expect(typeof article.lastUpdatedAt).toBe('string')
    })
  })

  it('should throw an error when API call fails', async () => {
    // Arrange
    const errorMessage = 'Failed to fetch articles'
    mockAxios.get.mockRejectedValueOnce(new Error(errorMessage))

    // Act & Assert
    await expect(articlesService.getArticles()).rejects.toThrow(errorMessage)
    expect(mockAxios.get).toHaveBeenCalledWith('/api/articles/getArticles')
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
  })
})
