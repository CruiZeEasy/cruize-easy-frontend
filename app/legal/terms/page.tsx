"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";

export default function TermsPage() {
  return (
    <div className="py-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 sm:mb-12"
      >
        <div className="mb-6">
          <BackButton variant="mobile" showOnDesktop />
        </div>
        <h1 className="text-3xl sm:text-4xl font-gilroy-bold text-neutral-900 mb-3">
          Terms and Conditions
        </h1>
        <p className="text-neutral-500 font-gilroy-medium text-sm">
          Last Updated: 17th of December 2025
        </p>
      </motion.div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 lg:p-12"
      >
        {/* Section 1 */}
        <Section number="1" title="Introduction & Acceptance of Terms">
          <p>
            CruizeEasy LTD. "CruizeEasy" operates a peer-to-peer vehicle sharing
            platform that connects vehicle owners ("Hosts") with individuals
            seeking to rent vehicles ("Renters"). CruizeEasy provides the
            technology and marketplace only and is not a party to any rental
            agreement formed between Hosts and Renters.
          </p>
          <p>
            By accessing or using the CruizeEasy web app, or related services
            (collectively, the "Platform"), you confirm that you have read,
            understood, and agree to be bound by these Terms and Conditions
            ("Terms"). If you do not agree, you must discontinue use
            immediately.
          </p>
          <p className="font-gilroy-medium text-neutral-700">
            The Platform is available only to individuals 21 years of age or
            older.
          </p>
        </Section>

        {/* Section 2 */}
        <Section number="2" title="Nature of the Service">
          <p>
            CruizeEasy acts solely as an intermediary. We do not own, lease,
            maintain, insure, or control any vehicles listed on the Platform.
          </p>
          <p>
            All rental transactions, agreements, damages, disputes, and
            liabilities exist directly between Hosts and Renters. CruizeEasy
            does not assume responsibility for:
          </p>
          <BulletList
            items={[
              "Accuracy of user-provided information",
              "Conduct of any user",
              "Losses, damages, or injuries arising from a rental",
            ]}
          />
          <p>
            Users agree that any claim resulting from another user's actions
            must be pursued only against that user, not CruizeEasy.
          </p>
        </Section>

        {/* Section 3 */}
        <Section number="3" title="Eligibility & User Representations">
          <p>By using the Platform, you represent that:</p>
          <BulletList
            items={[
              "You are at least 21 years old",
              "All information provided is accurate and current",
              "You have legal capacity to enter binding agreements",
              "You will comply with all applicable laws",
              "You will not use the Platform for unlawful or unauthorized purposes",
            ]}
          />
          <p>
            CruizeEasy reserves the right to suspend or terminate accounts that
            provide false, misleading, or incomplete information.
          </p>
        </Section>

        {/* Section 4 */}
        <Section number="4" title="Account Registration">
          <p>
            To access certain features, users must create an account. You are
            responsible for maintaining the confidentiality of your login
            credentials and all activity conducted under your account.
          </p>
          <p>
            CruizeEasy may refuse, suspend, or terminate any account at its sole
            discretion, without obligation to provide a reason.
          </p>
        </Section>

        {/* Section 5 */}
        <Section number="5" title="Host & Renter Requirements">
          <SubSection title="Hosts">
            <p>Hosts must:</p>
            <BulletList
              items={[
                "Be the lawful owner or authorized controller of the vehicle",
                "Provide valid ownership and registration documents",
                "Ensure the vehicle is legally operable and safe",
                "Provide or seek tracker if the case may be",
              ]}
            />
          </SubSection>
          <SubSection title="Renters">
            <p>Renters must:</p>
            <BulletList
              items={[
                "Hold a valid driver's license",
                "Meet any additional requirements specified by the Host or Platform",
              ]}
            />
          </SubSection>
          <p>
            CruizeEasy does not guarantee that a Host will approve a booking or
            that a Renter will be accepted.
          </p>
        </Section>

        {/* Section 6 */}
        <Section number="6" title="Identity & Vehicle Verification">
          <p>
            CruizeEasy may, but is not obligated to, conduct identity, license,
            or vehicle verification using third-party services where permitted
            by law.
          </p>
          <p>
            Verification does not constitute endorsement, certification, or
            warranty of any user or vehicle. Users remain solely responsible for
            verifying counterparties and documentation at the time of vehicle
            handover.
          </p>
        </Section>

        {/* Section 7 */}
        <Section number="7" title="Payments & Fees">
          <p>
            Payments are processed through approved third-party payment
            providers. By submitting payment details, you authorize CruizeEasy
            to process charges related to bookings, fees, penalties, or
            adjustments.
          </p>
          <p>CruizeEasy may:</p>
          <BulletList
            items={[
              "Correct pricing errors",
              "Cancel suspicious or fraudulent transactions",
              "Refund bookings that do not proceed",
            ]}
          />
          <p>All prices may be subject to applicable taxes.</p>
        </Section>

        {/* Section 8 */}
        <Section number="8" title="User Conduct & Prohibited Activities">
          <p>Users agree not to:</p>
          <BulletList
            items={[
              "Harass, threaten, or defame others",
              "Misrepresent identity or credentials",
              "Circumvent Platform security measures",
              "Scrape, copy, or exploit Platform data",
              "Conduct transactions outside the Platform",
              "Use automated systems or bots",
              "Upload malicious code or harmful content",
              "Use the Platform for competing or commercial misuse",
            ]}
          />
          <p className="font-gilroy-medium text-neutral-700">
            Violations may result in immediate suspension or termination.
          </p>
        </Section>

        {/* Section 9 */}
        <Section number="9" title="User Content & Feedback">
          <p>
            By submitting reviews, messages, or other content, you grant
            CruizeEasy a non-exclusive, royalty-free, worldwide license to use,
            display, and distribute such content for Platform-related purposes.
          </p>
          <p>
            Users remain solely responsible for their content and must ensure it
            is lawful, accurate, and non-infringing.
          </p>
        </Section>

        {/* Section 10 */}
        <Section number="10" title="Reviews & Ratings">
          <p>Reviews must be:</p>
          <BulletList
            items={[
              "Based on genuine experiences",
              "Free from hate, discrimination, or falsehoods",
              "Non-manipulative and non-coordinated",
            ]}
          />
          <p>
            CruizeEasy may remove reviews at its discretion and does not endorse
            user opinions.
          </p>
        </Section>

        {/* Section 11 */}
        <Section number="11" title="Third-Party Accounts & Services">
          <p>
            Users may link third-party accounts (e.g., Google). CruizeEasy is
            not responsible for third-party services, content, or data
            practices.
          </p>
        </Section>

        {/* Section 12 */}
        <Section number="12" title="Platform Management">
          <p>CruizeEasy reserves the right to:</p>
          <BulletList
            items={[
              "Monitor usage",
              "Enforce these Terms",
              "Restrict access",
              "Remove content",
              "Report unlawful activity",
            ]}
          />
          <p>All decisions are made at CruizeEasy's discretion.</p>
        </Section>

        {/* Section 13 */}
        <Section number="13" title="Privacy">
          <p>
            Use of the Platform is subject to our{" "}
            <Link
              href="/legal/privacy"
              className="text-primary-dark hover:underline font-gilroy-medium"
            >
              Privacy Policy
            </Link>
            , which governs data collection, use, and storage.
          </p>
        </Section>

        {/* Section 14 */}
        <Section number="14" title="Intellectual Property">
          <p>
            All Platform software, branding, designs, and content belong to
            CruizeEasy or its licensors. Unauthorized use is strictly
            prohibited.
          </p>
        </Section>

        {/* Section 15 */}
        <Section number="15" title="Disclaimers">
          <p>
            The Platform is provided "as is" and "as available." CruizeEasy
            makes no warranties regarding accuracy, availability, or
            reliability.
          </p>
          <p>We do not guarantee:</p>
          <BulletList
            items={[
              "User behavior",
              "Vehicle safety",
              "Continuous access",
              "Error-free operation",
            ]}
          />
          <p className="font-gilroy-medium text-neutral-700">
            Use is at your own risk.
          </p>
        </Section>

        {/* Section 16 */}
        <Section number="16" title="Limitation of Liability">
          <p>
            To the maximum extent permitted by law, CruizeEasy shall not be
            liable for any indirect, incidental, consequential, or punitive
            damages arising from Platform use, including loss of profits, data,
            or vehicle damage.
          </p>
        </Section>

        {/* Section 17 */}
        <Section number="17" title="Indemnification">
          <p>
            You agree to indemnify and hold CruizeEasy harmless from claims
            arising from:
          </p>
          <BulletList
            items={[
              "Your use of the Platform",
              "Breach of these Terms",
              "Violation of laws or third-party rights",
            ]}
          />
        </Section>

        {/* Section 18 */}
        <Section number="18" title="Term & Termination">
          <p>
            These Terms remain effective until terminated. CruizeEasy may
            terminate access at any time without notice. Terminated users may
            not create new accounts.
          </p>
        </Section>

        {/* Section 19 */}
        <Section number="19" title="Modifications">
          <p>
            CruizeEasy may update these Terms at any time. Continued use
            constitutes acceptance of revised Terms.
          </p>
        </Section>

        {/* Section 20 */}
        <Section number="20" title="Governing Law & Dispute Resolution">
          <p>
            These Terms are governed by the laws of the Federal Republic of
            Nigeria.
          </p>
          <p>
            Parties agree to attempt informal resolution before pursuing
            arbitration or court proceedings.
          </p>
        </Section>

        {/* Section 21 */}
        <Section number="21" title="Force Majeure">
          <p>
            CruizeEasy is not liable for failures caused by events beyond
            reasonable control, including outages, natural disasters, or
            third-party failures.
          </p>
        </Section>

        {/* Section 22 */}
        <Section number="22" title="Severability">
          <p>
            If any provision is found unenforceable, the remaining provisions
            remain valid.
          </p>
        </Section>

        {/* Section 23 - Contact */}
        <Section number="23" title="Contact Information">
          <p>
            In order to resolve a complaint regarding the Services or to receive
            further information regarding use of the Services, please contact
            us:
          </p>
          <div className="bg-neutral-50 rounded-xl p-6 mt-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <i className="fa fa-envelope text-primary-dark w-5" />
                <a
                  href="mailto:cruizeeasyapp@gmail.com"
                  className="text-primary-dark hover:underline font-gilroy-medium"
                >
                  cruizeeasyapp@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <i className="fa fa-location-dot text-primary-dark w-5 mt-1" />
                <span>311 Road A Close Block 2 Flat 8</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa fa-globe text-primary-dark w-5" />
                <span>CruizeEasy on all social media platforms</span>
              </div>
            </div>
          </div>
        </Section>
      </motion.div>
    </div>
  );
}

// ============ Helper Components ============

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10 last:mb-0 pb-10 last:pb-0 border-b last:border-b-0 border-neutral-150">
      <h2 className="text-lg sm:text-xl font-gilroy-bold text-neutral-900 mb-4">
        {number}. {title}
      </h2>
      <div className="space-y-4 text-neutral-600 font-gilroy-regular text-[15px] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <h3 className="font-gilroy-semibold text-neutral-800 mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 ml-1">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-dark mt-2 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
