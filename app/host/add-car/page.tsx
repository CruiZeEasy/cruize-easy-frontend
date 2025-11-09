"use client";
import { HostHeader } from "@/components/host/HostHeader";
import { Button } from "@/components/ui/Buttons";
import { FormCheckbox } from "@/components/ui/FormCheckbox";

import { FormInput } from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import { FormTextArea } from "@/components/ui/FormTextArea";
import { ImageUpload } from "@/components/ui/ImageUpload";
import Image from "next/image";
import { useState } from "react";

export default function HostAddCarPage() {
  const [success, setSuccess] = useState(true);

  if (success)
    return (
      <div className="flex flex-col items-center justify-center bg-red-500 h-[100dvh] px-4">
        {/* Image */}
        <div className="mb-10">
          <Image
            src="/images/robots/robot-turning-right.webp"
            alt="gpt robot turning right"
            width={144}
            height={100}
            quality={100}
            priority
          />
        </div>

        {/* Title + Description */}
        <div className="mb-6 flex flex-col items-center text-center space-y-2">
          <h1 className="font-modulus-semibold text-[26px] block">
            Car Successfully Added!
          </h1>

          <p className="font-gilroy-medium text-sm text-neutral-550 max-w-[18rem]">
            Your car has been successfully added, you can now begin to accept
            bookings
          </p>
        </div>

        {/* Button */}
        <div className="w-full flex justify-center">
          <Button
            variant="dark-primary"
            fontFamily="inter"
            fullWidth
            shadow="shadow-none"
            className="p-4 text-xs sm:max-w-sm"
          >
            View Car Details
          </Button>
        </div>
      </div>
    );

  return (
  <div>hey</div>
  );
}
