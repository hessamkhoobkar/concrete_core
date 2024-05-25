"use client";

import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ExternalLink } from "lucide-react";

export function LoginAlertDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Getting updated
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-4 py-4">
            <p>
              I was moving this application from Next.js 11 and MySQL DB stack
              to Next.js 14 and Supabase.
            </p>
            <p>
              With the announcement of Next.js 15, I am putting this project on
              hold until it&apos;s released. Currently, it&apos;s only
              showcasing authentication, database read, and some minor updates.
            </p>
            <p>In the meantime, you can always check the following demos.</p>
            <p className="flex gap-4 text-primary underline">
              <a
                className="flex items-center justify-center gap-1"
                href="https://helpdesk-next-mu.vercel.app/"
              >
                <span>Help Desk</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                className="flex items-center justify-center gap-1"
                href="https://parallel-universe-archive.vercel.app/"
              >
                <span>Parallel Universe</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
