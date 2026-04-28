import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#f0f0f0] bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-8 lg:px-16">

        {/* BRAND LOCK */}
        <Link
          href="/"
          className="group inline-flex cursor-pointer items-center gap-2.5 transition-opacity duration-150 hover:opacity-70"
          aria-label="Brand-D Homepage"
        >
          <div className="relative h-6 w-6">
            <Image
              src="/logo/image.png"
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-[17px] font-black tracking-[-0.03em] text-[#0a0a0a]">
            Brand-D
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="hidden items-center gap-8 md:flex">
          {['Services', 'Results', 'Why Us'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-[13px] font-semibold text-[#6b6b6b] transition-colors duration-150 hover:text-[#0a0a0a]"
            >
              {item}
            </Link>
          ))}
          <Link
            href="#contact"
            id="nav-cta"
            className="group flex items-center gap-2 rounded-full bg-[#0a0a0a] px-5 py-2.5 text-[13px] font-bold text-white transition-all duration-200 hover:bg-[#222]"
          >
            Get Free Growth Plan
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
