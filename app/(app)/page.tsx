import { serverClient } from "@/lib/supabase/server";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";

export default async function Home() {
  const supabase = serverClient();

  const { data: evaluations, error } = await supabase
    .from("evaluations")
    .select();

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>{error.message}</h2>
      </main>
    );
  }

  return (
    <>
      <Button>Click me</Button>
      <ul>
        {evaluations?.map((evaluation) => (
          <li key={evaluation.id}>
            {evaluation.id}
            {evaluation.created_at}
            {evaluation.status}
            {evaluation.debt}
          </li>
        ))}
      </ul>
    </>
  );
}
