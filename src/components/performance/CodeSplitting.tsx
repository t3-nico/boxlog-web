'use client'

import { Suspense, ComponentType, ReactNode, lazy } from 'react'

interface CodeSplittingProps {
  loader: () => Promise<{ default: ComponentType<any> }>
  fallback?: ReactNode
  props?: Record<string, any>
}

export function CodeSplitting({
  loader,
  fallback = <div className="animate-pulse bg-gray-200 rounded h-32" />,
  props = {}
}: CodeSplittingProps) {
  const LazyComponent = lazy(loader)

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export const createAsyncComponent = (loader: () => Promise<{ default: ComponentType<any> }>) => {
  const AsyncComponent = (props: any) => <CodeSplitting loader={loader} {...props} />
  AsyncComponent.displayName = 'AsyncComponent'
  return AsyncComponent
}

export default CodeSplitting