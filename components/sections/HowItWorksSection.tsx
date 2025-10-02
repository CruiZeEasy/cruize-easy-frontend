"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface stepsProps {
  src: string;
  title: string;
  description: string;
}

const steps: stepsProps[] = [
  {
    src: "browse-cars",
    title: "Browse Cars",
    description:
      "Choose from our wide selection of premium vehicles to suit your needs.",
  },
  {
    src: "book-instantly",
    title: "Book Instantly",
    description:
      "Secure your reservation with our simple, fast booking process.",
  },
  {
    src: "drive-easily",
    title: "Drive Easily",
    description: "Pick up your vehicle and hit the road with zero hassle.",
  },
  {
    src: "enjoy-the-journey",
    title: "Enjoy the Journey",
    description:
      "Experience the comfort and reliability of our premium fleet. ",
  },
];

export function HowItWorksSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="container mb-12 sm:mb-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center space-y-6 mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-gilroy-bold text-neutral-900">
          How It Works
        </h2>
        <p className=" text-neutral-600 font-gilroy-medium max-w-[30rem]">
          Getting on the road with Cruizeeasy is simple. Follow these easy steps
          and start your journey today.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="bg-white shadow-xs flex flex-col items-center text-center p-8 rounded-lg"
          >
            <Image
              src={`/images/icons/${step.src}.svg`}
              alt={`${step.title} icon`}
              width={105}
              height={105}
              className="size-[70px] mb-6"
            />

            <span className="font-modulus-semibold text-[20px] sm:text-[22px] mb-4 text-neutral-900">
              {step.title}
            </span>

            <p className="font-gilroy-regular text-neutral-600 max-w-[18rem]">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
