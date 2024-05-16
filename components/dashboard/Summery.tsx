import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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

export default function Summery({
  evaluations,
}: {
  evaluations: Evaluation[];
}) {
  let openNumber = 0;
  let pendingNumber = 0;
  let inProgressNumber = 0;
  let confirmationNumber = 0;
  let UnpaidNumber = 0;

  evaluations.map((evaluation) => {
    if (evaluation.status === "Open") {
      openNumber++;
    }
    if (evaluation.status === "Pending Samples") {
      pendingNumber++;
    }
    if (evaluation.status === "In Progress") {
      inProgressNumber++;
    }
    if (evaluation.status === "Confirmation") {
      confirmationNumber++;
    }
    if (evaluation.status === "Open" && evaluation.debt) {
      UnpaidNumber++;
    }

    return;
  });

  const totalNumber =
    openNumber + pendingNumber + inProgressNumber + confirmationNumber;

  let openPercent = (openNumber * 100) / totalNumber;
  let pendingPercent = (pendingNumber * 100) / totalNumber;
  let inProgressPercent = (inProgressNumber * 100) / totalNumber;
  let confirmationPercent = (confirmationNumber * 100) / totalNumber;

  return (
    <div className="grid grid-cols-4 grid-rows-1 gap-4">
      <Card className="col-span-1 row-span-1">
        <CardHeader>
          <CardTitle className="font-mono">Unattended cases</CardTitle>
          <CardDescription>Number of open cases</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-6xl font-bold text-destructive">
            {openNumber}
          </span>
        </CardContent>
      </Card>
      <Card className="col-span-1 row-span-1">
        <CardHeader>
          <CardTitle className="font-mono">Unpaid cases</CardTitle>
          <CardDescription>Number of unpaid finished cases</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-6xl font-bold text-warning">
            {UnpaidNumber}
          </span>
        </CardContent>
      </Card>
      <Card className="col-span-2 row-span-1 flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="font-mono">In Progress States</CardTitle>
          <CardDescription>
            The portion of cases that are currently ongoing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full grow items-end justify-end gap-1">
            <div
              className="relative flex h-8 items-center justify-start bg-primary/100 px-2"
              style={{ width: `${openPercent}%` }}
            >
              <span className="absolute bottom-full left-0 font-mono text-xs text-concrete-400">
                Open
              </span>
              <span className="text-xl font-bold text-concrete-800">
                {openNumber}
              </span>
            </div>
            <div
              className="relative flex h-8 items-center justify-start bg-primary/70 px-2"
              style={{ width: `${pendingPercent}%` }}
            >
              <span className="absolute bottom-full left-0 font-mono text-xs text-concrete-400">
                Pending Samples
              </span>
              <span className="text-xl font-bold text-concrete-800">
                {pendingNumber}
              </span>
            </div>
            <div
              className="relative flex h-8 items-center justify-start bg-primary/30 px-2"
              style={{ width: `${inProgressPercent}%` }}
            >
              <span className="absolute bottom-full left-0 font-mono text-xs text-concrete-400">
                In Progress
              </span>
              <span className="text-xl font-bold text-primary">
                {inProgressNumber}
              </span>
            </div>
            <div
              className="relative flex h-8 items-center justify-start bg-primary/10 px-2"
              style={{ width: `${confirmationPercent}%` }}
            >
              <span className="absolute bottom-full left-0 font-mono text-xs text-concrete-400">
                Confirmation
              </span>
              <span className="text-xl font-bold text-primary">
                {confirmationNumber}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
