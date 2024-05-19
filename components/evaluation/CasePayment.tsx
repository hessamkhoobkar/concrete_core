"use clietn";

import { useRouter } from "next/navigation";
import { browserClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function CasePayment({
  id,
  debtState,
  loading,
  updateValueReq,
}: {
  id: number | undefined;
  debtState: boolean | undefined;
  loading: boolean;
  updateValueReq: () => void;
}) {
  const supabase = browserClient();
  const router = useRouter();

  async function updateDebt() {
    const { data, error } = await supabase
      .from("evaluations")
      .update({ debt: false })
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
      return;
    }

    updateValueReq();
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-4 border-t border-border p-6">
      <span className="font-mono text-xl font-bold text-concrete-400">
        Payment Status:
      </span>
      <div className="mb-3 flex flex-col gap-1">
        <span className={debtState ? "text-destructive" : "text-primary"}>
          {loading ? (
            <Skeleton className="h-6 w-28" />
          ) : debtState ? (
            "Unpaid"
          ) : (
            "Paid"
          )}
        </span>
        <span className="text-xs">
          {debtState
            ? "This case has outstanding invoices."
            : "This case payment has been successfully processed."}
        </span>
      </div>

      {loading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="w-full" disabled={!debtState}>
              Pay
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                You are about to set the payment of the case to resolve. This
                action in this demo cannot be undone, and the case will stay as
                paid.
              </DialogDescription>
            </DialogHeader>
            <div className="h-4 w-full"></div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="reset">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant="default"
                  type="submit"
                  onClick={() => updateDebt()}
                >
                  Set as paid
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
