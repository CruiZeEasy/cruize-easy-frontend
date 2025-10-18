// "use client";

// import React, { useState } from "react";
// import { API_BASE_URL } from "@/utils/api";
// import { API_ROUTES } from "@/utils/apiRoutes";
// import { Button } from "@/components/ui/Buttons";
// import Divider from "@/components/ui/Divider";
// import { FormInput } from "@/components/ui/FormInput";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { PATHS } from "@/utils/path";
// import { signupSchema, SignupFormData } from "@/schemas/auth/signupSchema";
// import { Toast } from "@/components/ui/Toast";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { registerUser } from "@/services/authService";
// import { useRouter } from "next/navigation";

// export default function SignUpPage() {
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState<{
//     message: string;
//     type: "success" | "error";
//   } | null>(null);
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//   } = useForm<SignupFormData>({
//     resolver: zodResolver(signupSchema),
//   });

//   // const passwordValue = watch("password");

//   const normalize = (str: string) => str.trim().replace(/\s+/g, " ");

//   const onSubmit = async (data: SignupFormData) => {
//     setLoading(true);
//     setToast(null);

//     const payload = {
//       ...data,
//       fullName: normalize(data.fullName),
//       email: data.email.trim(),
//       role: "ROLE_USER",
//     };

//     try {
//       const res = await registerUser(payload);

//       if (res?.success) {
//         setToast({
//           message:
//             "Registration successful! Check your email for OTP verification.",
//           type: "success",
//         });
//         reset();

//         setTimeout(() => {
//           router.push(
//             `${PATHS.AUTH.VERIFY_OTP}?email=${encodeURIComponent(
//               payload.email
//             )}&type=signup`
//           );
//         }, 1500);
//       } else {
//         throw new Error(res?.message || "An unexpected error occurred");
//       }
//     } catch (error: any) {
//       setToast({
//         message: error.message || "Email already in use or invalid input.",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
//       className="flex flex-col items-center md:pl-4 md:pr-12 md:py-12"
//     >
//       {/* Logo */}
//       <motion.div
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.6, duration: 0.3 }}
//       >
//         <Image
//           src="/images/logo/cruize-easy-logo-icon.svg"
//           alt="Cruize Easy Logo Icon"
//           width={70}
//           height={70}
//           quality={100}
//           className="w-12 h-auto"
//           priority
//         />
//       </motion.div>

//       {/* Title */}
//       <motion.h1
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.7, duration: 0.3 }}
//         className="font-modulus-semibold text-[26px] mb-12"
//       >
//         Sign Up
//       </motion.h1>

//       {/* Form */}
//       <motion.form
//         onSubmit={handleSubmit(onSubmit)}
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.8, duration: 0.3 }}
//         className="w-full"
//       >
//         <div className="space-y-6">
//           <div className="space-y-2">
//             <FormInput
//               id="fullName"
//               label="Full Name"
//               type="text"
//               autoComplete="name"
//               placeholder="Full Name"
//               {...register("fullName")}
//               error={errors.fullName?.message}
//             />

//             <FormInput
//               id="email"
//               label="Email Address"
//               type="email"
//               autoComplete="email"
//               placeholder="email@gmail.com"
//               {...register("email")}
//               error={errors.email?.message}
//             />

//             <FormInput
//               id="password"
//               label="Password"
//               type="password"
//               autoComplete="new-password"
//               placeholder="Password"
//               // showPasswordRules
//               // watchValue={passwordValue} Might need later, basically used for showing password rules
//               {...register("password")}
//               error={errors.password?.message}
//             />
//           </div>

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             variant="dark-primary"
//             fontFamily="inter"
//             fullWidth
//             shadow="shadow-none"
//             className="p-4 text-xs"
//             disabled={loading}
//             loading={loading}
//             loadingText="Creating Account..."
//           >
//             Sign Up
//           </Button>

//           {/* Divider */}
//           <Divider />

//           {/* Google Button */}
//           <Button
//             type="button"
//             variant="sign_up_with_google"
//             fontFamily="poppins"
//             fullWidth
//             shadow="shadow-[0px_-2px_30px_rgba(0,0,0,0.02),_0px_2px_30px_rgba(0,0,0,0.05)]"
//             className="hover:bg-neutral-100 transition-colors duration-200"
//             onClick={() => {
//               window.location.href = `${API_BASE_URL}${API_ROUTES.AUTH.GOOGLE}`;
//             }}
//           >
//             <span>
//               <Image
//                 src="/images/icons/google-icon.svg"
//                 alt="Google Icon"
//                 width={20}
//                 height={20}
//                 className="inline mr-2"
//               />
//               Sign Up with Google
//             </span>
//           </Button>

