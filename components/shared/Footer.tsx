"use client";

import React from "react";
import { Button } from "../ui/Buttons";
import Image from "next/image";
import Link from "next/link";
import { PageTransitionSpinner } from "../ui/PageTransitionSpinner";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PATHS } from "@/utils/path";

interface SocialIconsProps {
  href: string;
  title: string;
  name: string;
}

interface BadgeIconsProps {
  href: string;
  title: string;
}

interface FooterLinkProps {
  href: string;
  label: string;
}

const socialIcons: SocialIconsProps[] = [
  {
    href: "https://www.facebook.com/share/1b39zJ1VHg/?mibextid=wwXIfr",
    title: "fa-facebook-f",
    name: "Facebook",
  },
  {
    href: "https://x.com/cruizeeasy?s=21",
    title: "fa-x-twitter",
    name: "Twitter",
  },
  {
    href: "https://www.instagram.com/cruizeeasy?igsh=MXZ5eTJvMXlreW0wOA%3D%3D&utm_source=qr",
    title: "fa-instagram",
    name: "Instagram",
  },
  {
    href: "https://www.tiktok.com/@cruize.easy?_t=ZN-90FEHsYsVi2&_r=1",
    title: "fa-tiktok",
    name: "TikTok",
  },
];

const badgeIcons: BadgeIconsProps[] = [
  { href: "#", title: "app-store" },
  { href: "#", title: "play-store" },
];

const supportLinks: FooterLinkProps[] = [
  { href: "#", label: "Help Center" },
  { href: "#", label: "FAQ" },
  { href: "#", label: "Contact Us" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Privacy Policy" },
];

const quickLinks: FooterLinkProps[] = [
  { href: "#", label: "Home" },
  { href: "#", label: "How it Works" },
  { href: "#", label: "Features" },
  { href: "#", label: "Cars" },
  { href: "#", label: "Testimonials" },
];

export function Footer() {
  const { navigate, isNavigating } = usePageTransition();
  return (
    <footer className="bg-neutral-900 text-white pt-8 md:pt-16  rounded-t-[30px]">
      <div className="container ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 mb-12">
          <section>
            <Image
              src="/images/logo/cruize-easy-logo.svg"
              alt="Cruize Easy Logo"
              width={192}
              height={38}
              className="w-40 lg:w-48 h-auto mb-4"
              quality={100}
              priority
            />

            <p className="text-sm text-pretty text-neutral-400 max-w-full sm:max-w-[20rem] mb-6">
              Premium car rentals and ride services at affordable prices.
              Experience luxury without breaking the bank.
            </p>

            <div className="flex items-center space-x-4 mb-6">
              {socialIcons.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${item.name} page`}
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  <i className={`fa-brands ${item.title}`}></i>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3 mb-10">
              {badgeIcons.map((item) => (
                <Link key={item.title} href={item.href}>
                  <Image
                    src={`/images/badges/${item.title}.png`}
                    width={230}
                    height={70}
                    alt={`${item.title} icon`}
                    className="w-28 h-auto"
                    quality={100}
                  />
                </Link>
              ))}
            </div>

            {/* Support Links */}
            <nav aria-label="Support">
              <h3 className="font-semibold text-white mb-6">Support</h3>
              <ul className="text-sm text-neutral-400 space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          <section>
            {/* Quick Links */}
            <nav aria-label="Quick Links" className="mb-10">
              <h3 className="font-semibold text-white mb-6">Quick Links</h3>
              <ul className="text-sm text-neutral-400 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="font-semibold text-white mb-6">
                Start your Journey Today
              </h3>

              <p className="text-sm text-pretty text-neutral-400 mb-6 max-w-full sm:max-w-[20rem]">
                Ready to experience the best in car rentals? Sign up now and get
                your first ride at a special discount.
              </p>

              <Button
                variant="primary"
                fullWidth
                rounded="full"
                className="lg:w-[25rem] p-4"
                onClick={() => navigate(PATHS.AUTH.SIGNUP)}
              >
                Sign Up Now
              </Button>
            </div>
          </section>
        </div>

        <section className="col-span-2 text-center border-t border-neutral-800 py-8">
          <p className="text-neutral-500 text-xs space-x-6">
            <span>© {new Date().getFullYear()}</span> <span>Cruizeeasy. All rights reserved.</span>
          </p>
        </section>
      </div>

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </footer>
  );
}
