import type { ReactNode } from "react";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, User as UserIcon } from "lucide-react";
import type { User } from "@/lib/types";
import { AppSidebar } from "./AppSidebar";
import { useUser } from "@/firebase";

type AppLayoutProps = {
  user: User; // This will be replaced by the authenticated user from `useUser`
  navItems: { href: string; icon: ReactNode; label: string }[];
  secondaryNavItems: { href: string; icon: ReactNode; label: string }[];
  children: ReactNode;
};

export function AppLayout({ navItems, secondaryNavItems, children }: AppLayoutProps) {
  const { user, loading } = useUser();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  const displayName = user?.displayName || user?.email || "User";
  const avatarUrl = user?.photoURL;


  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <AppSidebar navItems={navItems} secondaryNavItems={secondaryNavItems} />
        <div className="flex flex-1 flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <SidebarTrigger className="sm:hidden" />
              <div className="relative ml-auto flex-1 md:grow-0" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={avatarUrl ?? undefined} alt={displayName} />
                      <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                   <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
            <main className="flex-1 p-4 sm:p-6 sm:pt-0">
                {children}
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
