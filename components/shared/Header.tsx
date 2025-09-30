"use client";

import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-primary-dark pb-8 rounded-b-[30px]">
      <div className="max-w-[1440px] mx-auto">
        <section className="bg-[url('/images/hero/hero-bg-mobile.webp')] sm:bg-[url('/images/hero/hero-bg-desktop.webp')] bg-cover bg-center h-[500px] w-full px-4 sm:px-6 lg:px-8 pt-4 rounded-b-[30px]">
          <div className="flex items-center justify-between ">
            <Link href="/">
              <Image
                src="/images/logo/cruize-easy-logo.svg"
                alt="Cruize Easy Logo"
                width={192}
                height={38}
                className="w-40 lg:w-48 h-auto"
                quality={100}
              />
            </Link>

            <button
              className="bg-primary hover:bg-primary-dark text-white text-sm px-6 py-3 rounded-lg cursor-pointer 
             hover:shadow-lg hover:scale-[1.02] active:scale-95 transition duration-200 font-gilroy-semibold"
            >
              Get Started
            </button>
          </div>
        </section>

        <section className="font-gilroy-semibold text-white flex flex-col items-center justify-center mt-10 space-y-6 text-center px-4">
          <h1 className="text-4xl sm:text-5xl">
            Drive The Best{" "}
            <span className="inline sm:hidden">
              <br />
            </span>
            Pay Less
          </h1>

          <p className="font-gilroy-medium leading-relaxed text-base sm:text-[22px] ">
            Affordable rentals with premium service <br />
            for every journey.
          </p>

          <div className="space-x-8 hidden sm:block">
            <button
              className="bg-white text-red-accent text-sm px-6 py-4 rounded-lg cursor-pointer 
             shadow-lg hover:scale-[1.02] active:scale-95 transition duration-200 font-gilroy-semibold"
            >
              Sign up as a user
            </button>
            <button
              className="bg-primary text-white border border-white text-sm px-6 py-4 rounded-lg cursor-pointer 
             shadow-lg hover:scale-[1.02] active:scale-95 transition duration-200 font-gilroy-semibold"
            >
              Sign up as a Host
            </button>
          </div>
        </section>
      </div>
    </header>
  );
}
