// "use client";
// import React from "react";
// import { Button } from "@/components/ui/Buttons";
// import { FormInput } from "@/components/ui/FormInput";
// import Image from "next/image";
// import Link from "next/link";
// import { PATHS } from "@/utils/path";

// export default function SignUpPage() {
//   return (
//     <div className="flex flex-col items-center md:pl-4 md:pr-12 md:py-12">
//       <Image
//         src="/images/logo/cruize-easy-logo-icon.svg"
//         alt="Cruize Easy Logo Icon"
//         width={70}
//         height={70}
//         quality={100}
//         className="w-12 h-auto"
//         priority
//       />
//       <h1 className="font-modulus-semibold text-[26px] mb-12">Sign Up</h1>

//       <form className="w-full">
//         <div className="space-y-2 mb-10 md:mb-12">
//           <FormInput
//             id="fullName"
//             label="Full Name"
//             type="text"
//             placeholder="Full Name"
//           />
//           <FormInput
//             id="email"
//             label="Email Address"
//             type="email"
//             placeholder="email@gmail.com"
//           />
//           <FormInput
//             id="password"
//             label="Password"
//             type="password"
//             placeholder="Password"
//           />
//         </div>

//         <Button
//           type="submit"
//           variant="dark-primary"
//           fontFamily="inter"
//           fullWidth
//           shadow="shadow-none"
//           className="p-4 text-xs mb-10 md:mb-12"
//           onClick={(e) => e.preventDefault()}
//         >
//           Sign Up
//         </Button>

//         {/* Divider Line */}
//         <div className="flex items-center justify-center mb-4 md:mb-6">
//           <div className="h-px bg-primary-dark w-full md:w-[10rem]"></div>
//           <span className="mx-2 text-primary-dark text-sm font-inter">or</span>
//           <div className="h-px bg-primary-dark w-full md:w-[10rem]"></div>
//         </div>

//         <Button
//           variant="sign_up_with_google"
//           fontFamily="poppins"
//           fullWidth
//           shadow="shadow-[0px_-2px_30px_rgba(0,0,0,0.02),_0px_2px_30px_rgba(0,0,0,0.05)]"
//           className="mb-4 md:mb-6"
//           onClick={(e) => e.preventDefault()}
//         >
//           <span>
//             <Image
//               src="/images/icons/google-icon.svg"
//               alt="Google Icon"
//               width={20}
//               height={20}
//               className="inline mr-2"
//             />
//             Sign Up with Google
//           </span>
//         </Button>

//         <p className="font-gilroy-medium text-sm text-center">
//           If you have an account?{" "}
//           <Link href={PATHS.AUTH.LOGIN} className="text-primary-dark">
//             Log in here
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import Image from "next/image";
import Link from "next/link";
import { PATHS } from "@/utils/path";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate signup action (for now just fake a delay)
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center md:pl-4 md:pr-12 md:py-12"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Image
          src="/images/logo/cruize-easy-logo-icon.svg"
          alt="Cruize Easy Logo Icon"
          width={70}
          height={70}
          quality={100}
          className="w-12 h-auto"
          priority
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="font-modulus-semibold text-[26px] mb-12"
      >
        Sign Up
      </motion.h1>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        className="w-full"
      >
        <div className="space-y-2 mb-10 md:mb-12">
          <FormInput
            id="fullName"
            label="Full Name"
            type="text"
            placeholder="Full Name"
          />
          <FormInput
            id="email"
            label="Email Address"
            type="email"
            placeholder="email@gmail.com"
          />
          <FormInput
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="dark-primary"
          fontFamily="inter"
          fullWidth
          shadow="shadow-none"
          className="p-4 text-xs mb-10 md:mb-12"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>

        {/* Divider */}
        <div className="flex items-center justify-center mb-4 md:mb-6">
          <div className="h-px bg-primary-dark w-full md:w-[10rem]" />
          <span className="mx-2 text-primary-dark text-sm font-inter">or</span>
          <div className="h-px bg-primary-dark w-full md:w-[10rem]" />
        </div>

        {/* Google Button */}
        <Button
          variant="sign_up_with_google"
          fontFamily="poppins"
          fullWidth
          shadow="shadow-[0px_-2px_30px_rgba(0,0,0,0.02),_0px_2px_30px_rgba(0,0,0,0.05)]"
          className="mb-4 md:mb-6 hover:bg-neutral-100 transition-colors duration-200"
          onClick={(e) => e.preventDefault()}
        >
          <span>
            <Image
              src="/images/icons/google-icon.svg"
              alt="Google Icon"
              width={20}
              height={20}
              className="inline mr-2"
            />
            Sign Up with Google
          </span>
        </Button>

        {/* Login Redirect */}
        <p className="font-gilroy-medium text-sm text-center">
          If you have an account?{" "}
          <Link
            href={PATHS.AUTH.LOGIN}
            className="text-primary-dark hover:underline transition-all"
          >
            Log in here
          </Link>
        </p>
      </motion.form>
    </motion.div>
  );
}
