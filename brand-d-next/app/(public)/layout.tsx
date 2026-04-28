import Navbar from "@/components/layout/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col pt-16 lg:pt-[72px]">
        {children}
      </main>
    </>
  );
}
