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
      <main className="flex min-h-screen flex-col items-center justify-start p-24">
        {children}
      </main>
    </>
  );
}
