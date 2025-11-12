// "use client";
// import { Success } from "@/components/host/add-car/Success";
// import { HostHeader } from "@/components/host/HostHeader";
// import { Button } from "@/components/ui/Buttons";
// import { FormCheckbox } from "@/components/ui/FormCheckbox";
// import { FormInput } from "@/components/ui/FormInput";
// import { FormSelect } from "@/components/ui/FormSelect";
// import { FormTextArea } from "@/components/ui/FormTextArea";
// import { ImageUpload } from "@/components/ui/ImageUpload";
// import clsx from "clsx";
// import Image from "next/image";
// import { useState } from "react";

// export default function HostAddCarPage() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [success, setSuccess] = useState(false);

//   const handleNext = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (currentStep < 4) {
//       setCurrentStep((prev) => prev + 1);
//     } else {
//       console.log("Form Data:");
//       setSuccess(true);
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   if (success) return <Success />;

//   return (
//     <div className="md:pt-6 md:px-12 pb-28 bg-white md:bg-neutral-100">
//       <div className="p-4 sticky top-0 z-10 bg-white shadow-sm md:hidden">
//         <HostHeader />
//       </div>

//       <div className="bg-white md:border md:border-neutral-300 px-4 md:p-12 rounded-[30px] mt-10 md:mt-0">
//         <div className="flex flex-col">
//           <span className="font-gilroy-bold text-2xl md:text-3xl">Add Car</span>
//           <span className="font-gilroy-medium text-primary-soft text-sm md:text-base">
//             Step {currentStep}/4
//           </span>
//         </div>

//         <div
//           className={clsx(
//             "flex items-center justify-center",
//             currentStep === 4 ? "hidden" : "block"
//           )}
//         >
//           <div className="relative w-[150px] h-[150px] md:w-[150px] md:h-[150px]">
//             <Image
//               src="/images/robots/robot-with-question-mark.webp"
//               alt="Robot With Question Mark"
//               fill
//               priority
//               quality={100}
//               className="object-contain"
//             />
//           </div>
//         </div>

//         {/* Vehicle Information Step 1 */}
//         {currentStep === 1 && (
//           <section className="md:px-4 mt-3">
//             <span className="font-gilroy-bold text-lg md:text-xl">
//               Vehicle Information
//             </span>

//             <form onSubmit={handleNext} className="mt-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//                 <FormInput
//                   id="carName"
//                   label="Car Name"
//                   type="text"
//                   autoComplete="off"
//                   placeholder="Car Name"
//                   labelFontFamily="gilroy-medium"
//                   placeholderVariant="light"
//                 />
//                 <FormInput
//                   id="carBrand"
//                   label="Car Brand"
//                   type="text"
//                   autoComplete="off"
//                   placeholder="Toyota, Honda"
//                   labelFontFamily="gilroy-medium"
//                   placeholderVariant="light"
//                 />

//                 <FormTextArea
//                   id="carDescription"
//                   label="Car Description"
//                   placeholder="Full description of the vehicle..."
//                   labelFontFamily="gilroy-medium"
//                   placeholderVariant="light"
//                 />

//                 <div className="flex flex-col justify-between">
//                   <FormInput
//                     id="carColor"
//                     label="Car Colour"
//                     type="text"
//                     autoComplete="off"
//                     placeholder="Blue, Black"
//                     labelFontFamily="gilroy-medium"
//                     placeholderVariant="light"
//                   />

//                   <Button
//                     type="submit"
//                     variant="dark-primary"
//                     fontFamily="inter"
//                     fullWidth
//                     shadow="shadow-none"
//                     className="mt-12 md:mt-0"
//                   >
//                     Next
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </section>
//         )}

//         {/* Vehicle Liscences Step 2 */}
//         {currentStep === 2 && (
//           <section className="md:px-4 mt-3 ">
//             <span className="font-gilroy-bold text-lg md:text-xl">
//               Vehicle Licences
//             </span>

//             <form onSubmit={handleNext} className="mt-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//                 <FormInput
//                   id="plateNumber"
//                   label="Plate Number"
//                   type="text"
//                   autoComplete="off"
//                   placeholder="Plate Number"
//                   labelFontFamily="gilroy-medium"
//                   placeholderVariant="light"
//                 />
//                 <FormInput
//                   id="carRegNo"
//                   label="Car Registration Number"
//                   type="text"
//                   autoComplete="off"
//                   placeholder="Registration Number"
//                   labelFontFamily="gilroy-medium"
//                   placeholderVariant="light"
//                 />

