"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface CustomerProps {
  id: number;
  name: string;
  location: string;
  src: string | null; // null for placeholder
  testimonial: string;
}

const customers: CustomerProps[] = [
  {
    id: 1,
    name: "Albert Uttute",
    location: "Festac Town, Lagos",
    src: "albert-uttute",
    testimonial:
      "Cruizeeasy made my business trip so much smoother. The car was immaculate and the pickup process was incredibly fast. I'll definitely be using this service again.",
  },
  {
    id: 2,
    name: "Betrand Onwudiwe",
    location: "Lagos, Nigeria",
    src: "betrand-onwudiwe",
    testimonial:
      "As a car owner, making money was only on Uber and Bolt, but CruizeEasy made a car owner like me earn passive income by renting out my car to verified renters.",
  },
  {
    id: 3,
    name: "Gideon Egbune",
    location: "Lekki, Lagos",
    src: "gideon-egbune",
    testimonial:
      "Great experience with CruizeEasy! The car was clean, the service was smooth, and everything went exactly as expected. Super easy process and very reliable. I'd definitely use them again.",
  },
  {
    id: 4,
    name: "Daniel Opadele",
    location: "Lagos, Nigeria",
    src: "daniel-opadele",
    testimonial:
      "As a family man, CruizeEasy made me and my family a new source of income. We bought a personal car as a host and the process has been smooth since then. We use profit generated for my child's school fees.",
  },
  {
    id: 5,
    name: "Akinola Lawal",
    location: "Ikeja, Lagos",
    src: "akinola-lawal",
    testimonial:
      "Fantastic experience from start to finish. The founder was friendly and the car was exactly what I needed for my trip. The founder personally attended to all my needs.",
  },
  {
    id: 6,
    name: "Maria Olabisi",
    location: "Victoria Island, Lagos",
    src: null, // No image - will show initials
    testimonial:
      "I've tried other rental services before, most traditional, but none compare to the convenience and reliability of peer-to-peer car rental platform. Cruizeeasy is the best!",
  },
];

// Helper to get initials from name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Avatar component that handles both image and placeholder
function CustomerAvatar({ name, src }: { name: string; src: string | null }) {
  if (src) {
    return (
      <div className="size-12 relative rounded-full overflow-hidden shrink-0">
        <Image
          src={`/images/customers/${src}.webp`}
          alt={`${name} avatar`}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  // Placeholder with initials
  return (
    <div className="size-12 rounded-full shrink-0 bg-primary-dark flex items-center justify-center">
      <span className="text-white font-gilroy-bold text-sm">
        {getInitials(name)}
      </span>
    </div>
  );
}

export function WhatOurCustomersSaySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="container mb-12 sm:mb-20">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center space-y-6 mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-gilroy-bold">
          What Our Customers Say
        </h2>
        <p className="text-neutral-600 font-gilroy-medium max-w-xl">
          Don't just take our word for it. Here's what our customers have to say
          about their CruizeEasy experience.
        </p>
      </motion.div>

      {/* Testimonials */}
      <div className="bg-white p-4 md:p-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {customers.map((customer, i) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="bg-white border border-[#F3F4F6] p-8 rounded-lg 
              transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="flex space-x-3 mb-4">
              <CustomerAvatar name={customer.name} src={customer.src} />

              <div className="text-neutral-500 flex flex-col justify-center space-y-1">
                <span className="font-gilroy-semibold text-neutral-900 text-sm">
                  {customer.name}
                </span>
                <span className="text-xs">{customer.location}</span>
              </div>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.2 }}
              >
                <Image
                  src="/images/icons/five-stars.svg"
                  alt="5 star rating"
                  width={162}
                  height={20}
                  className="w-[140px] h-auto"
                />
              </motion.div>

              <p className="text-neutral-500 text-sm leading-relaxed">
                "{customer.testimonial}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
