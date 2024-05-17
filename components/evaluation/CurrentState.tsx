"use clietn";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const caseState = {
  Open: "The case is currently open and awaiting further action.",
  "Pending Samples": "The case is pending samples, which need to be collected.",
  "In Progress": "Testing has started and is currently being conducted.",
  Confirmation:
    "The case is in the confirmation stage, where results are being verified.",
  Completed:
    "The case has been completed and all necessary actions have been taken.",
  Closed: "The case is closed and no further actions are required.",
};

export default function CurrentState({
  currentState,
  loading,
}: {
  currentState: string | undefined;
  loading: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 border-t border-border p-6">
      <span className="font-mono text-xl font-bold text-concrete-400">
        Case Status:
      </span>
      <div className="mb-3 flex flex-col gap-1">
        <div className="flex w-full flex-col gap-2 border border-border p-4">
          <span className={"text-primary"}>
            {loading ? <Skeleton className="h-6 w-28" /> : currentState}
          </span>

          <span className="text-xs">{caseState[currentState]}</span>
        </div>
      </div>

      {loading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Button
          variant="default"
          className="w-full"
          disabled={currentState == "Completed" || currentState == "Closed"}
        >
          Next step
        </Button>
      )}
    </div>
  );
}
