"use client"

import * as React from "react"
import {
  HomeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  ArrowRightStartOnRectangleIcon
} from "@heroicons/react/20/solid"
import {
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarSection,
  SidebarItem,
  SidebarLabel,
  SidebarHeading,
  SidebarSpacer,
  SidebarDivider
} from "./sidebar"
import { Avatar } from "./avatar"
import { Dropdown, DropdownButton, DropdownMenu, DropdownItem, DropdownDivider, DropdownLabel } from "./dropdown"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Dropdown>
          <DropdownButton as={SidebarItem} className="mb-2.5">
            <Avatar src="/tailwind-logo.svg" />
            <SidebarLabel>Tailwind Labs</SidebarLabel>
            <ChevronDownIcon className="ml-auto w-5 h-5 flex-shrink-0 text-zinc-400" />
          </DropdownButton>
          <DropdownMenu className="min-w-80" anchor="bottom start">
            <DropdownItem href="/teams/1/settings">
              <Cog6ToothIcon className="w-5 h-5 flex-shrink-0 text-zinc-400" />
              <DropdownLabel>Settings</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem href="/teams/1">
              <Avatar slot="icon" src="/tailwind-logo.svg" />
              <DropdownLabel>Tailwind Labs</DropdownLabel>
            </DropdownItem>
            <DropdownItem href="/teams/2">
              <Avatar slot="icon" initials="WC" className="bg-purple-500 text-white" />
              <DropdownLabel>Workcation</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem href="/teams/create">
              <PlusIcon className="w-5 h-5 flex-shrink-0 text-zinc-400" />
              <DropdownLabel>New team…</DropdownLabel>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <SidebarSection>
          <SidebarItem href="/search">
            <MagnifyingGlassIcon className="w-5 h-5 flex-shrink-0 text-zinc-400" />
            <SidebarLabel>Search</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/inbox">
            <InboxIcon className="w-5 h-5 flex-shrink-0 text-zinc-400" />
            <SidebarLabel>Inbox</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>
          <SidebarItem href="/">
            <HomeIcon className="w-5 h-5 flex-shrink-0 text-zinc-400" />
            <SidebarLabel>Home</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/events">
            <SparklesIcon className="w-5 h-5 flex-shrink-0 text-zinc-400" />
            <SidebarLabel>Events</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/orders">
            <SparklesIcon className="w-5 h-5 flex-shrink-0 text-zinc-400" />
            <SidebarLabel>Orders</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/broadcasts">
            <SparklesIcon className="w-5 h-5 flex-shrink-0 text-zinc-400" />
            <SidebarLabel>Broadcasts</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/settings">
            <Cog6ToothIcon className="w-5 h-5 flex-shrink-0 text-zinc-400" />
            <SidebarLabel>Settings</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
        <SidebarSection>
          <SidebarHeading>Upcoming Events</SidebarHeading>
          <SidebarItem href="/events/1">Bear Hug: Live in Concert</SidebarItem>
          <SidebarItem href="/events/2">Viking People</SidebarItem>
          <SidebarItem href="/events/3">Six Fingers — DJ Set</SidebarItem>
          <SidebarItem href="/events/4">We All Look The Same</SidebarItem>
        </SidebarSection>
        <SidebarSpacer />
        <SidebarSection>
          <SidebarItem href="/support">
            <QuestionMarkCircleIcon className="w-5 h-5 flex-shrink-0 text-zinc-400" />
            <SidebarLabel>Support</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/changelog">
            <SparklesIcon className="w-5 h-5 flex-shrink-0 text-zinc-400" />
            <SidebarLabel>Changelog</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarBody>
      <SidebarFooter>
        <Dropdown>
          <DropdownButton as={SidebarItem}>
            <span className="flex min-w-0 items-center gap-3">
              <Avatar src="/profile-photo.jpg" className="size-10" square alt="" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-zinc-950 dark:text-white">Erica</span>
                <span className="block truncate text-xs font-normal text-zinc-500 dark:text-zinc-400">
                  erica@example.com
                </span>
              </span>
            </span>
            <ChevronUpIcon className="ml-auto w-5 h-5 flex-shrink-0 text-zinc-400" />
          </DropdownButton>
          <DropdownMenu className="min-w-64" anchor="top start">
            <DropdownItem href="/my-profile">
              <UserIcon className="w-5 h-5 flex-shrink-0 text-zinc-400" />
              <DropdownLabel>My profile</DropdownLabel>
            </DropdownItem>
            <DropdownItem href="/settings">
              <Cog6ToothIcon className="w-5 h-5 flex-shrink-0 text-zinc-400" />
              <DropdownLabel>Settings</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem href="/privacy-policy">
              <ShieldCheckIcon className="w-5 h-5 flex-shrink-0 text-zinc-400" />
              <DropdownLabel>Privacy policy</DropdownLabel>
            </DropdownItem>
            <DropdownItem href="/share-feedback">
              <LightBulbIcon className="w-5 h-5 flex-shrink-0 text-zinc-400" />
              <DropdownLabel>Share feedback</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem href="/logout">
              <ArrowRightStartOnRectangleIcon className="w-5 h-5 flex-shrink-0 text-zinc-400" />
              <DropdownLabel>Sign out</DropdownLabel>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </SidebarFooter>
    </Sidebar>
  )
} 