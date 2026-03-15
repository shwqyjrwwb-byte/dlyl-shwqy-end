// Image configuration for optimized loading
export const IMAGE_QUALITY = 60 // Lower quality for faster loading (default is 75)
export const IMAGE_BLUR_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='

export const imageProps = {
  quality: IMAGE_QUALITY,
  placeholder: 'blur' as const,
  blurDataURL: IMAGE_BLUR_DATA_URL,
}

export const getOptimizedImageProps = (priority = false) => ({
  ...imageProps,
  priority,
  loading: priority ? 'eager' as const : 'lazy' as const,
})
