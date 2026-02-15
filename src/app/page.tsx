import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

const images = [
  { id: 1, src: "/images/1.jpg" },
  { id: 2, src: "/images/2.jpg" },
  { id: 3, src: "/images/3.jpg" },
  { id: 4, src: "/images/4.jpg" },
  { id: 5, src: "/images/5.jpg" },
  { id: 6, src: "/images/6.jpg" },
  { id: 7, src: "/images/7.jpg" },
  { id: 8, src: "/images/8.jpg" },
  { id: 9, src: "/images/9.jpg" },
  { id: 10, src: "/images/10.jpg" },
  { id: 11, src: "/images/11.jpg" },
  { id: 12, src: "/images/12.jpg" },
  { id: 13, src: "/images/13.jpg" },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <header className="pt-28 md:pt-36 pb-10 md:pb-16 px-4 md:px-6">
        <div className="max-w-[1800px] mx-auto">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Visual
            <span className="text-[#3a3a3a]"> stories</span>
          </h1>
          <p className="text-[#666] text-sm md:text-base max-w-sm mt-5 leading-relaxed">
            Documenting the quiet poetry of street life and human connection.
          </p>
        </div>
      </header>

      {/* Gallery */}
      <section className="px-4 md:px-6 pb-20">
        <div className="max-w-[1800px] mx-auto">
          <Gallery images={images} />
        </div>
      </section>

      <Footer />
    </main>
  );
}