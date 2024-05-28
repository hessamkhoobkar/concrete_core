"use client";

import { useRouter } from "next/navigation";
import { browserClient } from "@/lib/supabase/client";

import { LogOut } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

export default function LogoutMenuItem() {
  const supabase = browserClient();
  const router = useRouter();

  async function callSignOut() {
    let { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    } else {
      router.push("/login");
    }
  }

  return (
    <DropdownMenuItem className="cursor-pointer" onClick={() => callSignOut()}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
