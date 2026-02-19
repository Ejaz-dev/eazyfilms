import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Pricing",
  description: "Photography and videography service pricing by eazyfilms.",
};

const packages = [
  {
    name: "Basic",
    price: "500",
    description: "Perfect for personal portraits or small projects",
    features: [
      "2 hour session",
      "1 location",
      "25 edited photos",
      "Online gallery",
      "Print rights included",
      "Delivered in 7 days",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: "1,200",
    description: "Ideal for events, engagements, or content creation",
    features: [
      "4 hour session",
      "2 locations",
      "75 edited photos",
      "Online gallery",
      "Print rights included",
      "Delivered in 5 days",
      "Sneak peek within 48h",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "2,500",
    description: "Full coverage for weddings or commercial projects",
    features: [
      "8 hour session",
      "Unlimited locations",
      "150+ edited photos",
      "Online gallery",
      "Print rights included",
      "Delivered in 3 days",
      "Sneak peek within 24h",
      "Second photographer",
      "Highlight reel video",
    ],
    popular: false,
  },
];

const addons = [
  { name: "Extra hour", price: "150" },
  { name: "Rush delivery (24h)", price: "200" },
  { name: "Printed photo album", price: "350" },
  { name: "Second photographer", price: "400" },
  { name: "Drone footage", price: "300" },
  { name: "Raw files", price: "250" },
];

export default function Pricing() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="pt-28 md:pt-36 pb-20 px-4 md:px-6 flex-1">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Simple, transparent
              <span className="text-[#555]"> pricing</span>
            </h1>
            <p className="text-[#888] max-w-lg mx-auto">
              Choose a package that fits your needs. All packages include professional editing and full print rights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {packages.map(function(pkg) {
              return (
                <div
                  key={pkg.name}
                  className={"relative bg-white/[0.02] border rounded-2xl p-6 md:p-8 transition-all hover:bg-white/[0.04] " + (pkg.popular ? "border-white/20 scale-105 md:scale-110" : "border-white/5")}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                      {pkg.name}
                    </h3>
                    <p className="text-[#666] text-sm">{pkg.description}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-semibold">${pkg.price}</span>
                    <span className="text-[#666] ml-1">CAD</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map(function(feature) {
                      return (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400 flex-shrink-0 mt-0.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-[#aaa]">{feature}</span>
                        </li>
                      );
                    })}
                  </ul>

                  <Link
                    href="/contact"
                    className={"block w-full text-center py-3 rounded-xl font-medium transition-colors " + (pkg.popular ? "bg-white text-black hover:bg-white/90" : "bg-white/10 text-white hover:bg-white/20")}
                  >
                    Get Started
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: "'Clash Display', sans-serif" }}>
              Add-ons
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {addons.map(function(addon) {
                return (
                  <div key={addon.name} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl">
                    <span className="text-[#aaa]">{addon.name}</span>
                    <span className="text-white font-medium">+${addon.price}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-[#666] mb-4">
              Need something custom? Let's talk about your specific requirements.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-white hover:text-[#888] transition-colors"
            >
              Get a custom quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}