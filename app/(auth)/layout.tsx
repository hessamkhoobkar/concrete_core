import Image from "next/image";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid h-full min-h-screen w-screen grid-cols-3 grid-rows-1 gap-12">
      <div className="relative col-span-1 row-span-1 flex items-center justify-center">
        {children}
      </div>
      <div className="relative col-span-2 row-span-1">
        <Image
          src="/login-bg.jpg"
          alt="log-in page"
          fill
          className="opacity-60"
        />
      </div>
    </main>
  );
}
