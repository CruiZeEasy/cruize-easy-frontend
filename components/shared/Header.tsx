"use client";

import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-primary-dark rounded-b-[30px]">
      <div className="max-w-[1440px] mx-auto">
        <section className="bg-[url('/images/hero/hero-bg-3.png')] bg-cover bg-center h-[500px] w-full px-4 sm:px-6 lg:px-8 pt-8 rounded-b-[30px]">
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
      </div>
    </header>
  );
}
