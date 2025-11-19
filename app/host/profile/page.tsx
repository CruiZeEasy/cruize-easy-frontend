// "use client";
// import { ActivityCard } from "@/components/host/dashboard/ActivityCard";
// import { HostHeader } from "@/components/host/HostHeader";
// import { Button } from "@/components/ui/Buttons";
// import { ImageUpload } from "@/components/ui/ImageUpload";
// import { activityCards } from "@/data/hostActivityCards";
// import clsx from "clsx";
// import Image from "next/image";
// import { useState } from "react";

// export default function HostProfilePage() {
//   const [selectedStatus, setSelectedStatus] = useState<"about" | "cars">(
//     "about"
//   );
//   return (
//     <div className="pb-28">
//       <div className="sticky md:relative top-0 z-10 bg-white md:bg-neutral-100 shadow-sm md:shadow-none md:pt-2 md:px-10">
//         <div className=" px-4 py-4 md:px-0 ">
//           <HostHeader />
//         </div>
//       </div>

//       <div className="p-4 md:px-12 mt-8 md:mt-10">
//         <section className="flex flex-col xl:flex-row space-x-4">
//           <div className="flex items-start xl:bg-white font-gilroy-medium xl:px-4 xl:py-8 space-x-4 rounded-[20px]">
//             <ImageUpload
//               onImageSelect={() => {}}
//               // error={errors.profileImage?.message}
//               showUploadLabel={false}
//               disabled={false}
//             />

//             <div className="flex flex-col">
//               <div className="flex items-center space-x-1">
//                 <span className="text-base md:text-lg">Bayo Autos</span>
//                 <span>
//                   <Image
//                     src="/images/icons/verification-badge.png"
//                     alt="Verification Badge"
//                     width={20}
//                     height={20}
//                   />
//                 </span>
//               </div>

//               <span className="text-neutral-475 text-sm my-1">Host</span>
//               <span className="text-neutral-475 text-sm">
//                 Jl. Sultan Iskandar Muda, Jakarta selatan
//               </span>
//             </div>
//           </div>

//           <div className="bg-neutral-150 h-[1px] w-full mt-4 xl:hidden" />

//           <div className="mt-4 xl:mt-0 grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1 items-center bg-white rounded-[20px] p-4">
//             {activityCards.map((card) => (
//               <ActivityCard
//                 key={card.id}
//                 icon={card.icon}
//                 label={card.label}
//                 value={0}
//                 variant="compact"
//               />
//             ))}
//           </div>
//         </section>

//         <section className="md:bg-white rounded-[20px] md:px-4 pb-4 mt-6">
//           <div className="grid grid-cols-2 border-b border-b-neutral-275">
//             {(
//               [
//                 {
//                   status: "about",
//                   label: "About",
//                 },
//                 {
//                   status: "cars",
//                   label: "Cars",
//                 },
//               ] as const
//             ).map(({ status, label }) => (
//               <button
//                 key={status}
//                 onClick={() => setSelectedStatus(status)}
//                 className="font-gilroy-medium text-sm text-neutral-475 relative py-4 cursor-pointer transition-colors hover:text-black"
//               >
//                 <span>{label}</span>
//                 <div
//                   className={clsx(
//                     "bg-primary-soft absolute bottom-0 left-0 w-full h-[5px] rounded-tr-[240px] rounded-tl-[240px] transition-opacity",
//                     selectedStatus === status ? "opacity-100" : "opacity-0"
//                   )}
//                 />
//               </button>
//             ))}
//           </div>

//           <div className="mt-10 font-gilroy-medium space-y-4">
//             <div className="grid md:grid-cols-2 pb-4 space-y-4 md:space-y-0 border-b border-neutral-275">
//               <div className="flex flex-col md:px-10 pb-4 md:pb-0 border-b border-neutral-275 md:border-b-0">
//                 <span className="text-black/50 text-sm">Full Name</span>
//                 <span>Adewale Segun</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-black/50 text-sm">Host Name</span>
//                 <span>Bayo Autos</span>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 pb-4 space-y-4 md:space-y-0 border-b border-neutral-275">
//               <div className="flex flex-col md:px-10 pb-4 md:pb-0 border-b border-neutral-275 md:border-b-0">
//                 <span className="text-black/50 text-sm">Phone Number</span>
//                 <span>0803 *** ****</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-black/50 text-sm">Email Address</span>
//                 <span>adewalesegun@gmail.com</span>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 pb-4 space-y-4 md:space-y-0 border-b border-neutral-275">
//               <div className="flex flex-col md:px-10 pb-4 md:pb-0 border-b border-neutral-275 md:border-b-0">
//                 <span className="text-black/50 text-sm">Date of Birth</span>
//                 <span>24/06/21</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-black/50 text-sm">Gender</span>
//                 <span>Male</span>
//               </div>
//             </div>

