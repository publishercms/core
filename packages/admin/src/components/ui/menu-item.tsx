import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export const MenuItem = ({ target, children }: {
  target: string;
  children: ReactNode;
}) => {
  return (
    <Link
      to={target}
      className="rounded-md bg-gray-200/70 hover:bg-gray-200 transition-all outline-none inline-flex flex-0 w-min items-center px-5 py-1.5 text-stone-700 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] data-[status=active]:bg-blue-100"
    >
      {children}
    </Link>
  );
}