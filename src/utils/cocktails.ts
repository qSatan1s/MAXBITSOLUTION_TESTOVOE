import type { Cocktail, CocktailCode, Ingredient } from '@/types'

export function extractIngredients(cocktail: Cocktail): Ingredient[] {
  const ingredients: Ingredient[] = []

  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}` as keyof Cocktail
    const measureKey = `strMeasure${i}` as keyof Cocktail

    const name = cocktail[ingredientKey] as string
    const measure = cocktail[measureKey] as string

    if (name && name.trim()) {
      ingredients.push({
        name: name.trim(),
        measure: measure?.trim(),
      })
    }
  }

  return ingredients
}

export function isValidCocktailCode(code: string): code is CocktailCode {
  const validCodes: CocktailCode[] = ['margarita', 'mojito', 'a1', 'kir']
  return validCodes.includes(code as CocktailCode)
}

export function getCocktailSearchUrl(code: CocktailCode): string {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL ||
    'https://www.thecocktaildb.com/api/json/v1/1'
  return `${baseUrl}/search.php?s=${code}`
}
