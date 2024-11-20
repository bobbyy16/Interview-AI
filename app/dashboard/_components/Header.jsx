"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Questions", path: "/dashboard/questions" },
  { label: "Upgrade", path: "/dashboard/upgrade" },
  { label: "How it works?", path: "/dashboard/how-it-works" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Link href="/dashboard">
        <Image src="/logo.svg" width={45} height={45} alt="logo" priority />
      </Link>

      <ul className="hidden md:flex gap-6">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                pathname === item.path ? "text-primary font-bold" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <UserButton />
    </div>
  );
};

export default Header;
