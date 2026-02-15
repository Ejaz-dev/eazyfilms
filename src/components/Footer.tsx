export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] px-4 md:px-6 py-8">
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span
          className="text-lg font-medium"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          eazy<span className="text-[#555]">films</span>
        </span>

        <div className="flex gap-6 text-[#555] text-sm">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Instagram
          </a>
          <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Vimeo
          </a>
          <a href="mailto:hello@eazyfilms.com" className="hover:text-white transition-colors">
            Email
          </a>
        </div>

        <span className="text-[#333] text-sm">© 2025</span>
      </div>
    </footer>
  );
}