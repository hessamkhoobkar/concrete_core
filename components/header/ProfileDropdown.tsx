import { CreditCard, Keyboard, LogOut, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutMenuItem from "./logout";

export default function ProfileDropdown({
  avatar_url,
  full_name,
  email,
}: {
  avatar_url: string;
  full_name: string;
  email: string;
}) {
  const names = full_name.split(" ");
  const letters = names.map((name) => {
    return name[0].toUpperCase();
  });
  const initials = letters.join("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 p-0">
          <div className="flex flex-col items-end justify-start">
            <span className="font-mono text-base font-bold text-concrete-700">
              {full_name}
            </span>
            <span className="font-mono text-xs text-concrete-400">{email}</span>
          </div>
          <Avatar className="h-10 w-10 rounded-none border border-concrete-200">
            <AvatarImage src={avatar_url} />
            <AvatarFallback className="rounded-none">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
