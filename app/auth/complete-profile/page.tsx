"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import Image from "next/image";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { usePageTransition } from "@/hooks/usePageTransition";
import { FormSelect } from "@/components/ui/FormSelect";

export default function CompleteProfilePage() {
  const [loading, setLoading] = useState(false);
  const { navigate, isNavigating } = usePageTransition();
  const [selectedGender, setSelectedGender] = useState<string>("");
  return (
    <>
      <div className="flex flex-col items-center pb-12">
        <div>
          <Image
            src="/images/robots/robot-1.png"
            alt="Happy Robot"
            width={250}
            height={250}
            className="w-36 h-auto "
            quality={100}
            priority
          />
        </div>

        {/* Title + Description */}
        <div className="mb-6 flex flex-col items-center text-center space-y-2">
          <h1 className="font-modulus-semibold text-[26px] block">
            Complete your Profile
          </h1>

          <p className="font-gilroy-medium text-sm text-neutral-550 max-w-[19rem]">
            Don&apos;t worry only you can see your personal data, no one else
            will be able to see it
          </p>
        </div>

        <form className="w-full">
          {/* Image Upload Placeholder */}
          <div className="flex justify-center mb-12">
            <div className="relative ">
              <div className="bg-neutral-250 rounded-full size-20">
                <Image
                  src="/images/me.jpg"
                  alt="Eclipse Shape"
                  fill
                  className=" object-cover rounded-full"
                />
              </div>

              {/* Half Eclipse */}
              <Image
                src="/images/shapes/eclipse-1.svg"
                alt="Eclipse Shape"
                width={50}
                height={50}
                className="absolute -top-2 -right-2 w-12 h-auto"
              />

              {/* Edit Icon */}
              <Image
                src="/images/icons/edit-icon.svg"
                alt="Edit Icon"
                width={50}
                height={50}
                className="absolute -right-2 -bottom-[10px] w-5 h-auto"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 lg:px-20 xl:px-24">
            <FormInput
              id="userName"
              label="Username"
              type="text"
              autoComplete="name"
              placeholder="Username"
              labelFontFamily="gilroy-medium"
              disabled={loading}
              // {...register("username")}
              // error={errors.username?.message}
            />

            <FormInput
              id="phoneNumber"
              label="Phone Number"
              variant="phone"
              placeholder="812 345 6789"
              disabled={loading}
            />

            <FormSelect
              id="gender"
              label="Gender"
              labelFontFamily="gilroy-medium"
              placeholder="Select Gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              value={selectedGender}
              onChange={(value) => setSelectedGender(value)}
              disabled={loading}
            />

            <Button
              // type="submit"
              variant="dark-primary"
              fontFamily="inter"
              fullWidth
              shadow="shadow-none"
              className="p-4 sm:p-[21px] text-xs self-end mt-12 sm:mt-0"
              disabled={loading}
              loading={loading}
              loadingText="Setting Up Account..."
            >
              Complete Profile
            </Button>
          </div>
        </form>
      </div>

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
