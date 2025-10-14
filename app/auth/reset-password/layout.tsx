import { BackButton } from "@/components/ui/BackButton";
import { Footer } from "@/components/shared/Footer";
import { MobileAuthHeader } from "@/components/shared/MobileAuthHeader";

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white md:bg-neutral-100">
      <main className="max-w-[1440px] mx-auto w-full mb-28">
        <div className="bg-white mx-4 mt-4 md:pt-4 md:px-4  md:pb-12  md:border md:border-neutral-300 md:rounded-[30px]">
          <div className="hidden md:block">
            <BackButton variant="mobile" showOnDesktop />
          </div>
          <div className="flex flex-col md:items-center md:justify-center">
            <MobileAuthHeader />

            {children}
          </div>
        </div>
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}
