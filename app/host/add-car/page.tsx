"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AddCarFormData, addCarSchema } from "@/schemas/host/addCarSchema";
import { Button } from "@/components/ui/Buttons";
import { fadeUp } from "@/config/animation";
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
import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toast } from "@/components/ui/Toast";
import { createVehicle } from "@/services/vehicleService";
import { compressImages } from "@/utils/compressImage";
import {
  rentTypeOptions,
  seatOptions,
  transmissionOptions,
} from "@/utils/selectOptions";
import { formatNumber } from "@/utils/formatNumber";
import {
  getDocumentSignature,
  getImageSignature,
  uploadToCloudinary,
} from "@/utils/uploadToCloudinary";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";

export default function HostAddCarPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSpinner, setShowSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isMovingForward, setIsMovingForward] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const formContainerRef = useRef<HTMLDivElement>(null);

  const form = useForm<AddCarFormData>({
    resolver: zodResolver(addCarSchema),
    mode: "onChange",
    defaultValues: {
      seats: "",
      isTinted: false,
      carImages: [],
      confirmPhotos: false,
    },
  });

  // Smooth scroll to top of form container
  const scrollToTop = () => {
    if (formContainerRef.current) {
      const topPosition = formContainerRef.current.offsetTop;
      window.scrollTo({
        top: topPosition - 120, // Small offset for better visual
        behavior: "smooth",
      });
    }
  };

  // Get fields to validate for each step
  const getStepFields = (step: number) => {
    switch (step) {
      case 1:
        return ["carName", "carBrand", "carDescription", "carColor"] as const;
      case 2:
        return ["plateNumber", "carRegNo", "vehicleDocument"] as const;
      case 3:
        return [
          "rentType",
          "rentPrice",
          "fuelPrice",
          "transmission",
          "seats",
        ] as const;
      case 4:
        return ["carImages", "confirmPhotos"] as const;
      default:
        return [];
    }
  };

  // Focus first invalid field with cross-browser compatibility
  const focusFirstInvalidField = () => {
    const errors = form.formState.errors;
    const firstErrorField = Object.keys(errors)[0];

    if (!firstErrorField) return;

    // Try multiple selection strategies for maximum compatibility
    const strategies = [
      // Strategy 1: Direct ID match
      () => document.getElementById(firstErrorField),

      // Strategy 2: Name attribute match
      () => document.querySelector(`[name="${firstErrorField}"]`),

      // Strategy 3: Look for focusable elements within a container with matching ID
      () => {
        const container = document.getElementById(firstErrorField);
        if (container) {
          return container.querySelector<HTMLElement>(
            'input, select, textarea, button, [tabindex]:not([tabindex="-1"])'
          );
        }
        return null;
      },

      // Strategy 4: Look for any focusable element with data-field attribute
      () =>
        document.querySelector<HTMLElement>(
          `[data-field="${firstErrorField}"]`
        ),
    ];

    for (const strategy of strategies) {
      // const element = strategy();
      const element = strategy() as HTMLElement | null;
      if (element && typeof element.focus === "function") {
        // Use setTimeout to ensure DOM has updated and element is visible
        setTimeout(() => {
          try {
            element.focus({ preventScroll: false });
            // For mobile devices, also try to scroll element into view
            if (element.scrollIntoView) {
              element.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
          } catch (e) {
            // Silently fail if focus is not possible
            console.warn(`Could not focus element: ${firstErrorField}`);
          }
        }, 100);
        break;
      }
    }
  };

  // // Focus first invalid field with enhanced mobile support
  // const focusFirstInvalidField = () => {
  //   const errors = form.formState.errors;
  //   const firstErrorField = Object.keys(errors)[0];

  //   if (!firstErrorField) return;

  //   // Try multiple selection strategies for maximum compatibility
  //   const strategies = [
  //     // Strategy 1: Direct ID match
  //     () => document.getElementById(firstErrorField),

  //     // Strategy 2: Name attribute match
  //     () => document.querySelector(`[name="${firstErrorField}"]`),

  //     // Strategy 3: Look for focusable elements within a container with matching ID
  //     () => {
  //       const container = document.getElementById(firstErrorField);
  //       if (container) {
  //         return container.querySelector<HTMLElement>(
  //           'input, select, textarea, button, [tabindex]:not([tabindex="-1"])'
  //         );
  //       }
  //       return null;
  //     },

  //     // Strategy 4: Look for any focusable element with data-field attribute
  //     () =>
  //       document.querySelector<HTMLElement>(
  //         `[data-field="${firstErrorField}"]`
  //       ),
  //   ];

  //   for (const strategy of strategies) {
  //     const element = strategy() as HTMLElement | null;
  //     if (element && typeof element.focus === "function") {
  //       try {
  //         // For mobile: Remove all timeouts and delays
  //         // Scroll into view first (synchronously)
  //         element.scrollIntoView({
  //           behavior: "smooth",
  //           block: "center",
  //         });

  //         // Focus immediately (synchronously)
  //         element.focus({ preventScroll: true });

  //         // For mobile browsers: trigger a synthetic click event
  //         // This helps activate the input and show the keyboard
  //         if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
  //           const clickEvent = new MouseEvent("click", {
  //             view: window,
  //             bubbles: true,
  //             cancelable: true,
  //           });
  //           element.dispatchEvent(clickEvent);
  //         }
  //       } catch (e) {
  //         console.warn(`Could not focus element: ${firstErrorField}`);
  //       }
  //       break;
  //     }
  //   }
  // };

  // Handle Enter key press
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // On step 4, submit the form
      if (currentStep === 4) {
        const isValid = await form.trigger(getStepFields(4));
        if (isValid) {
          form.handleSubmit((data) => addCarMutation.mutate(data))();
        } else {
          focusFirstInvalidField();
        }
        return;
      }

      // On steps 1-3, validate and advance
      const fieldsToValidate = getStepFields(currentStep);
      const isValid = await form.trigger(fieldsToValidate);

      if (isValid) {
        setCurrentStep((prev) => prev + 1);
        scrollToTop();
      } else {
        focusFirstInvalidField();
      }
    }
  };

  // Handle Next button click
  const handleNext = async () => {
    const fieldsToValidate = getStepFields(currentStep);
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      setIsMovingForward(true);
      setCurrentStep((prev) => prev + 1);
      // scrollToTop();
    } else {
      focusFirstInvalidField();
    }
  };

  // Handle Previous button click
  const handleBack = async () => {
    if (currentStep > 1) {
      setIsMovingForward(false);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const addCarMutation = useMutation({
    mutationFn: async (data: AddCarFormData) => {
      // I removed compression here
      // const compressedImages = await compressImages(data.carImages || []);

      const imagesToUpload = data.carImages || [];

      const [docSig, imgSig] = await Promise.all([
        getDocumentSignature(),
        getImageSignature(),
      ]);

      const [documentObj, imageObjList] = await Promise.all([
        data.vehicleDocument
          ? uploadToCloudinary(data.vehicleDocument, docSig)
          : null,

        Promise.all(
          imagesToUpload.map((img) => uploadToCloudinary(img, imgSig))
        ),
      ]);

      const images = imageObjList.map((img, index) => ({
        url: img.url,
        publicId: img.publicId,
        order: index,
        uploadedAt: img.uploadedAt,
      }));

      const documents = documentObj
        ? [
            {
              documentType: "OTHERS",
              documentUrl: documentObj.url,
              publicId: documentObj.publicId,
              size: documentObj.size,
              uploadedAt: documentObj.uploadedAt,
            },
          ]
        : [];

      const payload = {
        name: normalizeString(data.carName),
        brand: normalizeString(data.carBrand),
        description: normalizeString(data.carDescription),
        color: normalizeString(data.carColor),
        licensePlate: normalizeString(data.plateNumber),
        vin: normalizeString(data.carRegNo),
        seats: Number(data.seats),
        rentType: data.rentType,
        pricePerDay: data.rentPrice.toFixed(2),
        fuelPrice: data.fuelPrice.toFixed(2),
        transmission: data.transmission,
        isTinted: data.isTinted,
        confirmPhoto: data.confirmPhotos,

        images,
        documents,
      };

      return createVehicle(payload);
    },

    onSuccess: () => {
      setShowSpinner(true);

      setTimeout(() => {
        setShowSpinner(false);
        setSuccess(true);
      }, 1500);
    },

    onError: (err: any) => {
      setToast({
        message: err?.message || "Failed to create vehicle.",
        type: "error",
      });
    },
  });

  const steps = [
    {
      key: "step-1",
      content: (
        <>
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
        </>
      ),
    },
    {
      key: "step-2",
      content: (
        <>
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
        </>
      ),
    },
    {
      key: "step-3",
      content: (
        <>
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
                  options={rentTypeOptions}
                  value={value}
                  placeholderVariant="light"
                  onChange={onChange}
                  error={form.formState.errors.rentType?.message}
                />
              )}
            />
            <Controller
              name="rentPrice"
              control={form.control}
              render={({ field }) => (
                <FormInput
                  id="rentPrice"
                  label="Rent Price (₦)"
                  labelFontFamily="gilroy-medium"
                  type="text"
                  inputMode="numeric"
                  placeholder="Price per day"
                  placeholderVariant="light"
                  value={
                    field.value ? formatNumber(field.value.toString()) : ""
                  }
                  onChange={(e) => {
                    const raw = e.target.value.replace(/,/g, "");
                    field.onChange(raw); // store clean number in form state
                  }}
                  error={form.formState.errors.rentPrice?.message}
                />
              )}
            />

            <Controller
              name="fuelPrice"
              control={form.control}
              render={({ field }) => (
                <FormInput
                  id="fuelPrice"
                  label="Fuel Price (₦)"
                  labelFontFamily="gilroy-medium"
                  type="text"
                  inputMode="numeric"
                  placeholder="Price per day"
                  placeholderVariant="light"
                  value={
                    field.value ? formatNumber(field.value.toString()) : ""
                  }
                  onChange={(e) => {
                    const raw = e.target.value.replace(/,/g, "");
                    field.onChange(raw);
                  }}
                  error={form.formState.errors.fuelPrice?.message}
                />
              )}
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
                  options={transmissionOptions}
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
                  options={seatOptions}
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
        </>
      ),
    },
    {
      key: "step-4",
      content: (
        <>
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
                      disabled={addCarMutation.isPending}
                    />
                  )}
                />
              </div>

              <span className="text-sm md:text-base">
                Minimum of 9 photos required and maximum of 12 photos. Capture
                front, back, left and right sides, interior, and dashboard.
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
                disabled={addCarMutation.isPending}
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
                disabled={addCarMutation.isPending}
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
                loading={addCarMutation.isPending}
                loadingText="Finalizing..."
              >
                Done
              </Button>
            </div>
          </div>
        </>
      ),
    },
  ];

  if (success) return <Success />;

  return (
    <>
      <div className="md:pt-6 md:px-12 pb-28 bg-white md:bg-neutral-100">
        <div className="p-4 sticky top-0 z-10 bg-white shadow-sm md:hidden">
          <HostHeader />
        </div>

        <div
          ref={formContainerRef}
          className="bg-white md:border md:border-neutral-300 px-4 md:p-12 rounded-[30px] mt-10 md:mt-0"
        >
          <div className="flex flex-col">
            <span className="font-gilroy-bold text-2xl md:text-3xl">
              Add Car
            </span>
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
            <div className="relative size-[150px]">
              <Image
                src="/images/robots/robot-with-question-mark.webp"
                alt="Robot With Question Mark"
                fill
                preload
                quality={100}
                className="object-contain"
              />
            </div>
          </div>

          <form
            onSubmit={form.handleSubmit((data) => addCarMutation.mutate(data))}
            onKeyDown={handleKeyDown}
          >
            {/* <AnimatePresence mode="wait">
              {steps.map(
                (step, index) =>
                  currentStep === index + 1 && (
                    <motion.section
                      key={step.key}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={fadeUp}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="md:px-4 mt-3"
                    >
                      {step.content}
                    </motion.section>
                  )
              )}
            </AnimatePresence> */}

            <AnimatePresence mode="wait">
              {steps.map(
                (step, index) =>
                  currentStep === index + 1 && (
                    <motion.section
                      key={step.key}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={fadeUp}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="md:px-4 mt-3"
                      onAnimationComplete={() => {
                        if (isMovingForward && formContainerRef.current) {
                          const topPosition =
                            formContainerRef.current.getBoundingClientRect()
                              .top + window.pageYOffset;
                          window.scrollTo({
                            top: topPosition - 120,
                            behavior: "smooth",
                          });

                          setIsMovingForward(false);
                        }
                      }}
                    >
                      {step.content}
                    </motion.section>
                  )
              )}
            </AnimatePresence>
          </form>
        </div>

        <div className="flex justify-center">
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </div>
      </div>
      <PageTransitionSpinner isVisible={showSpinner} />
    </>
  );
}
