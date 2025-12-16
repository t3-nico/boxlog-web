// Performance utilities for image optimization

export function createLazyLoader() {
  if (typeof window === 'undefined') return null
  return {
    observe: () => {},
    unobserve: () => {},
    disconnect: () => {}
  }
}

export const imageOptimization = {
  generateBlurDataURL: () => {
    // Return a simple gray blur placeholder
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEH/8QAHhAAAgIBBQEAAAAAAAAAAAAAAQIAAwQFESExQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABgRAAMBAQAAAAAAAAAAAAAAAAABAhEh/9oADAMBAAIRAxEAPwCwmvSvN1K1YAZZUHLHoEgez3iI1KN0f//Z'
  }
}
