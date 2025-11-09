import { HostHeader } from "@/components/host/HostHeader";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import { FormTextArea } from "@/components/ui/FormTextArea";
import Image from "next/image";

export default function HostAddCarPage() {
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

        {/* Vehicle Information Section 1 */}

        <section className="md:px-4 mt-3">
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
                label="Car Name"
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
      </div>
    </div>
  );
}
