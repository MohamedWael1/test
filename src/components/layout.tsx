import { Rubik } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "./cart-provider";
import { ShoppingBagIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const rubik = Rubik({ subsets: ["latin"] });

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  const { totalCount } = useCart();

  return (
    <div className={cn("flex flex-col min-h-screen", rubik.className)}>
      <header className="bg-white container py-4 h-24 z-10 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="KNGU Logo"
            width={100}
            height={100}
            className="max-w-[100px]"
          />
        </Link>

        <nav>
          <ul className="flex items-center space-x-4 md:space-x-8">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "transition-all text-sm md:text-base",
                    pathname === href
                      ? "text-primary-600 hover:text-secondary-500"
                      : "text-secondary-500 hover:text-primary-600"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}

            <li>
              <Link href="/cart" className="relative" aria-label="Add to cart">
                <ShoppingBagIcon
                  size={24}
                  className={cn(
                    "text-secondary-500 hover:text-primary-600 transition-all",
                    pathname === "/cart" && "text-primary-600"
                  )}
                />
                <span className="absolute pointer-events-none rounded-full h-4 w-4 text-white p-3 text-xs bg-primary-500 flex items-center justify-center -top-3 -right-3">
                  {totalCount}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="bg-gray-100 text-secondary-500 py-4 text-center mt-auto text-sm">
        &copy; {new Date().getFullYear()} KNGU. All rights reserved.
      </footer>
    </div>
  );
};
