"use client";
import React from "react";

export default function Divider() {
  return (
    <div className="flex items-center justify-center mb-4 md:mb-6">
      <div className="h-px bg-primary-dark w-full md:w-[10rem]" />
      <span className="mx-2 text-primary-dark text-sm font-inter">or</span>
      <div className="h-px bg-primary-dark w-full md:w-[10rem]" />
    </div>
  );
}