//             <div className="md:flex md:justify-center">
//               <Button
//                 type="button"
//                 // onClick={handleNext}
//                 variant="dark-primary"
//                 fontFamily="inter"
//                 fullWidth
//                 shadow="shadow-none"
//                 className="mt-12 md:mt-6 max-w-md"
//               >
//                 Edit Profile
//               </Button>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

"use client";
import { ActivityCard } from "@/components/host/dashboard/ActivityCard";
import { HostHeader } from "@/components/host/HostHeader";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Toast } from "@/components/ui/Toast";
import { activityCards } from "@/data/hostActivityCards";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Schema for edit profile
const editProfileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  hostName: z.string().min(2, "Host name is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be 10 digits"),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

export default function HostProfilePage() {
  const [selectedStatus, setSelectedStatus] = useState<"about" | "cars">(
    "about"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Simulated host data
  const [hostData, setHostData] = useState({
    fullName: "Adewale Segun",
    hostName: "Bayo Autos",
    phoneNumber: "8031234567",
    email: "adewalesegun@gmail.com",
    dateOfBirth: "24/06/21",
    gender: "Male",
    location: "Jl. Sultan Iskandar Muda, Jakarta selatan",
    profileImageUrl: null as string | null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: hostData.fullName,
      hostName: hostData.hostName,
      phoneNumber: hostData.phoneNumber,
    },
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset form
      reset({
        fullName: hostData.fullName,
        hostName: hostData.hostName,
        phoneNumber: hostData.phoneNumber,
      });
    }
    setIsEditing(!isEditing);
  };

  const onSubmit = (data: EditProfileFormData) => {
    // Simulate API call
    setTimeout(() => {
      setHostData((prev) => ({
        ...prev,
        fullName: data.fullName,
        hostName: data.hostName,
        phoneNumber: data.phoneNumber,
      }));
      setIsEditing(false);
      setToast({
        message: "Profile updated successfully!",
        type: "success",
      });
    }, 500);
  };

  // Format phone number for display (masked)
  const formatPhoneForDisplay = (phone: string) => {
    if (!phone) return "";
    return `0${phone.slice(0, 3)} *** ****`;
  };

  return (
    <div className="pb-28">
      <div className="sticky md:relative top-0 z-10 bg-white md:bg-neutral-100 shadow-sm md:shadow-none md:pt-2 md:px-10">
        <div className=" px-4 py-4 md:px-0 ">
          <HostHeader />
        </div>
      </div>

      <div className="p-4 md:px-12 mt-8 md:mt-10">
        <section className="flex flex-col xl:flex-row space-x-4">
          <div className="flex items-start xl:bg-white font-gilroy-medium xl:px-4 xl:py-8 space-x-4 rounded-[20px]">
            <ImageUpload
              onImageSelect={() => {}}
              showUploadLabel={false}
              disabled={false}
            />

            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-base md:text-lg">
                  {hostData.hostName}
                </span>
                <span>
                  <Image
                    src="/images/icons/verification-badge.png"
                    alt="Verification Badge"
                    width={20}
                    height={20}
                  />
                </span>
              </div>

              <span className="text-neutral-475 text-sm my-1">Host</span>
              <span className="text-neutral-475 text-sm">
                {hostData.location}
              </span>
            </div>
          </div>

          <div className="bg-neutral-150 h-[1px] w-full mt-4 xl:hidden" />

          <div className="mt-4 xl:mt-0 grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1 items-center bg-white rounded-[20px] p-4">
            {activityCards.map((card) => (
              <ActivityCard
                key={card.id}
                icon={card.icon}
                label={card.label}
                value={0}
                variant="compact"
              />
            ))}
          </div>
        </section>

        <section className="md:bg-white rounded-[20px] md:px-4 pb-4 mt-6">
          <div className="grid grid-cols-2 border-b border-b-neutral-275">
            {(
              [
                {
                  status: "about",
                  label: "About",
                },
                {
                  status: "cars",
                  label: "Cars",
                },
              ] as const
            ).map(({ status, label }) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className="font-gilroy-medium text-sm text-neutral-475 relative py-4 cursor-pointer transition-colors hover:text-black"
              >
                <span>{label}</span>
                <div
                  className={clsx(
                    "bg-primary-soft absolute bottom-0 left-0 w-full h-[5px] rounded-tr-[240px] rounded-tl-[240px] transition-opacity",
                    selectedStatus === status ? "opacity-100" : "opacity-0"
                  )}
                />
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 font-gilroy-medium space-y-4"
          >
            <div className="grid md:grid-cols-2 pb-4 space-y-4 md:space-y-0 border-b border-neutral-275">
              <div className="flex flex-col md:px-10 pb-4 md:pb-0 border-b border-neutral-275 md:border-b-0">
                {isEditing ? (
                  <FormInput
                    id="fullName"
                    label="Full Name"
                    type="text"
                    placeholder="Full Name"
                    labelFontFamily="gilroy-medium"
                    placeholderVariant="light"
                    {...register("fullName")}
                    error={errors.fullName?.message}
                  />
                ) : (
                  <>
                    <span className="text-black/50 text-sm">Full Name</span>
                    <span>{hostData.fullName}</span>
                  </>
                )}
              </div>
              <div className="flex flex-col">
                {isEditing ? (
                  <FormInput
                    id="hostName"
                    label="Host Name"
                    type="text"
                    placeholder="Host Name"
                    labelFontFamily="gilroy-medium"
                    placeholderVariant="light"
                    {...register("hostName")}
                    error={errors.hostName?.message}
                  />
                ) : (
                  <>
                    <span className="text-black/50 text-sm">Host Name</span>
                    <span>{hostData.hostName}</span>
                  </>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 pb-4 space-y-4 md:space-y-0 border-b border-neutral-275">
              <div className="flex flex-col md:px-10 pb-4 md:pb-0 border-b border-neutral-275 md:border-b-0">
                {isEditing ? (
                  <FormInput
                    id="phoneNumber"
                    label="Phone Number"
                    variant="phone"
                    placeholder="812 345 6789"
                    labelFontFamily="gilroy-medium"
                    placeholderVariant="light"
                    {...register("phoneNumber")}
                    error={errors.phoneNumber?.message}
                  />
                ) : (
                  <>
                    <span className="text-black/50 text-sm">Phone Number</span>
                    <span>{formatPhoneForDisplay(hostData.phoneNumber)}</span>
                  </>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-black/50 text-sm">Email Address</span>
                <span>{hostData.email}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 pb-4 space-y-4 md:space-y-0 border-b border-neutral-275">
              <div className="flex flex-col md:px-10 pb-4 md:pb-0 border-b border-neutral-275 md:border-b-0">
                <span className="text-black/50 text-sm">Date of Birth</span>
                <span>{hostData.dateOfBirth}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-black/50 text-sm">Gender</span>
                <span>{hostData.gender}</span>
              </div>
            </div>

            <div className="md:flex md:justify-center md:gap-4">
              {isEditing ? (
                <>
                  <Button
                    type="button"
                    onClick={handleEditToggle}
                    variant="step-back"
                    fontFamily="inter"
                    fullWidth
                    shadow="shadow-none"
                    className="mt-6 max-w-md"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="dark-primary"
                    fontFamily="inter"
                    fullWidth
                    shadow="shadow-none"
                    className="mt-6 max-w-md"
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  onClick={handleEditToggle}
                  variant="dark-primary"
                  fontFamily="inter"
                  fullWidth
                  shadow="shadow-none"
                  className="mt-12 md:mt-6 max-w-md"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </form>
        </section>
      </div>

      <div className="flex justify-center">
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
}
