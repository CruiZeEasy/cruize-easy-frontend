import { Footer } from "@/components/shared/Footer";
import Image from "next/image";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="max-w-[1440px] mx-auto w-full">
        <div className="flex-1 mx-3 px-3 mt-4 pt-3 border border-neutral-300 rounded-[25px]">
          <div className="grid grid-cols-2">
            <div className="">
              {/* <Image
                src="/images/auth/car.png"
                alt="car image"
                width={500}
                height={500}
              /> */}
            </div>
            <div>{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
