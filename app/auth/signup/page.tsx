"use client";
import React from "react";
import Image from "next/image";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Buttons";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/logo/cruize-easy-logo-icon.svg"
        alt="Cruize Easy Logo Icon"
        width={70}
        height={70}
        quality={100}
        className="w-12 h-auto"
        priority
      />
      <span className="font-modulus-semibold text-[20px] sm:text-[22px] mb-4">
        Sign Up
      </span>

      <form className="w-full ">
        <div className="space-y-2 mb-2">
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

        <div className="flex items-center justify-center my-6">
          <div className="h-px bg-primary-dark w-[10rem]"></div>
          <span className="mx-4 text-primary-dark text-sm font-inter">or</span>
          <div className="h-px bg-primary-dark w-[10rem]"></div>
        </div>

        <Button
          variant="primary"
          fontFamily="inter"
          fullWidth
          className="p-4 text-xs"
          onClick={(e) => e.preventDefault()}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
