import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
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

      {/* Gallery placeholder */}
      <section className="px-4 md:px-6 pb-20">
        <div className="max-w-[1800px] mx-auto">
          <div className="masonry">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="masonry-item">
                <div
                  className="bg-[#161616] rounded overflow-hidden"
                  style={{
                    height: `${150 + (i % 3) * 100}px`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}