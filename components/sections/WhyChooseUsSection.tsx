"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface reasonsProps {
  src: string;
  title: string;
  description: string;
}

const reasons: reasonsProps[] = [
  {
    src: "affordable-pricing",
    title: "Affordable Pricing",
    description:
      "Competitive rates that won't break the bank, with transparent pricing and no hidden fees.",
  },
  {
    src: "flexible-rentals",
    title: "Flexible Rentals",
    description:
      "Choose hourly, daily, or weekly rentals to fit your schedule and travel needs.",
  },
  {
    src: "premium-cars",
    title: "Premium Cars",
    description:
      "Drive the latest models with premium features and top-tier maintenance.",
  },
  {
    src: "support",
    title: "24/7 Support",
    description:
      "Our customer service team is always available to assist you with any issues.",
  },
  {
    src: "easy-app-usage",
    title: "Easy App Usage",
    description:
      "Intuitive mobile Web app that makes booking, unlocking, and returning cars a breeze.",
  },
];

export function WhyChooseUsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="container mb-12 sm:mb-20">
      <div className="bg-white p-4 md:p-8">
        {/* Title + Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-6 mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-gilroy-bold text-neutral-900">
            Why Choose Cruizeeasy
          </h2>
          <p className=" text-neutral-600 font-gilroy-medium max-w-[35rem]">
            We combine premium service with affordable rates to give you the
            best car rental experience possible.
          </p>
        </motion.div>

        {/* Reason Cards */}
        <div className="grid sm:grid-cols-2 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white border border-[#F3F4F6] p-8 rounded-lg"
            >
              <div className="flex items-center space-x-4 mb-6">
                <Image
                  src={`/images/icons/${reason.src}.svg`}
                  alt={`${reason.title} icon`}
                  width={50}
                  height={50}
                  className="size-[30px]"
                />
                <span className="font-semibold text-[20px] sm:text-[20px] text-neutral-900">
                  {reason.title}
                </span>
              </div>

              <p className="font-gilroy-medium text-neutral-600 max-w-[18rem]">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