//           {/* Login Redirect */}
//           <p className="font-gilroy-medium text-sm text-center">
//             If you have an account?{" "}
//             <Link
//               href={PATHS.AUTH.LOGIN}
//               className="text-primary-dark hover:underline transition-all"
//             >
//               Log in here
//             </Link>
//           </p>
//         </div>
//       </motion.form>

//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}
//     </motion.div>
//   );
// }

// "use client";

// import React, { useState } from "react";
// import { API_BASE_URL } from "@/utils/api";
// import { API_ROUTES } from "@/utils/apiRoutes";
// import { Button } from "@/components/ui/Buttons";
// import Divider from "@/components/ui/Divider";
// import { FormInput } from "@/components/ui/FormInput";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { PATHS } from "@/utils/path";
// import { signupSchema, SignupFormData } from "@/schemas/auth/signupSchema";
// import { Toast } from "@/components/ui/Toast";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { registerUser } from "@/services/authService";
// import { usePageTransition } from "@/hooks/usePageTransition";
// import { Spinner } from "@/components/ui/Spinner";

// export default function SignUpPage() {
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState<{
//     message: string;
//     type: "success" | "error";
//   } | null>(null);
//   const { navigate, isNavigating } = usePageTransition();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//   } = useForm<SignupFormData>({
//     resolver: zodResolver(signupSchema),
//   });

//   const normalize = (str: string) => str.trim().replace(/\s+/g, " ");

//   const onSubmit = async (data: SignupFormData) => {
//     setLoading(true);
//     setToast(null);

//     const payload = {
//       ...data,
//       fullName: normalize(data.fullName),
//       email: data.email.trim(),
//       role: "ROLE_USER",
//     };

//     try {
//       const res = await registerUser(payload);

//       if (res?.success) {
//         setToast({
//           message:
//             "Registration successful! Check your email for OTP verification.",
//           type: "success",
//         });
//         reset();

//         setTimeout(() => {
//           navigate(
//             `${PATHS.AUTH.VERIFY_OTP}?email=${encodeURIComponent(
//               payload.email
//             )}&type=signup`
//           );
//         }, 1500);
//       } else {
//         throw new Error(res?.message || "An unexpected error occurred");
//       }
//     } catch (error: any) {
//       setToast({
//         message: error.message || "Email already in use or invalid input.",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
//         className="flex flex-col items-center md:pl-4 md:pr-12 md:py-12"
//       >
//         {/* Logo */}
//         <motion.div
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.3 }}
//         >
//           <Image
//             src="/images/logo/cruize-easy-logo-icon.svg"
//             alt="Cruize Easy Logo Icon"
//             width={70}
//             height={70}
//             quality={100}
//             className="w-12 h-auto"
//             priority
//           />
//         </motion.div>

//         {/* Title */}
//         <motion.h1
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7, duration: 0.3 }}
//           className="font-modulus-semibold text-[26px] mb-12"
//         >
//           Sign Up
//         </motion.h1>

//         {/* Form */}
//         <motion.form
//           onSubmit={handleSubmit(onSubmit)}
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8, duration: 0.3 }}
//           className="w-full"
//         >
//           <div className="space-y-6">
//             <div className="space-y-2">
//               <FormInput
//                 id="fullName"
//                 label="Full Name"
//                 type="text"
//                 autoComplete="name"
//                 placeholder="Full Name"
//                 {...register("fullName")}
//                 error={errors.fullName?.message}
//               />

//               <FormInput
//                 id="email"
//                 label="Email Address"
//                 type="email"
//                 autoComplete="email"
//                 placeholder="email@gmail.com"
//                 {...register("email")}
//                 error={errors.email?.message}
//               />

//               <FormInput
//                 id="password"
//                 label="Password"
//                 type="password"
//                 autoComplete="new-password"
//                 placeholder="Password"
//                 {...register("password")}
//                 error={errors.password?.message}
//               />
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               variant="dark-primary"
//               fontFamily="inter"
//               fullWidth
//               shadow="shadow-none"
//               className="p-4 text-xs"
//               disabled={loading}
//               loading={loading}
//               loadingText="Creating Account..."
//             >
//               Sign Up
//             </Button>

//             {/* Divider */}
//             <Divider />

//             {/* Google Button */}
//             <Button
//               type="button"
//               variant="sign_up_with_google"
//               fontFamily="poppins"
//               fullWidth
//               shadow="shadow-[0px_-2px_30px_rgba(0,0,0,0.02),_0px_2px_30px_rgba(0,0,0,0.05)]"
//               className="hover:bg-neutral-100 transition-colors duration-200"
//               onClick={() => {
//                 window.location.href = `${API_BASE_URL}${API_ROUTES.AUTH.GOOGLE}`;
//               }}
//             >
//               <span>
//                 <Image
//                   src="/images/icons/google-icon.svg"
//                   alt="Google Icon"
//                   width={20}
//                   height={20}
//                   className="inline mr-2"
//                 />
//                 Sign Up with Google
//               </span>
//             </Button>

