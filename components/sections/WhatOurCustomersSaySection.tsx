import Image from "next/image";
import React from "react";

interface CustomerProps {
  id: number;
  name: string;
  location: string;
  src: string;
  testimonial: string;
}

const customers: CustomerProps[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    src: "customer-1",
    testimonial:
      "Cruizeeasy made my business trip so much smoother. The car was immaculate and the pickup process was incredibly fast. I'll definitely be using this service again.",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Los Angeles, CA",
    src: "customer-2",
    testimonial:
      "I loved the variety of cars available. Booking was simple, and the support team was super responsive when I had a question.",
  },
  {
    id: 3,
    name: "Emma Williams",
    location: "Chicago, IL",
    src: "customer-3",
    testimonial:
      "Hands down the best rental experience I've had. Smooth, transparent, and the car exceeded expectations.",
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Houston, TX",
    src: "customer-1",
    testimonial:
      "The booking process was effortless, and the car was in perfect condition. Cruizeeasy has earned a loyal customer in me.",
  },
  {
    id: 5,
    name: "Olivia Martinez",
    location: "Miami, FL",
    src: "customer-2",
    testimonial:
      "Fantastic experience from start to finish. The staff was friendly and the car was exactly what I needed for my trip.",
  },
  {
    id: 6,
    name: "James Anderson",
    location: "Seattle, WA",
    src: "customer-3",
    testimonial:
      "I’ve tried other rental services before, but none compare to the convenience and reliability of Cruizeeasy.",
  },
];

export function WhatOurCustomersSaySection() {
  return (
    <section className="container mb-12 sm:mb-20">
      <div className="flex flex-col items-center text-center space-y-6 mb-12">
        <h2 className="text-3xl sm:text-4xl font-gilroy-bold">
          What Our Customers Say
        </h2>
        <p className=" text-neutral-600 font-gilroy-medium max-w-[36rem]">
          Don't just take our word for it. Here's what our customers have to say
          about their Cruizeeasy experience.
        </p>
      </div>

      <div className="bg-white p-4 md:p-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {customers.map((customer) => (
          <div
            key={customer.name}
            className="bg-white border border-[#F3F4F6] p-8 font-inter rounded-lg"
          >
            <div className="flex space-x-2 mb-4 ">
              <div className="size-12 relative rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={`/images/customers/${customer.src}.png`}
                  alt={`${customer.name} avatar`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-neutral-500 flex flex-col space-y-2">
                <span className="font-semibold text-neutral-900 text-sm">
                  {customer.name}
                </span>
                <span className=" text-xs">{customer.location}</span>
              </div>
            </div>

            <div className="space-y-6">
              <Image
                src="/images/icons/five-stars.svg"
                alt="Rating"
                width={162}
                height={20}
                className="w-[162px] h-auto object-fit"
              />

              <p className="text-neutral-500 text-xs">
                "{customer.testimonial}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
