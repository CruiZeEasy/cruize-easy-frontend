import { Button } from "@/components/ui/Buttons";
import { fadeIn } from "@/config/animation";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { PATHS } from "@/utils/path";

export function Success() {
  const { navigate, isNavigating } = usePageTransition();

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col items-center justify-center bg-white min-h-dvh px-4"
      >
        {/* Image */}
        <div className="mb-10">
          <Image
            src="/images/robots/robot-with-speech-bubble.webp"
            alt="gpt robot turning right"
            width={110}
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
            onClick={() => {
              navigate(`${PATHS.HOST.PROFILE}?tab=cars`);
            }}
          >
            Manage Cars
          </Button>
        </div>
      </motion.div>

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
