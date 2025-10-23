'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { KeyboardNav, ARIA_ROLES } from '@/lib/accessibility'
import { useAccessibility } from './AccessibilityProvider'

interface NavigationItem {
  name: string
  href: string
  current?: boolean
}

interface AccessibleNavigationProps {
  items: NavigationItem[]
  className?: string
  orientation?: 'horizontal' | 'vertical'
  label?: string
}

export function AccessibleNavigation({
  items,
  className = '',
  orientation = 'horizontal',
  label = 'Main navigation'
}: AccessibleNavigationProps) {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const navRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const { announce } = useAccessibility()

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length)
  }, [items.length])

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const isVertical = orientation === 'vertical'
    const nextKey = isVertical ? KeyboardNav.KEYS.ARROW_DOWN : KeyboardNav.KEYS.ARROW_RIGHT
    const prevKey = isVertical ? KeyboardNav.KEYS.ARROW_UP : KeyboardNav.KEYS.ARROW_LEFT

    switch (event.key) {
      case nextKey:
        event.preventDefault()
        const nextIndex = index === items.length - 1 ? 0 : index + 1
        setFocusedIndex(nextIndex)
        itemRefs.current[nextIndex]?.focus()
        break

      case prevKey:
        event.preventDefault()
        const prevIndex = index === 0 ? items.length - 1 : index - 1
        setFocusedIndex(prevIndex)
        itemRefs.current[prevIndex]?.focus()
        break

      case KeyboardNav.KEYS.HOME:
        event.preventDefault()
        setFocusedIndex(0)
        itemRefs.current[0]?.focus()
        break

      case KeyboardNav.KEYS.END:
        event.preventDefault()
        const lastIndex = items.length - 1
        setFocusedIndex(lastIndex)
        itemRefs.current[lastIndex]?.focus()
        break

      case KeyboardNav.KEYS.ENTER:
      case KeyboardNav.KEYS.SPACE:
        // Let the link handle navigation
        break
    }
  }

  const handleFocus = (index: number) => {
    setFocusedIndex(index)
  }

  const handleBlur = () => {
    setFocusedIndex(-1)
  }

  const handleClick = (item: NavigationItem) => {
    announce(`Navigating to ${item.name}`, 'polite')
  }

  const baseClasses = orientation === 'horizontal' 
    ? 'flex space-x-4' 
    : 'flex flex-col space-y-2'

  return (
    <nav
      ref={navRef}
      className={`${baseClasses} ${className}`}
      role={ARIA_ROLES.NAVIGATION}
      aria-label={label}
    >
      {items.map((item, index) => (
        <Link
          key={item.href}
          ref={(el) => {
            itemRefs.current[index] = el
          }}
          href={item.href}
          className={`
            px-3 py-2 rounded-md text-sm font-medium transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${item.current 
              ? 'bg-blue-100 text-blue-900 aria-current-page' 
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }
          `}
          tabIndex={focusedIndex === -1 ? 0 : focusedIndex === index ? 0 : -1}
          aria-current={item.current ? 'page' : undefined}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          onClick={() => handleClick(item)}
        >
          {item.name}
          {item.current && (
            <span className="sr-only">(current page)</span>
          )}
        </Link>
      ))}
    </nav>
  )
}

interface AccessibleMenuProps {
  trigger: React.ReactNode
  items: Array<{
    label: string
    href?: string
    onClick?: () => void
    disabled?: boolean
    separator?: boolean
  }>
  className?: string
  menuClassName?: string
}

