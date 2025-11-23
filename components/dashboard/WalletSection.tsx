import { Button } from "../ui/Buttons";

export function WalletSection() {
  return (
    <section>
      <h2 className="font-gilroy-bold text-sm md:hidden">Wallet Balance</h2>
      <div className="rounded-[20px] mt-2 md:mt-0 p-4 bg-white border border-neutral-150 md:border-none shadow-[0_6px_17.9px_0_rgba(0,0,0,0.1)] md:shadow-none">
        <div className="flex justify-between items-center">
          <span className="font-gilroy-medium text-xs text-black-transparent md:hidden">
            {new Date().toLocaleString("en-US", { month: "long" })}
          </span>
          <h2 className="font-gilroy-bold hidden md:block">Wallet</h2>
          <span className="font-gilroy-medium text-xs text-black-transparent hidden md:block ">
            {new Date().toLocaleString("en-US", { month: "long" })}
          </span>
        </div>

        <div className="mt-8">
          <span className="font-gilroy-bold text-4xl text-neutral-700">
            <span className="font-source-sans font-bold text-[2.5rem]">₦</span>
            0.00
          </span>

          <div className="flex justify-end items-center mt-1">
            <Button
              variant="dark-primary"
              fontFamily="gilroy-medium"
              shadow="shadow-none"
              className="py-3 md:px-6 text-xs"
            >
              Create Wallet
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
