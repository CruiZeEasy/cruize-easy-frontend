import { Footer } from "@/components/shared/Footer";
import Image from "next/image";
import { BackButton } from "@/components/ui/BackButton";
import { MobileAuthHeader } from "@/components/shared/MobileAuthHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white md:bg-neutral-100">
      <main className="max-w-[1440px] mx-auto w-full mb-28">
        <div className="bg-white mx-4 mt-4 md:pt-4 md:pb-12 md:border md:border-neutral-300 md:rounded-[30px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div className="pl-4 relative hidden md:block">
              <Image
                src="/images/auth/car.webp"
                alt="Black sports car illustration for auth page"
                width={500}
                height={500}
                className="h-full w-full object-cover rounded-[30px]"
              />
              <BackButton variant="desktop" />
            </div>
            <div className="flex flex-col ">
              <MobileAuthHeader />

              {children}
            </div>
          </div>
        </div>
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}
