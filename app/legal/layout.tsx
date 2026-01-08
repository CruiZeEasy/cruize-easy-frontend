import { Footer } from "@/components/shared/Footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="max-w-[1440px] mx-auto">
        <main className="mb-28 pt-4 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
      <Footer />
    </>
  );
}
