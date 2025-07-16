import type { Ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

export interface UseLazyImageOptions {
  threshold?: number
  rootMargin?: string
}

export interface UseLazyImageReturn {
  imageRef: Ref<HTMLElement | undefined>
  isLoaded: Ref<boolean>
  hasError: Ref<boolean>
  onError: () => void
}

export function useLazyImage(
  options: UseLazyImageOptions = {},
): UseLazyImageReturn {
  const { threshold = 0.1, rootMargin = '50px' } = options

  const imageRef = ref<HTMLElement>()
  const isLoaded = ref<boolean>(false)
  const hasError = ref<boolean>(false)

  const { stop } = useIntersectionObserver(
    imageRef,
    ([{ isIntersecting }]) => {
      if (isIntersecting && !isLoaded.value && !hasError.value) {
        isLoaded.value = true
        stop()
      }
    },
    {
      threshold,
      rootMargin,
    },
  )

  function onError(): void {
    hasError.value = true
    stop()
  }

  return {
    imageRef,
    isLoaded,
    hasError,
    onError,
  }
}
