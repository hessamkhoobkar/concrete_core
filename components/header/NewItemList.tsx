import { FilePlus, UserPlus, FolderPlus, PackagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function NewItemReq() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="text-white hover:text-concrete-800"
        >
          <FilePlus className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <Link href="/evaluations/new">
          <DropdownMenuItem className="cursor-pointer">
            <FolderPlus className="mr-2 h-4 w-4" />
            <span>Add new evaluation</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/samples/new">
          <DropdownMenuItem className="cursor-pointer">
            <PackagePlus className="mr-2 h-4 w-4" />
            <span>Add new sample</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
