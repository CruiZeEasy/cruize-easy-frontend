import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export const usePageTransition = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isNavigating, setIsNavigating] = useState(false);

  const navigate = (href: string, delay: number = 350) => {
    setIsNavigating(true);

    setTimeout(() => {
      startTransition(() => {
        router.push(href);
        // Reset after navigation completes
        setTimeout(() => setIsNavigating(false), 100);
      });
    }, delay);
  };

  return {
    navigate,
    isNavigating: isNavigating || isPending,
  };
};
