import type { Cocktail, CocktailAPIResponse, CocktailCode } from '@/types'
import { getCocktailSearchUrl } from '@/utils/cocktails.ts'
import { createAPIError, isNetworkError, logError } from '@/utils/errorHandler.ts'

export async function fetchCocktailsApi(code: CocktailCode): Promise<Cocktail[]> {
  try {
    const url = getCocktailSearchUrl(code)
    const response = await fetch(url)

    if (!response.ok) {
      const error = createAPIError(
        `Ошибка загрузки: ${response.statusText}`,
        response.status,
        'HTTP_ERROR',
      )
      logError(error, `fetchCocktailsApi - HTTP ${response.status}`)
      throw error
    }

    const data: CocktailAPIResponse = await response.json()

    if (!data.drinks || data.drinks.length === 0) {
      const error = createAPIError(
        `Коктейль "${code}" не найден в базе данных. Попробуйте выбрать другой коктейль из меню.`,
        404,
        'NOT_FOUND',
      )
      logError(error, `fetchCocktailsApi - no drinks for ${code}`)
      throw error
    }

    return data.drinks
  }
  catch (networkError) {
    if (isNetworkError(networkError)) {
      const error = createAPIError(
        'Ошибка сети. Проверьте подключение к интернету',
        0,
        'NETWORK_ERROR',
      )
      logError(error, 'fetchCocktailsApi - network error')
      throw error
    }

    if (typeof networkError === 'object'
      && networkError !== null
      && 'message' in networkError) {
      throw networkError
    }

    const error = createAPIError(
      'Произошла неизвестная ошибка',
      500,
      'UNKNOWN_ERROR',
    )
    logError(error, 'fetchCocktailsApi - unknown error')
    throw error
  }
}
