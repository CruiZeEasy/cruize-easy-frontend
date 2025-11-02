import HostSidebar from "@/components/shared/HostSidebar";

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      <HostSidebar />

      {/* Main content area */}
      <main className="flex-1 p-4 md:p-6 bg-white overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
