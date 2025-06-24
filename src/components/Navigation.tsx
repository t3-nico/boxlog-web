'use client'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

import { Button } from '@/components/Button'
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { Tag } from '@/components/Tag'
import { remToPx } from '@/lib/remToPx'
import { CloseButton } from '@headlessui/react'
import { BookIcon } from '@/components/icons/BookIcon'
import { BoltIcon } from '@/components/icons/BoltIcon'
import { SquaresPlusIcon } from '@/components/icons/SquaresPlusIcon'
import { CheckIcon } from '@/components/icons/CheckIcon'
import { ListIcon } from '@/components/icons/ListIcon'
import { BellIcon } from '@/components/icons/BellIcon'
import { LinkIcon } from '@/components/icons/LinkIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import { ChatBubbleIcon } from '@/components/icons/ChatBubbleIcon'
import { EnvelopeIcon } from '@/components/icons/EnvelopeIcon'
import { UsersIcon } from '@/components/icons/UsersIcon'
import { PaperClipIcon } from '@/components/icons/PaperClipIcon'

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface NavGroup {
  title: string
  links: Array<NavItem>
}

function useInitialValue<T>(value: T, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

function TopLevelNavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li className="md:hidden">
      <CloseButton
        as={Link}
        href={href}
        className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </CloseButton>
    </li>
  )
}

function NavLink({
  href,
  children,
  icon: Icon,
  tag,
  active = false,
  isAnchorLink = false,
}: {
  href: string
  children: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
  tag?: string
  active?: boolean
  isAnchorLink?: boolean
}) {
  return (
    <CloseButton
      as={Link}
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'group flex items-center gap-3 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? 'text-zinc-900 dark:text-white'
          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
      )}
    >
      {Icon && (
        <Icon
          className={clsx(
            'h-5 w-5 flex-none',
            active
              ? 'stroke-emerald-500'
              : 'stroke-zinc-400 group-hover:stroke-zinc-600 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-300',
          )}
        />
      )}
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="zinc">
          {tag}
        </Tag>
      )}
    </CloseButton>
  )
}


function ActivePageMarker({
  group,
  pathname,
}: {
  group: NavGroup
  pathname: string
}) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex = group.links.findIndex((link) => link.href === pathname)
  let top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-emerald-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

function NavigationGroup({
  group,
  className,
}: {
  group: NavGroup
  className?: string
}) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let pathname = useInitialValue(
    usePathname(),
    isInsideMobileNavigation,
  )

  let isActiveGroup =
    group.links.findIndex((link) => link.href === pathname) !== -1

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-zinc-900 dark:text-white"
      >
        {group.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <ul role="list">
          {group.links.map((link) => (
            <motion.li key={link.href} layout="position" className="relative">
              <NavLink
                href={link.href}
                icon={link.icon}
                active={link.href === pathname}
              >
                {link.title}
              </NavLink>
              {/* Anchor links are omitted in the sidebar */}
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export const navigation: Array<NavGroup> = [
  {
    title: 'Guides',
    links: [
      { title: 'Introduction', href: '/docs', icon: BookIcon },
      { title: 'Quickstart', href: '/docs/quickstart', icon: BoltIcon },
      { title: 'SDKs', href: '/docs/sdks', icon: SquaresPlusIcon },
      { title: 'Authentication', href: '/docs/authentication', icon: CheckIcon },
      { title: 'Pagination', href: '/docs/pagination', icon: ListIcon },
      { title: 'Errors', href: '/docs/errors', icon: BellIcon },
      { title: 'Webhooks', href: '/docs/webhooks', icon: LinkIcon },
    ],
  },
  {
    title: 'Resources',
    links: [
      { title: 'Contacts', href: '/docs/contacts', icon: UserIcon },
      { title: 'Conversations', href: '/docs/conversations', icon: ChatBubbleIcon },
      { title: 'Messages', href: '/docs/messages', icon: EnvelopeIcon },
      { title: 'Groups', href: '/docs/groups', icon: UsersIcon },
      { title: 'Attachments', href: '/docs/attachments', icon: PaperClipIcon },
    ],
  },
]

export function Navigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav {...props}>
      <ul role="list">
        <TopLevelNavItem href="/docs">API</TopLevelNavItem>
        <TopLevelNavItem href="/docs">Documentation</TopLevelNavItem>
        <TopLevelNavItem href="#">Support</TopLevelNavItem>
        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? 'md:mt-0' : ''}
          />
        ))}
        <li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
          <Button href="#" variant="filled" className="w-full">
            Sign in
          </Button>
        </li>
      </ul>
    </nav>
  )
}
