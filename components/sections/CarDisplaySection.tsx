"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function CarDisplaySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="container">
      <div className="relative h-[250px] sm:h-[450px] bg-white flex items-center justify-center overflow-hidden">
        {/* Left Gradient Bar */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[30px] sm:w-[60px] h-[160px] sm:h-[282px] z-0 bg-gradient-to-b from-[#223766] to-[#111827] to-50%"
        />

        {/* Car */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20"
        >
          <motion.div
            animate={inView ? { y: [0, -4, 0] } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/cars/featured.webp"
              alt="Car Display"
              width={600}
              height={407}
              quality={100}
              className="relative z-10 w-[300px] sm:w-[600px] h-auto"
            />
          </motion.div>

          {/* Shadow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Image
              src="/images/shapes/car-shadow.webp"
              alt="Background Shape Left"
              width={450}
              height={50}
              className="hidden sm:block absolute left-3 sm:left-9 -bottom-[6.5px] sm:-bottom-2 w-[240px] sm:w-[450px] h-auto"
            />
          </motion.div>
        </motion.div>

        {/* Bottom Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-4 border-[0.67px] sm:border-2 border-[#1C2E53] w-24 sm:w-44 py-3 sm:py-4 rounded-full z-10 origin-center"
        />

        {/* Right Gradient Bar */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute right-0 w-24 sm:w-48 lg:w-72 h-full z-0 bg-gradient-to-b from-[#223766] to-[#111827] to-50%"
        />
      </div>
    </section>
  );
}
