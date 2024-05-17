import { serverClient } from "@/lib/supabase/server";

import Summery from "@/components/dashboard/Summery";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";

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

export default async function Home() {
  const supabase = serverClient();

  const { data, error } = await supabase
    .from("evaluations")
    .select(`*, client_id(id, full_name)`)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>{error.message}</h2>
      </main>
    );
  }

  const evaluations = data as Evaluation[];

  return (
    <>
      <Summery evaluations={evaluations} />
      <DataTable columns={columns} data={evaluations} />
    </>
  );
}
