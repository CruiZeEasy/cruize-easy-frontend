import Image from "next/image";

const brands = [
  { name: "Toyota", src: "/images/brands/toyota.png" },
  { name: "Mercedes", src: "/images/brands/benz.png" },
  { name: "Lexus", src: "/images/brands/lexus.png" },
  { name: "Audi", src: "/images/brands/audi.png" },
];

export function TopBrands() {
  return (
    <section className="mt-4 md:mt-6">
      <h2 className="font-gilroy-bold text-sm md:hidden">Top Brands</h2>
      <div className="rounded-[20px] mt-2 md:mt-0 md:p-4 md:bg-white md:border md:border-neutral-150 md:shadow-[0_6px_17.9px_0_rgba(0,0,0,0.1)]">
        <h2 className="font-gilroy-bold hidden md:block">Top Brands</h2>

        <div className="mt-4 flex md:grid md:grid-cols-5 gap-x-4 overflow-x-auto">
          {brands.map((brand) => (
            <button key={brand.name} className="text-center flex-shrink-0">
              <div className="bg-white border border-neutral-180 md:border-neutral-75 shadow-[0_4px_4px_0_rgba(0,0,0,0.1)] md:shadow-none rounded-lg flex items-center justify-center p-4 md:py-2 cursor-pointer ">
                <div className="size-8 relative">
                  <Image
                    src={brand.src}
                    alt="Location"
                    fill
                    quality={100}
                    className="object-contain"
                  />
                </div>
              </div>

              <span className="font-gilroy-regular text-xs">{brand.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
