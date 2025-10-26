import { BackButton } from "@/components/ui/BackButton";

export default function PermissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="max-w-[1440px] mx-auto w-full">
        <div className="mx-4 my-4 md:pt-4 md:px-4">
          <div>
            <BackButton variant="mobile" showOnDesktop />
          </div>
          <div>{children}</div>
        </div>
      </main>
    </div>
  );
}
