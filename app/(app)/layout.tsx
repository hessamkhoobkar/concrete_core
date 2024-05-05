import { redirect } from "next/navigation";

import { serverClient } from "@/lib/supabase/server";
import Header from "@/components/layout/Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = serverClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col p-4">
        {children}
      </main>
    </>
  );
}
