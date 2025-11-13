"use client";

import { AddCarFormData, addCarSchema } from "@/schemas/host/addCarSchema";
import { Button } from "@/components/ui/Buttons";
import { FormCheckbox } from "@/components/ui/FormCheckbox";
import { FormInput } from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import { FormTextArea } from "@/components/ui/FormTextArea";
import { HostHeader } from "@/components/host/HostHeader";
import Image from "next/image";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { normalizeString } from "@/utils/stringUtils";
import { Success } from "@/components/host/add-car/Success";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toast } from "@/components/ui/Toast";

export default function HostAddCarPage() {
  // const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const form = useForm<AddCarFormData>({
    resolver: zodResolver(addCarSchema),
    mode: "onChange",
    defaultValues: {
      isTinted: false,
      confirmPhotos: false,
    },
  });

  const handleNext = async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = await form.trigger([
          "carName",
          "carBrand",
          "carDescription",
          "carColor",
        ]);
        break;
      case 2:
        isValid = await form.trigger([
          "plateNumber",
          "carRegNo",
          "vehicleDocument",
        ]);
        break;
      case 3:
        isValid = await form.trigger([
          "rentType",
          "rentPrice",
          "fuelPrice",
          "transmission",
          "seats",
        ]);
        break;
    }

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const addCarMutation = useMutation({
    mutationFn: async (data: AddCarFormData) => {
      // mimic network delay
      await new Promise((res) => setTimeout(res, 1000));

      const payload = {
        carName: normalizeString(data.carName),
        carBrand: normalizeString(data.carBrand),
        carDescription: normalizeString(data.carDescription),
        carColor: normalizeString(data.carColor),
        plateNumber: normalizeString(data.plateNumber),
        carRegNo: normalizeString(data.carRegNo),
        seats: Number(data.seats),
        rentType: data.rentType,
        rentPrice: data.rentPrice,
        fuelPrice: data.fuelPrice,
        transmission: data.transmission,
        isTinted: data.isTinted,
        confirmPhotos: data.confirmPhotos,
        carImages: data.carImages,
        vehicleDocument: data.vehicleDocument,
      };

      console.log("Payload ready for backend (demo):", payload);
      return payload;
    },
    onSuccess: (data) => {
      // setSuccess(true);
      console.log("Mutation success:", data);
      // queryClient.invalidateQueries(["userCars"]);
    },
    onError: (err: any) => {
      setToast({
        message: err.message || "Something went wrong.",
        type: "error",
      });
    },
  });

  if (success) return <Success />;

  return (
    <div className="md:pt-6 md:px-12 pb-28 bg-white md:bg-neutral-100">
      <div className="p-4 sticky top-0 z-10 bg-white shadow-sm md:hidden">
        <HostHeader />
      </div>

      <div className="bg-white md:border md:border-neutral-300 px-4 md:p-12 rounded-[30px] mt-10 md:mt-0">
        <div className="flex flex-col">
          <span className="font-gilroy-bold text-2xl md:text-3xl">Add Car</span>
          <span className="font-gilroy-medium text-primary-soft text-sm md:text-base">
            Step {currentStep}/4
          </span>
        </div>

        <div
          className={clsx(
            "flex items-center justify-center",
            currentStep === 4 ? "hidden" : "block"
          )}
        >
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

        <form
          onSubmit={form.handleSubmit((data) => addCarMutation.mutate(data))}
        >
          {/* Step 1: Vehicle Information */}
          {currentStep === 1 && (
            <section className="md:px-4 mt-3">
              <span className="font-gilroy-bold text-lg md:text-xl">
                Vehicle Information
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6">
                <FormInput
                  id="carName"
                  label="Car Name"
                  type="text"
                  autoComplete="off"
                  placeholder="Car Name"
                  labelFontFamily="gilroy-medium"
                  placeholderVariant="light"
                  {...form.register("carName")}
                  error={form.formState.errors.carName?.message}
                />
                <FormInput
                  id="carBrand"
                  label="Car Brand"
                  type="text"
                  autoComplete="off"
                  placeholder="Toyota, Honda"
                  labelFontFamily="gilroy-medium"
                  placeholderVariant="light"
                  {...form.register("carBrand")}
                  error={form.formState.errors.carBrand?.message}
                />

                <FormTextArea
                  id="carDescription"
                  label="Car Description"
                  placeholder="Full description of the vehicle..."
                  labelFontFamily="gilroy-medium"
                  placeholderVariant="light"
                  {...form.register("carDescription")}
                  error={form.formState.errors.carDescription?.message}
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
                    {...form.register("carColor")}
                    error={form.formState.errors.carColor?.message}
                  />

                  <Button
                    type="button"
                    onClick={handleNext}
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
            </section>
          )}

          {/* Step 2: Vehicle Licenses */}
          {currentStep === 2 && (
            <section className="md:px-4 mt-3">
              <span className="font-gilroy-bold text-lg md:text-xl">
                Vehicle Licences
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6">
                <FormInput
                  id="plateNumber"
                  label="Plate Number"
                  type="text"
                  autoComplete="off"
                  placeholder="Plate Number"
                  labelFontFamily="gilroy-medium"
                  placeholderVariant="light"
                  {...form.register("plateNumber")}
                  error={form.formState.errors.plateNumber?.message}
                />
                <FormInput
                  id="carRegNo"
                  label="Car Registration Number"
                  type="text"
                  autoComplete="off"
                  placeholder="Registration Number"
                  labelFontFamily="gilroy-medium"
                  placeholderVariant="light"
                  {...form.register("carRegNo")}
                  error={form.formState.errors.carRegNo?.message}
                />

                <Controller
                  name="vehicleDocument"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <ImageUpload
                      variant="document"
                      label="Vehicle Document"
                      fileType="pdf"
                      defaultImage={value}
                      onImageSelect={onChange}
                      error={form.formState.errors.vehicleDocument?.message}
                    />
                  )}
                />

                <div className="flex flex-col justify-between">
                  <FormCheckbox
                    id="isTinted"
                    label="Tinted"
                    labelFontFamily="gilroy-medium"
                    {...form.register("isTinted")}
                    error={form.formState.errors.isTinted?.message}
                  />

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="step-back"
                      fontFamily="inter"
                      fullWidth
                      shadow="shadow-none"
                      className="mt-12 md:mt-0"
                    >
                      Previous
                    </Button>

                    <Button
                      type="button"
                      onClick={handleNext}
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
              </div>
            </section>
          )}

          {/* Step 3: Rent Information */}
          {currentStep === 3 && (
            <section className="md:px-4 mt-3">
              <span className="font-gilroy-bold text-lg md:text-xl">
                Rent Information
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6">
                <Controller
                  name="rentType"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <FormSelect
                      id="rentType"
                      label="Rent Type"
                      labelFontFamily="gilroy-medium"
                      placeholder="Will this car come with a driver"
                      options={[
                        { value: "SELF_DRIVE", label: "Self Drive" },
                        { value: "DRIVER", label: "Driver" },
                      ]}
                      value={value}
                      placeholderVariant="light"
                      onChange={onChange}
                      error={form.formState.errors.rentType?.message}
                    />
                  )}
                />

                <FormInput
                  id="rentPrice"
                  label="Rent Price (₦)"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  autoComplete="off"
                  placeholder="Price per day"
                  labelFontFamily="gilroy-medium"
                  placeholderVariant="light"
                  {...form.register("rentPrice")}
                  error={form.formState.errors.rentPrice?.message}
                />

                <FormInput
                  id="fuelPrice"
                  label="Fuel Price (₦)"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  autoComplete="off"
                  placeholder="Price per day"
                  labelFontFamily="gilroy-medium"
                  placeholderVariant="light"
                  {...form.register("fuelPrice")}
                  error={form.formState.errors.fuelPrice?.message}
                />

                <Controller
                  name="transmission"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <FormSelect
                      id="transmission"
                      label="Transmission"
                      labelFontFamily="gilroy-medium"
                      placeholder="Vehicle Transmission"
                      options={[
                        { value: "MANUAL", label: "Manual" },
                        { value: "AUTOMATIC", label: "Automatic" },
                        { value: "ELECTRIC", label: "Electric" },
                      ]}
                      value={value}
                      placeholderVariant="light"
                      onChange={onChange}
                      error={form.formState.errors.transmission?.message}
                    />
                  )}
                />

                <Controller
                  name="seats"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
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
                      value={value}
                      placeholderVariant="light"
                      onChange={onChange}
                      error={form.formState.errors.seats?.message}
                    />
                  )}
                />

                <div className="flex items-end gap-4">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="step-back"
                    fontFamily="inter"
                    fullWidth
                    shadow="shadow-none"
                    className="mt-12 md:mt-0 md:p-[18.8px]"
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
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
            </section>
          )}

          {/* Step 4: Car Images */}
          {currentStep === 4 && (
            <section className="md:px-4 mt-3">
              <div className="mt-6 font-gilroy-medium">
                <div className="text-neutral-550 space-y-6">
                  <span className="text-sm md:text-base">
                    Select and upload 9-12 clear pictures of the car for
                    verification
                  </span>

                  <div className="mt-6">
                    <Controller
                      name="carImages"
                      control={form.control}
                      render={({ field: { onChange, value } }) => (
                        <ImageUpload
                          variant="gallery"
                          fileType="image"
                          defaultImage={value}
                          minImages={9}
                          maxImages={12}
                          onImagesSelect={onChange}
                          error={form.formState.errors.carImages?.message}
                        />
                      )}
                    />
                  </div>

                  <span className="text-sm md:text-base">
                    Minimum of 9 photos required and maximum of 12 photos.
                    Capture front, back, left and right sides, interior, and
                    dashboard.
                  </span>

                  <div className="bg-primary-soft/30 text-black p-4 rounded-[11px] mt-6">
                    <span className="font-gilroy-bold">Photo Guidelines</span>

                    <ul className="text-sm text-black/60 list-disc px-6 text-left">
                      <li>Ensure the car is well-lit and visible</li>
                      <li>Include license plate and interior shots.</li>
                      <li>Avoid blurry or cropped photos.</li>
                    </ul>
                  </div>

                  <FormCheckbox
                    id="confirmPhotos"
                    label="I confirm that the uploaded photos are clear and accurate"
                    labelFontFamily="gilroy-medium"
                    {...form.register("confirmPhotos")}
                    error={form.formState.errors.confirmPhotos?.message}
                  />
                </div>

                <div className="mt-12 flex items-end gap-4 w-full mx-auto">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="step-back"
                    fontFamily="inter"
                    fullWidth
                    shadow="shadow-none"
                    className="mt-12 md:mt-6"
                  >
                    Previous
                  </Button>
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
            </section>
          )}
        </form>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
