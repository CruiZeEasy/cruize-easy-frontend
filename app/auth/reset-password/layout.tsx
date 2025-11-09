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
        <div className=" mx-4 mt-4 md:px-4 bg-white md:border md:border-neutral-300 md:rounded-[30px]">
          <div className="flex flex-col md:items-center md:justify-center md:py-12">
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
