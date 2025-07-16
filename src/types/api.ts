export interface Cocktail {
  readonly idDrink: string
  readonly strDrink: string
  readonly strDrinkAlternate?: string | null
  readonly strTags?: string | null
  readonly strVideo?: string | null
  readonly strCategory: string
  readonly strIBA?: string | null
  readonly strAlcoholic: string
  readonly strGlass: string
  readonly strInstructions: string
  readonly strInstructionsES?: string | null
  readonly strInstructionsDE?: string | null
  readonly strInstructionsFR?: string | null
  readonly strInstructionsIT?: string | null
  readonly strDrinkThumb: string
  readonly strIngredient1?: string | null
  readonly strIngredient2?: string | null
  readonly strIngredient3?: string | null
  readonly strIngredient4?: string | null
  readonly strIngredient5?: string | null
  readonly strIngredient6?: string | null
  readonly strIngredient7?: string | null
  readonly strIngredient8?: string | null
  readonly strIngredient9?: string | null
  readonly strIngredient10?: string | null
  readonly strIngredient11?: string | null
  readonly strIngredient12?: string | null
  readonly strIngredient13?: string | null
  readonly strIngredient14?: string | null
  readonly strIngredient15?: string | null
  readonly strMeasure1?: string | null
  readonly strMeasure2?: string | null
  readonly strMeasure3?: string | null
  readonly strMeasure4?: string | null
  readonly strMeasure5?: string | null
  readonly strMeasure6?: string | null
  readonly strMeasure7?: string | null
  readonly strMeasure8?: string | null
  readonly strMeasure9?: string | null
  readonly strMeasure10?: string | null
  readonly strMeasure11?: string | null
  readonly strMeasure12?: string | null
  readonly strMeasure13?: string | null
  readonly strMeasure14?: string | null
  readonly strMeasure15?: string | null
  readonly strImageSource?: string | null
  readonly strImageAttribution?: string | null
  readonly strCreativeCommonsConfirmed?: string | null
  readonly dateModified?: string | null
}

export interface Ingredient {
  readonly name: string
  readonly measure: string
}

export const COCKTAIL_CODES = ['margarita', 'mojito', 'a1', 'kir'] as const
export type CocktailCode = (typeof COCKTAIL_CODES)[number]

export interface CocktailCategory {
  readonly code: CocktailCode
  readonly name: string
  readonly description: string
  readonly icon: string
}

export interface CocktailAPIResponse {
  drinks: Cocktail[] | null
}

export interface APIError {
  readonly message: string
  readonly status?: number
  readonly code?: string
}
