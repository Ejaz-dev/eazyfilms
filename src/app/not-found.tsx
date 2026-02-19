import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1
          className="text-8xl md:text-9xl font-semibold tracking-tight mb-4"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          4<span className="text-[#333]">0</span>4
        </h1>

        <p className="text-[#666] text-lg mb-8">
          This page doesn't exist or was moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
          Back to Home
        </Link>

        <div className="mt-16 flex justify-center gap-6 text-[#555] text-sm">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>
      </div>
    </main>
  );
}