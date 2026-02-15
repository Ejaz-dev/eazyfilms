import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Film",
  description: "Selected video work and short films by eazyfilms.",
};

export default function Film() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-28 md:pt-36 pb-20 px-4 md:px-6">
        <div className="max-w-[1800px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            Film
          </h1>

          <p className="text-[#999] mb-12 max-w-lg">
            Selected video work and short films.
          </p>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Placeholder for videos - replace with your actual videos */}
            <div className="aspect-video bg-[#161616] rounded-lg flex items-center justify-center">
              <span className="text-[#555]">Video coming soon</span>
            </div>
            <div className="aspect-video bg-[#161616] rounded-lg flex items-center justify-center">
              <span className="text-[#555]">Video coming soon</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}