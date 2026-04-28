import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-colors duration-250 dark:bg-black/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:h-[72px] lg:px-8">
        
        {/* BRAND LOCK */}
        <div className="flex items-center justify-start">
          <Link 
            href="/" 
            className="group inline-flex cursor-pointer items-center justify-start rounded-md px-3 py-2 -mx-3 -my-2 transition-opacity duration-150 ease-in-out hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-400 focus-visible:outline-offset-4"
            aria-label="Brand-D Homepage"
          >
            {/* Logo Icon with Optical Alignment */}
            <div className="relative h-6 w-6 translate-y-[1px]">
              <Image 
                src="/logo/image.png" 
                alt="" 
                fill 
                className="object-contain"
                priority
              />
            </div>

            {/* Brand Text - Hidden on extremely small screens to preserve grid */}
            <span className="ml-2 hidden text-[18px] font-bold leading-none tracking-[-0.02em] text-black dark:text-white sm:block lg:ml-3 lg:text-[20px]">
              <span className="opacity-80">Brand-</span>
              <span className="opacity-100">D</span>
            </span>
          </Link>
        </div>

        {/* SECONDARY NAVIGATION (Placeholder for future implementation) */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#services" className="text-sm font-medium text-gray-500 transition-colors duration-150 hover:text-black dark:text-gray-400 dark:hover:text-white">Services</Link>
          <Link href="#results" className="text-sm font-medium text-gray-500 transition-colors duration-150 hover:text-black dark:text-gray-400 dark:hover:text-white">Results</Link>
          <Link href="#why" className="text-sm font-medium text-gray-500 transition-colors duration-150 hover:text-black dark:text-gray-400 dark:hover:text-white">Why Us</Link>
          <Link href="#contact" className="rounded-full bg-black px-6 py-2.5 text-sm font-bold text-white transition-opacity duration-150 hover:opacity-80 dark:bg-white dark:text-black">
            Get Proposal
          </Link>
        </div>
      </nav>
    </header>
  );
}
