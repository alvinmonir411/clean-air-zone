import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Clean Air Zone
        </Link>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="/contact" className="hover:text-gray-900 transition">
            Contact
          </a>
          <a href="/privacy" className="hover:text-gray-900 transition">
            Privacy
          </a>
          <a href="/terms" className="hover:text-gray-900 transition">
            Terms
          </a>
          <a href="/adminDashboard" className="opacity-0 hover:opacity-100 transition-opacity text-gray-400 text-xs cursor-default">
            Admin
          </a>
        </div>
        <div className="text-sm text-gray-500 text-center md:text-right">
          &copy; {new Date().getFullYear()} Clean Air Zone. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
