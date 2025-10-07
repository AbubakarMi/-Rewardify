"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Award, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "@/firebase";
import { signOut } from "firebase/auth";

type AppSidebarProps = {
    navItems: { href: string; icon: ReactNode; label: string }[];
    secondaryNavItems: { href:string; icon: ReactNode; label: string }[];
}

export function AppSidebar({ navItems, secondaryNavItems }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/login');
    }
  }

  return (
    <Sidebar className="hidden border-r bg-background sm:flex">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 font-semibold">
            <Award className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl">Rewardify</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  {item.icon}
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {secondaryNavItems.map((item) => (
             <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton tooltip={item.label}>
                    {item.icon}
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
             </SidebarMenuItem>
          ))}
           <Separator className="my-1" />
           <SidebarMenuItem>
              <SidebarMenuButton tooltip="Log out" onClick={handleSignOut}>
                <LogOut />
                <span className="group-data-[collapsible=icon]:hidden">Log Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
