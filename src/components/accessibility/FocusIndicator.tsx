'use client'

import { useEffect, useState } from 'react'

interface FocusIndicatorProps {
  showOnKeyboard?: boolean
  showOnMouse?: boolean
  className?: string
}

export function FocusIndicator({ 
  showOnKeyboard = true, 
  showOnMouse = false,
  className = '' 
}: FocusIndicatorProps) {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false)
  const [isMouseUser, setIsMouseUser] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true)
        setIsMouseUser(false)
      }
    }

    const handleMouseDown = () => {
      setIsKeyboardUser(false)
      setIsMouseUser(true)
    }

    const handleFocus = (e: FocusEvent) => {
      if (!isKeyboardUser && !isMouseUser) {
        setIsKeyboardUser(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('focus', handleFocus, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('focus', handleFocus, true)
    }
  }, [isKeyboardUser, isMouseUser])

  useEffect(() => {
    const shouldShow = (showOnKeyboard && isKeyboardUser) || (showOnMouse && isMouseUser)
    
    if (shouldShow) {
      document.body.classList.add('focus-visible')
    } else {
      document.body.classList.remove('focus-visible')
    }

    return () => {
      document.body.classList.remove('focus-visible')
    }
  }, [isKeyboardUser, isMouseUser, showOnKeyboard, showOnMouse])

  return null
}

export function useFocusVisible() {
  const [isFocusVisible, setIsFocusVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsFocusVisible(true)
      }
    }

    const handleMouseDown = () => {
      setIsFocusVisible(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  return isFocusVisible
}

export default FocusIndicator