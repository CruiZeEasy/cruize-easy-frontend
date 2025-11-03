import HostSidebar from "@/components/shared/HostSidebar";

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}

      <HostSidebar />

      {/* Main content area */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-[1440px] w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
