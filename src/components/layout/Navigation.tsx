'use client'

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import type { Dictionary } from '@/lib/i18n'

interface NavigationProps {
  locale: string
  dict: Dictionary
}

export function Navigation({ locale, dict }: NavigationProps) {
  const navigation = [
    { name: dict.common.features, href: '/features' },
    { name: dict.common.pricing, href: '/pricing' },
    {
      name: 'Resources',
      items: [
        {
          name: dict.common.docs,
          href: '/docs',
          description: 'Documentation and guides'
        },
        {
          name: dict.common.blog,
          href: '/blog',
          description: 'Latest articles and tutorials'
        },
        {
          name: dict.common.releases,
          href: '/releases',
          description: 'Release notes and changelog'
        },
      ]
    },
    { name: dict.common.about, href: '/about' },
  ]

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {navigation.map((item) => (
          <NavigationMenuItem key={item.name}>
            {'items' in item ? (
              <>
                <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {item.items.map((subItem) => (
                      <li key={subItem.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/${locale}${subItem.href}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {subItem.name}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {subItem.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={`/${locale}${item.href}`} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.name}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
