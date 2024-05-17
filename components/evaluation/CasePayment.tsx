"use clietn";

import { browserClient } from "@/lib/supabase/client";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function CasePayment({
  id,
  debtState,
  loading,
}: {
  id: number | undefined;
  debtState: string | undefined;
  loading: boolean;
}) {
  const supabase = browserClient();

  async function updateDebt() {
    const { data, error } = await supabase
      .from("evaluations")
      .update({ debt: false })
      .eq("id", id)
      .select();

    console.log(error);
    console.log(data);
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
        <Button
          variant="default"
          className="w-full"
          disabled={!debtState}
          onClick={() => updateDebt()}
        >
          Pay
        </Button>
      )}
    </div>
  );
}