export function AccessibleMenu({
  trigger,
  items,
  className = '',
  menuClassName = ''
}: AccessibleMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const { focusManager, announce } = useAccessibility()

  const menuId = `menu-${Math.random().toString(36).substr(2, 9)}`
  const actionableItems = items.filter(item => !item.separator)

  useEffect(() => {
    if (isOpen && menuRef.current) {
      focusManager.trapFocus(menuRef.current)
      setFocusedIndex(0)
      itemRefs.current[0]?.focus()
    } else if (!isOpen) {
      focusManager.releaseFocusTrap()
      setFocusedIndex(-1)
    }
  }, [isOpen, focusManager])

  const handleTriggerClick = () => {
    setIsOpen(!isOpen)
    announce(isOpen ? 'Menu closed' : 'Menu opened', 'polite')
  }

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case KeyboardNav.KEYS.ARROW_DOWN:
        event.preventDefault()
        setIsOpen(true)
        break
      case KeyboardNav.KEYS.ESCAPE:
        setIsOpen(false)
        triggerRef.current?.focus()
        break
    }
  }

  const handleMenuKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case KeyboardNav.KEYS.ARROW_DOWN:
        event.preventDefault()
        const nextIndex = index === actionableItems.length - 1 ? 0 : index + 1
        setFocusedIndex(nextIndex)
        itemRefs.current[nextIndex]?.focus()
        break

      case KeyboardNav.KEYS.ARROW_UP:
        event.preventDefault()
        const prevIndex = index === 0 ? actionableItems.length - 1 : index - 1
        setFocusedIndex(prevIndex)
        itemRefs.current[prevIndex]?.focus()
        break

      case KeyboardNav.KEYS.HOME:
        event.preventDefault()
        setFocusedIndex(0)
        itemRefs.current[0]?.focus()
        break

      case KeyboardNav.KEYS.END:
        event.preventDefault()
        const lastIndex = actionableItems.length - 1
        setFocusedIndex(lastIndex)
        itemRefs.current[lastIndex]?.focus()
        break

      case KeyboardNav.KEYS.ESCAPE:
        event.preventDefault()
        setIsOpen(false)
        triggerRef.current?.focus()
        break

      case KeyboardNav.KEYS.ENTER:
      case KeyboardNav.KEYS.SPACE:
        event.preventDefault()
        const item = actionableItems[index]
        if (item && !item.disabled) {
          if (item.onClick) {
            item.onClick()
          }
          setIsOpen(false)
          triggerRef.current?.focus()
        }
        break
    }
  }

  const handleItemClick = (item: typeof items[0], index: number) => {
    if (item.disabled) return
    
    if (item.onClick) {
      item.onClick()
    }
    announce(`Selected ${item.label}`, 'polite')
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div className={`relative ${className}`}>
      <button
        ref={triggerRef}
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={isOpen ? menuId : undefined}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          id={menuId}
          className={`
            absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50
            ${menuClassName}
          `}
          role="menu"
          aria-orientation="vertical"
        >
          {items.map((item, index) => {
            if (item.separator) {
              return (
                <hr
                  key={`separator-${index}`}
                  className="border-gray-200 my-1"
                  role="separator"
                />
              )
            }

            const actionableIndex = actionableItems.indexOf(item)
            const isLink = !!item.href

            if (isLink) {
              return (
                <Link
                  key={item.href}
                  ref={(el) => {
                    itemRefs.current[actionableIndex] = el
                  }}
                  href={item.href!}
                  className={`
                    block px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                    ${item.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'}
                  `}
                  role="menuitem"
                  tabIndex={focusedIndex === actionableIndex ? 0 : -1}
                  aria-disabled={item.disabled}
                  onKeyDown={(e) => handleMenuKeyDown(e, actionableIndex)}
                  onClick={() => handleItemClick(item, actionableIndex)}
                >
                  {item.label}
                </Link>
              )
            }

            return (
              <button
                key={`button-${index}`}
                ref={(el) => {
                  itemRefs.current[actionableIndex] = el
                }}
                className={`
                  block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                  ${item.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'}
                `}
                role="menuitem"
                tabIndex={focusedIndex === actionableIndex ? 0 : -1}
                disabled={item.disabled}
                aria-disabled={item.disabled}
                onKeyDown={(e) => handleMenuKeyDown(e, actionableIndex)}
                onClick={() => handleItemClick(item, actionableIndex)}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}