import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-28 md:pt-36 pb-20 px-4 md:px-6">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            Contact
          </h1>

          <div className="space-y-8 text-[#999]">
            <p className="leading-relaxed">
              Available for freelance work, collaborations, and print inquiries.
            </p>

            <div className="space-y-4">
              <div>
                <span className="text-[#555] text-sm block mb-1">Email</span>
                <a href="mailto:hello@eazyfilms.com" className="text-white hover:text-[#888] transition-colors">
                  hello@eazyfilms.com
                </a>
              </div>

              <div>
                <span className="text-[#555] text-sm block mb-1">Instagram</span>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#888] transition-colors">
                  @eazyfilms
                </a>
              </div>

              <div>
                <span className="text-[#555] text-sm block mb-1">Vimeo</span>
                <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#888] transition-colors">
                  vimeo.com/eazyfilms
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}