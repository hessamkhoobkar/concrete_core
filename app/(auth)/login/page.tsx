import { login } from "./actions";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card className="absolute -right-72 z-10 w-full max-w-md">
      <CardHeader className="mb-4">
        <CardTitle>Concrete Core</CardTitle>
        <CardDescription>
          Your Gateway to Efficient and Accurate Lab Management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-col gap-3">
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex w-full flex-col gap-3">
            <Label htmlFor="password">Password:</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="******"
              required
            />
          </div>
          <Button className="mt-7" formAction={login}>
            Log in
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
