import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

const images = [
  { id: 1, src: "/images/1.jpg", title: "Urban Steps", category: "Architecture" },
  { id: 2, src: "/images/2.jpg", title: "Kids at Play", category: "People" },
  { id: 3, src: "/images/3.jpg", title: "Wall Mural", category: "Architecture" },
  { id: 4, src: "/images/4.jpg", title: "City Cyclist", category: "Street" },
  { id: 5, src: "/images/5.jpg", title: "Man's Best Friend", category: "People" },
  { id: 6, src: "/images/6.jpg", title: "On Patrol", category: "Street" },
  { id: 7, src: "/images/7.jpg", title: "Rickshaw Guy", category: "Street" },
  { id: 8, src: "/images/8.jpg", title: "Clocktower Sunset", category: "Architecture" },
  { id: 9, src: "/images/9.jpg", title: "Vintage", category: "Street" },
  { id: 10, src: "/images/10.jpg", title: "Love by the Harbourside", category: "People" },
  { id: 11, src: "/images/11.jpg", title: "Street Performer", category: "People" },
  { id: 12, src: "/images/12.jpg", title: "Bench Stories", category: "People" },
  { id: 13, src: "/images/13.jpg", title: "Night Porch", category: "Street" },
  { id: 14, src: "/images/14.jpg", title: "Team", category: "People" },
  { id: 15, src: "/images/15.jpg", title: "Enemy territory", category: "People" },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

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

      <section className="px-4 md:px-6 pb-20 flex-1">
        <div className="max-w-[1800px] mx-auto">
          <Gallery images={images} />
        </div>
      </section>

      <Footer />
    </main>
  );
}