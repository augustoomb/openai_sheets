'use client'

import { Home, LogOut, Banknote } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Transações",
    url: "/transactions",
    icon: Banknote,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gerenciador Financeiro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Button className="absolute bottom-5 left-5" onClick={() => signOut()}><LogOut /></Button>
      </SidebarContent>
    </Sidebar>
  )
}
