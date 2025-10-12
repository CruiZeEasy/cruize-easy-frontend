"use client";
import React from "react";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import Image from "next/image";
import Link from "next/link";
import { PATHS } from "@/utils/path";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center md:pl-4 md:pr-12 ">
      <Image
        src="/images/logo/cruize-easy-logo-icon.svg"
        alt="Cruize Easy Logo Icon"
        width={70}
        height={70}
        quality={100}
        className="w-12 h-auto"
        priority
      />
      <h1 className="font-modulus-semibold text-[26px] mb-12">Sign Up</h1>

      <form className="w-full">
        <div className="space-y-2 mb-12">
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

        <Button
          type="submit"
          variant="dark-primary"
          fontFamily="inter"
          fullWidth
          shadow="shadow-none"
          className="p-4 text-xs mb-12"
          onClick={(e) => e.preventDefault()}
        >
          Sign Up
        </Button>

        {/* Divider Line */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-primary-dark w-[10rem]"></div>
          <span className="mx-2 text-primary-dark text-sm font-inter">or</span>
          <div className="h-px bg-primary-dark w-[10rem]"></div>
        </div>

        <Button
          variant="sign_up_with_google"
          fontFamily="poppins"
          fullWidth
          shadow="shadow-[0px_-2px_30px_rgba(0,0,0,0.02),_0px_2px_30px_rgba(0,0,0,0.05)]"
          className="mb-6"
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

        <p className="font-gilroy-medium text-sm text-center">
          If you have an account?{" "}
          <Link href={PATHS.AUTH.LOGIN} className="text-primary-dark">
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
}
