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
      <div className="flex flex-col items-center justify-center bg-red-500 h-screen px-4">
        {/* Image */}
        {/* <div className="mb-10">
          <Image
            src="/images/robots/robot-turning-right.webp"
            alt="gpt robot turning right"
            width={144}
            height={100}
            quality={100}
            priority
          />
        </div> */}

        {/* Title + Description */}
        {/* <div className="mb-6 flex flex-col items-center text-center space-y-2">
          <h1 className="font-modulus-semibold text-[26px] block">
            Car Successfully Added!
          </h1>

          <p className="font-gilroy-medium text-sm text-neutral-550 max-w-[18rem]">
            Your car has been successfully added, you can now begin to accept
            bookings
          </p>
        </div> */}

        {/* Button */}
        {/* <div className="w-full flex justify-center">
          <Button
            variant="dark-primary"
            fontFamily="inter"
            fullWidth
            shadow="shadow-none"
            className="p-4 text-xs sm:max-w-sm"
          >
            View Car Details
          </Button>
        </div> */}
      </div>
    );

  return (
    <div className="md:pt-6 md:px-12 pb-28 bg-white md:bg-neutral-100">
      <div className="p-4 sticky top-0 z-10 bg-white shadow-sm md:hidden">
        <HostHeader />
      </div>

      <div className="bg-white md:border md:border-neutral-300 px-4 md:p-12 rounded-[30px] mt-10 md:mt-0">
        <div className="flex flex-col">
          <span className="font-gilroy-bold text-2xl md:text-3xl">Add Car</span>
          <span className="font-gilroy-medium text-primary-soft text-sm md:text-base">
            Step 1/4
          </span>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-[150px] h-[150px] md:w-[150px] md:h-[150px]">
            <Image
              src="/images/robots/robot-with-question-mark.webp"
              alt="Robot With Question Mark"
              fill
              priority
              quality={100}
              className="object-contain"
            />
          </div>
        </div>

        {/* Vehicle Information Step 1 */}
        <section className="md:px-4 mt-3 hidden">
          <span className="font-gilroy-bold text-lg md:text-xl">
            Vehicle Information
          </span>

          <form className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormInput
                id="carName"
                label="Car Name"
                type="text"
                autoComplete="off"
                placeholder="Car Name"
                labelFontFamily="gilroy-medium"
                placeholderVariant="light"
              />
              <FormInput
                id="carBrand"
                label="Car Brand"
                type="text"
                autoComplete="off"
                placeholder="Toyota, Honda"
                labelFontFamily="gilroy-medium"
                placeholderVariant="light"
              />

              <FormTextArea
                id="carDescription"
                label="Car Description"
                placeholder="Full description of the vehicle..."
                labelFontFamily="gilroy-medium"
                placeholderVariant="light"
              />

              <div className="flex flex-col justify-between">
                <FormInput
                  id="carColor"
                  label="Car Colour"
                  type="text"
                  autoComplete="off"
                  placeholder="Blue, Black"
                  labelFontFamily="gilroy-medium"
                  placeholderVariant="light"
                />

                <Button
                  type="submit"
                  variant="dark-primary"
                  fontFamily="inter"
                  fullWidth
                  shadow="shadow-none"
                  className="mt-12 md:mt-0"
                >
                  Next
                </Button>
              </div>
            </div>
          </form>
        </section>

        {/* Vehicle Liscences Step 2 */}
        <section className="md:px-4 mt-3 hidden ">
          <span className="font-gilroy-bold text-lg md:text-xl">
            Vehicle Licences
          </span>

          <form className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormInput
                id="plateNumber"
                label="Plate Number"
                type="text"
                autoComplete="off"
                placeholder="Plate Number"
                labelFontFamily="gilroy-medium"
                placeholderVariant="light"
              />
              <FormInput
                id="carRegNo"
                label="Car Registration Number"
                type="text"
                autoComplete="off"
                placeholder="Registration Number"
                labelFontFamily="gilroy-medium"
                placeholderVariant="light"
              />

              <ImageUpload
                variant="document"
                label="Vehicle Document"
                onImageSelect={(file) => console.log(file)}
              />

              <div className="flex flex-col justify-between">
                <FormCheckbox
                  id="isTinted"
                  label="Tinted"
                  labelFontFamily="gilroy-medium"
                  onChange={(e) => console.log(e.target.checked)}
                />

                <Button
                  type="submit"
                  variant="dark-primary"
                  fontFamily="inter"
                  fullWidth
                  shadow="shadow-none"
                  className="mt-12 md:mt-0"
                >
                  Next
                </Button>
              </div>
            </div>
          </form>
        </section>

        {/* Rent Information Step 3 */}
        <section className="md:px-4 mt-3 hidden ">
          <span className="font-gilroy-bold text-lg md:text-xl">
            Rent Information
          </span>

          <form className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormSelect
                id="rentType"
                label="Rent Type"
                labelFontFamily="gilroy-medium"
                placeholder="Will this car come with a driver"
                options={[
                  { value: "self-drive", label: "Self Drive" },
                  { value: "driver", label: "Driver" },
                ]}
                placeholderVariant="light"
              />

              <FormInput
                id="rentPrice"
                label="Rent Price"
                type="number"
                min={0}
                autoComplete="off"
                placeholder="Price per day"
                labelFontFamily="gilroy-medium"
                placeholderVariant="light"
              />

              <FormInput
                id="fuelPrice"
                label="Fuel"
                type="number"
                min={0}
                autoComplete="off"
                placeholder="Price per day"
                labelFontFamily="gilroy-medium"
                placeholderVariant="light"
              />

              <FormSelect
                id="transmission"
                label="Transmission"
                labelFontFamily="gilroy-medium"
                placeholder="Vehicle Transmission"
                options={[
                  { value: "manual", label: "Manual" },
                  { value: "automatic", label: "Automatic" },
                  { value: "electric", label: "Electric" },
                ]}
                placeholderVariant="light"
              />

              <FormSelect
                id="seats"
                label="Seats"
                labelFontFamily="gilroy-medium"
                placeholder="How many seats"
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                ]}
                placeholderVariant="light"
              />

              <div className="flex items-end">
                <Button
                  type="submit"
                  variant="dark-primary"
                  fontFamily="inter"
                  fullWidth
                  shadow="shadow-none"
                  className="mt-12 md:mt-0 md:p-[18.8px]"
                >
                  Next
                </Button>
              </div>
            </div>
          </form>
        </section>

        {/* Uploading Images Of The Car Step 4 */}
        <section className="md:px-4 mt-3 ">
          <form className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <ImageUpload
                variant="document"
                label="Front side of the car"
                uploadLabel="Click to upload your Front side of Car"
                onImageSelect={(file) => console.log(file)}
              />
              <ImageUpload
                variant="document"
                label="Back side of the car"
                uploadLabel="Click to upload your Back side of Car"
                onImageSelect={(file) => console.log(file)}
              />
              <ImageUpload
                variant="document"
                label="Left side of the car"
                uploadLabel="Click to upload your Left side of Car"
                onImageSelect={(file) => console.log(file)}
              />
              <ImageUpload
                variant="document"
                label="Right side of the car"
                uploadLabel="Click to upload your Right side of Car"
                onImageSelect={(file) => console.log(file)}
              />

              <div className="md:col-span-2 max-w-xl w-full mx-auto">
                <Button
                  type="submit"
                  variant="dark-primary"
                  fontFamily="inter"
                  fullWidth
                  shadow="shadow-none"
                  className="mt-12 md:mt-6"
                >
                  Done
                </Button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
