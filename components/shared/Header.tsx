// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "../ui/Buttons";

// export function Header() {
//   return (
//     <header>
//       <div className="bg-primary-dark pb-8 rounded-b-[30px]">
//         <div className="max-w-[1440px] mx-auto">
//           <section className="bg-[url('/images/hero/hero-bg-mobile.webp')] sm:bg-[url('/images/hero/hero-bg-desktop.webp')] bg-cover bg-center h-[500px] w-full px-4 sm:px-6 lg:px-8 pt-4 rounded-b-[30px]">
//             <nav className="flex items-center justify-between ">
//               <Link href="/">
//                 <Image
//                   src="/images/logo/cruize-easy-logo.svg"
//                   alt="Cruize Easy Logo"
//                   width={192}
//                   height={38}
//                   className="w-40 lg:w-48 h-auto"
//                   quality={100}
//                 />
//               </Link>

//               <Button variant="primary" className="py-3">
//                 Get Started
//               </Button>
//             </nav>
//           </section>

//           <section className="font-gilroy-semibold text-white flex flex-col items-center justify-center mt-10 space-y-6 text-center px-4">
//             <h1 className="text-4xl sm:text-5xl">
//               Drive The Best{" "}
//               <span className="inline sm:hidden">
//                 <br />
//               </span>
//               Pay Less
//             </h1>

//             <p className="font-gilroy-medium text-base sm:text-[22px] ">
//               Affordable rentals with premium service <br />
//               for every journey.
//             </p>

//             <div className="space-x-8 hidden sm:block">
//               <Button variant="secondary">Sign up as a user</Button>
//               <Button variant="outline">Sign up as a Host</Button>
//             </div>
//           </section>
//         </div>
//       </div>

//       <div className="mt-6 sm:hidden flex items-center justify-between px-4 space-x-4">
//         <Button variant="primary" className="py-4" fullWidth>
//           Sign up as a user
//         </Button>
//         <Button variant="primary" className="py-4" fullWidth>
//           Sign up as a Host
//         </Button>
//       </div>
//     </header>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Buttons";
import { motion } from "framer-motion";

export function Header() {
  return (
    <header>
      <div className="bg-primary-dark pb-8 rounded-b-[30px]">
        <div className="max-w-[1440px] mx-auto">
          <section className="bg-[url('/images/hero/hero-bg-mobile.webp')] sm:bg-[url('/images/hero/hero-bg-desktop.webp')] bg-cover bg-center h-[500px] w-full px-4 sm:px-6 lg:px-8 pt-4 rounded-b-[30px]">
            {/* Navbar */}
            <nav className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Button variant="primary" className="py-3">
                  Get Started
                </Button>
              </motion.div>
            </nav>
          </section>

          {/* Hero Text */}
          <section className="font-gilroy-semibold text-white flex flex-col items-center justify-center mt-10 space-y-6 text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl"
            >
              Drive The Best{" "}
              <span className="inline sm:hidden">
                <br />
              </span>
              Pay Less
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-gilroy-medium text-base sm:text-[22px]"
            >
              Affordable rentals with premium service <br />
              for every journey.
            </motion.p>

            <motion.div
              className="space-x-8 hidden sm:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Button variant="secondary">Sign up as a user</Button>
              <Button variant="outline">Sign up as a Host</Button>
            </motion.div>
          </section>
        </div>
      </div>

      {/* Mobile Buttons */}
      <motion.div
        className="mt-6 sm:hidden flex items-center justify-between px-4 space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Button variant="primary" className="py-4" fullWidth>
          Sign up as a user
        </Button>
        <Button variant="primary" className="py-4" fullWidth>
          Sign up as a Host
        </Button>
      </motion.div>
    </header>
  );
}