//             {/* Login Redirect */}
//             <p className="font-gilroy-medium text-sm text-center">
//               If you have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => navigate(PATHS.AUTH.LOGIN)}
//                 className="text-primary-dark hover:underline transition-all"
//               >
//                 Log in here
//               </button>
//             </p>
//           </div>
//         </motion.form>

//         {toast && (
//           <Toast
//             message={toast.message}
//             type={toast.type}
//             onClose={() => setToast(null)}
//           />
//         )}
//       </motion.div>

//       {/* Page Transition Loading Overlay */}
//       <AnimatePresence mode="wait">
//         {isNavigating && (
//           <motion.div
//             key="auth-transition"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.35, ease: "easeOut" }}
//             className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm"
//           >
//             <Spinner />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
"use client";

import React, { useState } from "react";
import { API_BASE_URL } from "@/utils/api";
import { API_ROUTES } from "@/utils/apiRoutes";
import { Button } from "@/components/ui/Buttons";
import Divider from "@/components/ui/Divider";
import { FormInput } from "@/components/ui/FormInput";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PATHS } from "@/utils/path";
import { signupSchema, SignupFormData } from "@/schemas/auth/signupSchema";
import { Toast } from "@/components/ui/Toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/authService";
import { usePageTransition } from "@/hooks/usePageTransition";
import { Spinner } from "@/components/ui/Spinner";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { navigate, isNavigating } = usePageTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const normalize = (str: string) => str.trim().replace(/\s+/g, " ");

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setToast(null);

    const payload = {
      ...data,
      fullName: normalize(data.fullName),
      email: data.email.trim(),
      role: "ROLE_USER",
    };

    try {
      const res = await registerUser(payload);

      if (res?.success) {
        setToast({
          message:
            "Registration successful! Check your email for OTP verification.",
          type: "success",
        });
        reset();

        setTimeout(() => {
          navigate(
            `${PATHS.AUTH.VERIFY_OTP}?email=${encodeURIComponent(
              payload.email
            )}&type=signup`
          );
        }, 1500);
      } else {
        throw new Error(res?.message || "An unexpected error occurred");
      }
    } catch (error: any) {
      setToast({
        message: error.message || "Email already in use or invalid input.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Motion variants for clean and consistent animation
  const fadeUp = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col items-center md:pl-4 md:pr-12 md:py-12"
      >
        {/* Logo */}
        <motion.div variants={fadeUp} transition={{ duration: 0.25 }}>
          <Image
            src="/images/logo/cruize-easy-logo-icon.svg"
            alt="Cruize Easy Logo Icon"
            width={70}
            height={70}
            className="w-12 h-auto"
            quality={100}
            priority
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="font-modulus-semibold text-[26px] mb-12"
        >
          Sign Up
        </motion.h1>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="w-full space-y-6"
        >
          <div className="space-y-2">
            <FormInput
              id="fullName"
              label="Full Name"
              type="text"
              autoComplete="name"
              placeholder="Full Name"
              {...register("fullName")}
              error={errors.fullName?.message}
            />
            <FormInput
              id="email"
              label="Email Address"
              type="email"
              autoComplete="email"
              placeholder="email@gmail.com"
              {...register("email")}
              error={errors.email?.message}
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              {...register("password")}
              error={errors.password?.message}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="dark-primary"
            fontFamily="inter"
            fullWidth
            shadow="shadow-none"
            className="p-4 text-xs"
            disabled={loading}
            loading={loading}
            loadingText="Creating Account..."
          >
            Sign Up
          </Button>

          <Divider />

          {/* Google Button */}
          <Button
            type="button"
            variant="sign_up_with_google"
            fontFamily="poppins"
            fullWidth
            shadow="shadow-[0px_-2px_30px_rgba(0,0,0,0.02),_0px_2px_30px_rgba(0,0,0,0.05)]"
            className="hover:bg-neutral-100 transition-colors duration-200"
            onClick={() =>
              (window.location.href = `${API_BASE_URL}${API_ROUTES.AUTH.GOOGLE}`)
            }
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
            <button
              type="button"
              onClick={() => navigate(PATHS.AUTH.LOGIN)}
              className="text-primary-dark hover:underline transition-all"
            >
              Log in here
            </button>
          </p>
        </motion.form>

        {/* Toast */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </motion.div>

      {/* Page Transition Spinner */}
      <AnimatePresence mode="wait">
        {isNavigating && (
          <motion.div
            key="auth-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm"
          >
            <Spinner />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
