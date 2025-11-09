import { BackButton } from "@/components/ui/BackButton";

export default function PermissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-100px)] flex-col justify-center bg-white">
      <main className="max-w-[1440px] mx-auto w-full">
        <div className="mx-4 my-4">
          {/* <div>
            <BackButton variant="mobile" showOnDesktop />
          </div> */}
          <div>{children}</div>
        </div>
      </main>
    </div>
  );
}
