"use client";

import { usePathname } from "next/navigation";

export default function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="flex-1 flex flex-col w-full">
      {children}
    </div>
  );
}
