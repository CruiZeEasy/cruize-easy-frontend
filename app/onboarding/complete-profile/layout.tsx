export default function CompleteProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-100 md:pb-28">
      <main className="max-w-[1440px] mx-auto w-full mt-4">
        <div className=" md:px-4 mx-4 md:border bg-white md:border-neutral-300 md:rounded-[30px]">
          <div>{children}</div>
        </div>
      </main>
    </div>
  );
}
