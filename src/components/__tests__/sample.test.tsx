import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

// Simple test component for verification
function TestComponent() {
  return <div>Hello Test World</div>
}

describe('Sample Test', () => {
  it('renders test component', () => {
    render(<TestComponent />)
    expect(screen.getByText('Hello Test World')).toBeInTheDocument()
  })

  it('performs basic assertion', () => {
    expect(1 + 1).toBe(2)
  })
})