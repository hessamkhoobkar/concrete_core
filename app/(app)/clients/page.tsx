import { serverClient } from "@/lib/supabase/server";

export default async function ClientPage() {
  const supabase = serverClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(`*`)
    .eq("role", "Client");

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>{error.message}</h2>
      </main>
    );
  }

  return (
    <div className="pt-16">
      <div className="grid w-full grid-cols-3 gap-4">
        {data.map((client) => (
          <div
            key={client.id}
            className="col-span-1 row-span-1 flex flex-col bg-card p-4"
          >
            <div className="flex w-full justify-between gap-2">
              <span className="font-mono font-bold text-concrete-400">
                Full name:
              </span>
              <span>{client.full_name}</span>
            </div>
            <div className="flex w-full justify-between gap-2">
              <span className="font-mono font-bold text-concrete-400">
                Gender:
              </span>
              <span>{client.gender}</span>
            </div>
            <div className="flex w-full justify-between gap-2">
              <span className="font-mono font-bold text-concrete-400">
                Email:
              </span>
              <span>{client.email}</span>
            </div>
            <div className="flex w-full justify-between gap-2">
              <span className="font-mono font-bold text-concrete-400">
                Phone number:
              </span>
              <span>{client.phone_number}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