//                 <ImageUpload
//                   variant="document"
//                   label="Vehicle Document"
//                   fileType="pdf"
//                   onImageSelect={(file) => console.log(file)}
//                 />

//                 <div className="flex flex-col justify-between">
//                   <FormCheckbox
//                     id="isTinted"
//                     label="Tinted"
//                     labelFontFamily="gilroy-medium"
//                     onChange={(e) => console.log(e.target.checked)}
//                   />

//                   <div className="flex gap-4">
//                     <Button
//                       type="button"
//                       onClick={handleBack}
//                       variant="step-back"
//                       fontFamily="inter"
//                       fullWidth
//                       shadow="shadow-none"
//                       className="mt-12 md:mt-0"
//                     >
//                       Previous
//                     </Button>

//                     <Button
//                       type="submit"
//                       variant="dark-primary"
//                       fontFamily="inter"
//                       fullWidth
//                       shadow="shadow-none"
//                       className="mt-12 md:mt-0"
//                     >
//                       Next
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </section>
//         )}

//         {/* Rent Information Step 3 */}
//         {currentStep === 3 && (
//           <section className="md:px-4 mt-3 ">
//             <span className="font-gilroy-bold text-lg md:text-xl">
//               Rent Information
//             </span>

//             <form onSubmit={handleNext} className="mt-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//                 <FormSelect
//                   id="rentType"
//                   label="Rent Type"
//                   labelFontFamily="gilroy-medium"
//                   placeholder="Will this car come with a driver"
//                   options={[
//                     { value: "self-drive", label: "Self Drive" },
//                     { value: "driver", label: "Driver" },
//                   ]}
//                   placeholderVariant="light"
//                 />

//                 <FormInput
//                   id="rentPrice"
//                   label="Rent Price"
//                   type="number"
//                   min={0}
//                   autoComplete="off"
//                   placeholder="Price per day"
//                   labelFontFamily="gilroy-medium"
//                   placeholderVariant="light"
//                 />

//                 <FormInput
//                   id="fuelPrice"
//                   label="Fuel"
//                   type="number"
//                   min={0}
//                   autoComplete="off"
//                   placeholder="Price per day"
//                   labelFontFamily="gilroy-medium"
//                   placeholderVariant="light"
//                 />

//                 <FormSelect
//                   id="transmission"
//                   label="Transmission"
//                   labelFontFamily="gilroy-medium"
//                   placeholder="Vehicle Transmission"
//                   options={[
//                     { value: "manual", label: "Manual" },
//                     { value: "automatic", label: "Automatic" },
//                     { value: "electric", label: "Electric" },
//                   ]}
//                   placeholderVariant="light"
//                 />

//                 <FormSelect
//                   id="seats"
//                   label="Seats"
//                   labelFontFamily="gilroy-medium"
//                   placeholder="How many seats"
//                   options={[
//                     { value: "1", label: "1" },
//                     { value: "2", label: "2" },
//                     { value: "3", label: "3" },
//                     { value: "4", label: "4" },
//                   ]}
//                   placeholderVariant="light"
//                 />

//                 <div className="flex items-end gap-4">
//                   <Button
//                     type="button"
//                     onClick={handleBack}
//                     variant="step-back"
//                     fontFamily="inter"
//                     fullWidth
//                     shadow="shadow-none"
//                     className="mt-12 md:mt-0 md:p-[18.8px]"
//                   >
//                     Previous
//                   </Button>
//                   <Button
//                     type="submit"
//                     variant="dark-primary"
//                     fontFamily="inter"
//                     fullWidth
//                     shadow="shadow-none"
//                     className="mt-12 md:mt-0 md:p-[18.8px]"
//                   >
//                     Next
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </section>
//         )}

//         {/* Uploading Images Of The Car Step 4 */}
//         {currentStep === 4 && (
//           <section className="md:px-4 mt-3">
//             <form onSubmit={handleNext} className="mt-6 font-gilroy-medium">
//               <div className=" text-neutral-550  space-y-6">
//                 <span className="text-sm md:text-base">
//                   Select and upload 9-12 clear pictures of the car for
//                   verification
//                 </span>

//                 <div className="mt-6">
//                   <ImageUpload
//                     variant="gallery"
//                     fileType="image"
//                     minImages={9}
//                     maxImages={12}
//                     onImagesSelect={(files) => {
//                       console.log("All images:", files);
//                     }}
//                   />
//                 </div>

//                 <span className="text-sm md:text-base">
//                   Minimum of 9 photos required and maximum of 12 photos. Capture
//                   front, back, left and right sides, interior, and dashboard.
//                 </span>

