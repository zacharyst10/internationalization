/* eslint-disable @next/next/no-async-client-component */
'use client'

import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

export default async function HeroNav({ lang }: { lang: Locale }) {
  const { navigation, page } = await getDictionary(lang)

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {navigation.gettingStarted}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <li className='row-span-3'>
                <NavigationMenuLink asChild>
                  <a
                    className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                    href='/'
                  >
                    <div className='mb-2 mt-4 text-lg font-medium'>
                      {page.gettingStarted.shadcnUI}
                    </div>
                    <p className='text-sm leading-tight text-muted-foreground'>
                      {page.gettingStarted.subtext}
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem
                href='/docs'
                title={page.gettingStarted.introductionHeader}
              >
                {page.gettingStarted.introductionSubtext}
              </ListItem>
              <ListItem
                href='/docs/installation'
                title={page.gettingStarted.installationHeader}
              >
                {page.gettingStarted.installationSubtext}
              </ListItem>
              <ListItem
                href='/docs/primitives/typography'
                title={page.gettingStarted.typographyHeader}
              >
                {page.gettingStarted.typographySubtext}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{navigation.components}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
              {page.components.map(component => (
                <ListItem key={component.title} title={component.title}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/docs' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {navigation.documentation}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
