"use client";
import Link from "next/link";

const navItems = [{ name: "Home", href: "/" }];

const legalItems = [
  { name: "Terms and Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

const Navber = () => (
  <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="text-2xl font-extrabold text-black tracking-tight transition duration-300 hover:text-dark-teal"
          >
            Greener Air
          </Link>
        </div>

        <nav className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 font-medium hover:text-dark-teal transition duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex space-x-4 border-l pl-4 border-gray-200">
            {legalItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs text-gray-500 hover:text-sky-blue transition duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="hidden sm:inline-block bg text-white font-semibold text-sm px-4 py-2 rounded-full hover:hoverBg transition duration-300 shadow-md"
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </div>
  </header>
);

export default Navber;
