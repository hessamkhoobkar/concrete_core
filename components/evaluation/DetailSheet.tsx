"use client";

import { browserClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SquareArrowOutUpRight } from "lucide-react";
import { DateFormater, caseId } from "@/lib/tableData";
import { Skeleton } from "../ui/skeleton";

interface ProfileType {
  id: string;
  full_name: string;
}

interface Evaluation {
  id: number;
  created_at: string;
  updated_at: string;
  client_id: ProfileType;
  status: string;
  debt: boolean;
}

export default function DetailSheet({ id }: { id: number }) {
  const supabase = browserClient();

  const [activeEvaluation, setActiveEvaluation] = useState<Evaluation>();
  const [openCall, setOpenCall] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getEvaluations = useCallback(async () => {
    const { data: evaluation, error } = await supabase
      .from("evaluations")
      .select(`*, client_id(id, full_name)`)
      .eq("id", id);

    if (evaluation) {
      setActiveEvaluation(evaluation[0]);
      setLoading(false);
    }
  }, [id, supabase, setActiveEvaluation]);

  useEffect(() => {
    console.log("useEffect triggered: openCall =", openCall);
    if (openCall) {
      console.log("Calling getEvaluations");
      getEvaluations();
    }
  }, [openCall, getEvaluations]);

  return (
    <Sheet onOpenChange={(open: boolean) => open && setOpenCall(true)}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <span className="sr-only">Open Details</span>
          <SquareArrowOutUpRight className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="p-6">
          <SheetTitle>Case Details</SheetTitle>
          <SheetDescription>
            Case details and last state of samples and the case.
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 border-t border-border p-6">
          <div className="flex flex-col">
            <span className="text-xs text-concrete-400">Case ID:</span>
            <span className="">
              {loading ? (
                <Skeleton className="mt-1 h-4 w-28" />
              ) : activeEvaluation ? (
                caseId(activeEvaluation?.id)
              ) : (
                "NA"
              )}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-concrete-400">Customer:</span>
            <span className="">
              {loading ? (
                <Skeleton className="mt-1 h-4 w-28" />
              ) : activeEvaluation ? (
                activeEvaluation?.client_id.full_name
              ) : (
                "NA"
              )}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-concrete-400">Entry Date:</span>
            <span className="">
              {loading ? (
                <Skeleton className="mt-1 h-4 w-28" />
              ) : activeEvaluation ? (
                DateFormater(activeEvaluation.created_at)
              ) : (
                "NA"
              )}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-concrete-400">Result Date:</span>
            <span className="">
              {loading ? (
                <Skeleton className="mt-1 h-4 w-28" />
              ) : activeEvaluation ? (
                DateFormater(activeEvaluation.updated_at)
              ) : (
                "NA"
              )}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-border p-6">
          <span className="font-mono text-xl font-bold text-concrete-400">
            Payment Status:
          </span>
          <div className="mb-3 flex flex-col gap-1">
            <span
              className={
                activeEvaluation?.debt ? "text-destructive" : "text-primary"
              }
            >
              {loading ? (
                <Skeleton className="h-6 w-28" />
              ) : activeEvaluation?.debt ? (
                "Unpaid"
              ) : (
                "Paid"
              )}
            </span>
            <span className="text-xs">
              {activeEvaluation?.debt
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
              disabled={!activeEvaluation?.debt}
            >
              Pay
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
