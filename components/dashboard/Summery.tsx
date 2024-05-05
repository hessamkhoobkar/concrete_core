import { Card, CardContent } from "@/components/ui/card";

export default function Summery() {
  return (
    <div className="grid grid-cols-4 grid-rows-1 gap-4">
      <Card className="col-span-1 row-span-1">
        <CardContent>Hello world</CardContent>
      </Card>
      <Card className="col-span-1 row-span-1">
        <CardContent>Hello world</CardContent>
      </Card>
      <Card className="col-span-2 row-span-1">
        <CardContent>Hello world</CardContent>
      </Card>
    </div>
  );
}
