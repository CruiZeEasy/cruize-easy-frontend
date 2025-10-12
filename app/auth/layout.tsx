"use client";
import { Footer } from "@/components/shared/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PATHS } from "@/utils/path";

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

              <Link href={PATHS.HOME}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="absolute top-6 left-10 cursor-pointer"
                >
                  <Image
                    src="/images/icons/arrow-left-desktop.svg"
                    alt="Arrow Left"
                    width={34}
                    height={34}
                    className="block"
                    priority
                  />
                </motion.div>
              </Link>
            </div>
            <div className="flex flex-col justify-center">
              <Link href={PATHS.HOME} className="md:hidden mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-fit"
                >
                  <Image
                    src="/images/icons/arrow-left-mobile.svg"
                    alt="Arrow Left"
                    width={34}
                    height={34}
                    className="block"
                    priority
                  />
                </motion.div>
              </Link>

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
