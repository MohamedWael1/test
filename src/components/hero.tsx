import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="relative">
      <Image
        src="/hero-image.webp"
        className="absolute object-cover inset-0 h-full w-full"
        alt="Hero Image"
        height={200}
        width={1000}
      />

      <div className="relative z-10 container py-40 lg:py-36">
        <h1 className="text-5xl sm:text-6xl uppercase font-semibold text-gray-800 leading-tight mb-4">
          Happy <br /> Mother&apos;s day!{" "}
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Bouquets your mom will love!
        </p>
        <Link
          href="/products"
          className="capitalize flex items-center gap-px hover:text-primary-500 transition-all hover:translate-x-[4px]"
        >
          <span>Shop Now</span>
          <ArrowRight size={16} className="text-primary-500" />
        </Link>
      </div>
    </div>
  );
};
