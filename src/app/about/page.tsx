import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-28 md:pt-36 pb-20 px-4 md:px-6">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            About
          </h1>

          <div className="space-y-6 text-[#999] leading-relaxed">
            <p>
              eazyfilms is a visual project focused on capturing the raw beauty of everyday moments — street life, human connection, and the quiet poetry found in urban landscapes.
            </p>
            <p>
              Based in Newfoundland, Canada. Currently shooting on Sony Alpha.
            </p>
            <p>
              For inquiries, collaborations, or prints, feel free to reach out.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-[#1a1a1a]">
            <a href="mailto:hello@eazyfilms.com" className="text-white hover:text-[#888] transition-colors">
              hello@eazyfilms.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}