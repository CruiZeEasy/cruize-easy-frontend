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

      <div></div>

      {/* Main content area */}
      <main
        className="flex-1 p-4 md:p-6 overflow-y-auto"
        style={{
          WebkitOverflowScrolling: "touch", // ✅ enables smooth native scroll on iOS
          overscrollBehaviorY: "contain", // ✅ prevents bounce/backscroll
        }}
      >
        <div className="max-w-[1440px] w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
