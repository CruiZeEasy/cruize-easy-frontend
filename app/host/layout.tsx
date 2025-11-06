import HostSidebar from "@/components/shared/HostSidebar";

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen md:h-screen">
      {/* Sidebar */}

      <HostSidebar />

      {/* Main content area */}
      <main className="flex-1 p-4 md:py-6 md:px-12 md:overflow-y-auto">
        <div className="max-w-[1440px] w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