//                 <div className="bg-primary-soft/30 text-black p-4 rounded-[11px] mt-6">
//                   <span className="font-gilroy-bold">Photo Guidelines</span>

//                   <ul className="text-sm text-black/60 list-disc px-6 text-left">
//                     <li>Ensure the car is well-lit and visible</li>
//                     <li>Include license plate and interior shots.</li>
//                     <li>Avoid blurry or cropped photos.</li>
//                   </ul>
//                 </div>

//                 <FormCheckbox
//                   id="isTinted"
//                   label="I confirm that the uploaded photos are clear and accurate"
//                   labelFontFamily="gilroy-medium"
//                   onChange={(e) => console.log(e.target.checked)}
//                 />
//               </div>

//               <div className="mt-12 flex items-end gap-4  w-full mx-auto">
//                 <Button
//                   type="button"
//                   onClick={handleBack}
//                   variant="step-back"
//                   fontFamily="inter"
//                   fullWidth
//                   shadow="shadow-none"
//                   className="mt-12 md:mt-6"
//                 >
//                   Previous
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="dark-primary"
//                   fontFamily="inter"
//                   fullWidth
//                   shadow="shadow-none"
//                   className="mt-12 md:mt-6"
//                 >
//                   Done
//                 </Button>
//               </div>
//             </form>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { Success } from "@/components/host/add-car/Success";
import { HostHeader } from "@/components/host/HostHeader";
import { Button } from "@/components/ui/Buttons";
import { FormCheckbox } from "@/components/ui/FormCheckbox";
import { FormInput } from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import { FormTextArea } from "@/components/ui/FormTextArea";
import { ImageUpload } from "@/components/ui/ImageUpload";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  vehicleInformationSchema,
  vehicleLicensesSchema,
  rentInformationSchema,
  carImagesSchema,
  AddCarFormData,
  VehicleInformationFormData,
  VehicleLicensesFormData,
  RentInformationFormData,
  CarImagesFormData,
} from "@/schemas/host/addCarSchema";

