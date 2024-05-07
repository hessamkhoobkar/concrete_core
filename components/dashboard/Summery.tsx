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
  return (
    <div className="grid grid-cols-4 grid-rows-1 gap-4">
      <Card className="col-span-1 row-span-1">
        <CardContent>Hello world</CardContent>
      </Card>
      <Card className="col-span-1 row-span-1">
        <CardContent>Open and on going</CardContent>
      </Card>
      <Card className="col-span-2 row-span-1">
        <CardHeader>
          <CardTitle>Evaluations results</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="h-8 w-8 bg-primary"></div>
            <div className="flex grow">
              <div className="h-4 w-3/4 bg-primary"></div>
              <div className="h-4 w-1/4 bg-destructive"></div>
            </div>
            <div className="flex w-24 flex-col">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-primary"></div>
                <span className="text-xs">Sucssesed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-destructive"></div>
                <span className="text-xs">Failed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