export default function HostAddCarPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<Partial<AddCarFormData>>({});

  // Step 1 Form
  const step1Form = useForm<VehicleInformationFormData>({
    resolver: zodResolver(vehicleInformationSchema),
    defaultValues: formData,
  });

  // Step 2 Form
  const step2Form = useForm<VehicleLicensesFormData>({
    resolver: zodResolver(vehicleLicensesSchema),
    defaultValues: {
      ...formData,
      isTinted: formData.isTinted ?? false,
    },
  });

  // Step 3 Form
  const step3Form = useForm<RentInformationFormData>({
    resolver: zodResolver(rentInformationSchema),
    defaultValues: formData,
  });

  // Step 4 Form
  const step4Form = useForm<CarImagesFormData>({
    resolver: zodResolver(carImagesSchema),
    defaultValues: {
      ...formData,
      confirmPhotos: formData.confirmPhotos ?? false,
    },
  });

  const handleStep1Submit = (data: VehicleInformationFormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStep2Submit = (data: VehicleLicensesFormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handleStep3Submit = (data: RentInformationFormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(4);
  };

  const handleStep4Submit = async (data: CarImagesFormData) => {
    // const finalData = { ...formData, ...data } as AddCarFormData;

    const finalData: AddCarFormData = {
      ...formData,
      ...data,
    };

    console.log("Final Form Data:", finalData);

    setSuccess(true);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

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

        {/* Vehicle Information Step 1 */}
        {currentStep === 1 && (
          <section className="md:px-4 mt-3">
            <span className="font-gilroy-bold text-lg md:text-xl">
              Vehicle Information
            </span>

            <form
              onSubmit={step1Form.handleSubmit(handleStep1Submit)}
              className="mt-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <FormInput
                  id="carName"
                  label="Car Name"
                  type="text"
                  autoComplete="off"
                  placeholder="Car Name"
                  labelFontFamily="gilroy-medium"
                  placeholderVariant="light"
                  {...step1Form.register("carName")}
                  error={step1Form.formState.errors.carName?.message}
                />
                <FormInput
                  id="carBrand"
                  label="Car Brand"
                  type="text"
                  autoComplete="off"
                  placeholder="Toyota, Honda"
                  labelFontFamily="gilroy-medium"
                  placeholderVariant="light"
                  {...step1Form.register("carBrand")}
                  error={step1Form.formState.errors.carBrand?.message}
                />

                <FormTextArea
                  id="carDescription"
                  label="Car Description"
                  placeholder="Full description of the vehicle..."
                  labelFontFamily="gilroy-medium"
                  placeholderVariant="light"
                  {...step1Form.register("carDescription")}
                  error={step1Form.formState.errors.carDescription?.message}
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
                    {...step1Form.register("carColor")}
                    error={step1Form.formState.errors.carColor?.message}
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
        )}

        {/* Vehicle Licenses Step 2 */}
        {currentStep === 2 && (
          <section className="md:px-4 mt-3">
            <span className="font-gilroy-bold text-lg md:text-xl">
              Vehicle Licences
            </span>

            <form
              onSubmit={step2Form.handleSubmit(handleStep2Submit)}
              className="mt-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <FormInput
                  id="plateNumber"
                  label="Plate Number"
                  type="text"
                  autoComplete="off"
                  placeholder="Plate Number"
                  labelFontFamily="gilroy-medium"
                  placeholderVariant="light"
                  {...step2Form.register("plateNumber")}
                  error={step2Form.formState.errors.plateNumber?.message}
                />
                <FormInput
                  id="carRegNo"
                  label="Car Registration Number"
                  type="text"
                  autoComplete="off"
                  placeholder="Registration Number"
                  labelFontFamily="gilroy-medium"
                  placeholderVariant="light"
                  {...step2Form.register("carRegNo")}
                  error={step2Form.formState.errors.carRegNo?.message}
                />

                <Controller
                  name="vehicleDocument"
                  control={step2Form.control}
                  render={({ field: { onChange } }) => (
                    <ImageUpload
                      variant="document"
                      label="Vehicle Document"
                      fileType="pdf"
                      defaultImage={formData.vehicleDocument}
                      onImageSelect={onChange}
                      error={
                        step2Form.formState.errors.vehicleDocument?.message
                      }
                    />
                  )}
                />

                <div className="flex flex-col justify-between">
                  <FormCheckbox
                    id="isTinted"
                    label="Tinted"
                    labelFontFamily="gilroy-medium"
                    {...step2Form.register("isTinted")}
                    error={step2Form.formState.errors.isTinted?.message}
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
              </div>
            </form>
          </section>
        )}

        {/* Rent Information Step 3 */}
        {currentStep === 3 && (
          <section className="md:px-4 mt-3">
            <span className="font-gilroy-bold text-lg md:text-xl">
              Rent Information
            </span>

            <form
              onSubmit={step3Form.handleSubmit(handleStep3Submit)}
              className="mt-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <Controller
                  name="rentType"
                  control={step3Form.control}
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
                      error={step3Form.formState.errors.rentType?.message}
                    />
                  )}
                />

                <FormInput
                  id="rentPrice"
                  label="Rent Price"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  autoComplete="off"
                  placeholder="Price per day"
                  labelFontFamily="gilroy-medium"
                  placeholderVariant="light"
                  {...step3Form.register("rentPrice", { valueAsNumber: true })}
                  error={step3Form.formState.errors.rentPrice?.message}
                />

                <FormInput
                  id="fuelPrice"
                  label="Fuel"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  autoComplete="off"
                  placeholder="Price per day"
                  labelFontFamily="gilroy-medium"
                  placeholderVariant="light"
                  {...step3Form.register("fuelPrice", { valueAsNumber: true })}
                  error={step3Form.formState.errors.fuelPrice?.message}
                />

                <Controller
                  name="transmission"
                  control={step3Form.control}
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
                      error={step3Form.formState.errors.transmission?.message}
                    />
                  )}
                />

                <Controller
                  name="seats"
                  control={step3Form.control}
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
                      error={step3Form.formState.errors.seats?.message}
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
        )}

        {/* Uploading Images Of The Car Step 4 */}
        {currentStep === 4 && (
          <section className="md:px-4 mt-3">
            <form
              onSubmit={step4Form.handleSubmit(handleStep4Submit)}
              className="mt-6 font-gilroy-medium"
            >
              <div className="text-neutral-550 space-y-6">
                <span className="text-sm md:text-base">
                  Select and upload 9-12 clear pictures of the car for
                  verification
                </span>

                <div className="mt-6">
                  <Controller
                    name="carImages"
                    control={step4Form.control}
                    render={({ field: { onChange } }) => (
                      <ImageUpload
                        variant="gallery"
                        fileType="image"
                        defaultImage={formData.carImages}
                        minImages={9}
                        maxImages={12}
                        onImagesSelect={onChange}
                        error={step4Form.formState.errors.carImages?.message}
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
                  {...step4Form.register("confirmPhotos")}
                  error={step4Form.formState.errors.confirmPhotos?.message}
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
            </form>
          </section>
        )}
      </div>
    </div>
  );
}
