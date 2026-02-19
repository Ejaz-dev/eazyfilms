"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    project_type: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.send(
        "service_08wkw2s",
        "template_9mqgv14",
        formData,
        "LM21hyZhzMFqTQ9W1"
      );
      setSubmitStatus("success");
      setFormData({
        from_name: "",
        from_email: "",
        project_type: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
    }

    setIsSubmitting(false);
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="pt-28 md:pt-36 pb-20 px-4 md:px-6 flex-1">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <motion.h1
                className="text-4xl md:text-5xl font-semibold tracking-tight mb-6"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Let's work
                <span className="text-[#555]"> together</span>
              </motion.h1>

              <motion.p
                className="text-[#888] leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Have a project in mind? I'd love to hear about it. Fill out the form and I'll get back to you within 24-48 hours.
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
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
                  <span className="text-[#555] text-sm block mb-1">Based in</span>
                  <span className="text-white">Newfoundland, Canada</span>
                </div>
              </motion.div>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#555] text-sm block mb-2">Name *</label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-[#555] text-sm block mb-2">Email *</label>
                  <input
                    type="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#555] text-sm block mb-2">Project Type</label>
                  <select
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleChange}
                    className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-white/30 focus:outline-none transition-colors appearance-none"
                    style={{ cursor: "pointer" }}
                  >
                    <option value="" className="bg-[#1a1a1a]">Select type</option>
                    <option value="Photography" className="bg-[#1a1a1a]">Photography</option>
                    <option value="Videography" className="bg-[#1a1a1a]">Videography</option>
                    <option value="Event Coverage" className="bg-[#1a1a1a]">Event Coverage</option>
                    <option value="Portrait Session" className="bg-[#1a1a1a]">Portrait Session</option>
                    <option value="Commercial" className="bg-[#1a1a1a]">Commercial</option>
                    <option value="Other" className="bg-[#1a1a1a]">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#555] text-sm block mb-2">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-white/30 focus:outline-none transition-colors appearance-none"
                    style={{ cursor: "pointer" }}
                  >
                    <option value="" className="bg-[#1a1a1a]">Select budget</option>
                    <option value="Under $500" className="bg-[#1a1a1a]">Under $500</option>
                    <option value="$500 - $1,000" className="bg-[#1a1a1a]">$500 - $1,000</option>
                    <option value="$1,000 - $2,500" className="bg-[#1a1a1a]">$1,000 - $2,500</option>
                    <option value="$2,500 - $5,000" className="bg-[#1a1a1a]">$2,500 - $5,000</option>
                    <option value="$5,000+" className="bg-[#1a1a1a]">$5,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#555] text-sm block mb-2">Tell me about your project *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-white/30 focus:outline-none transition-colors resize-none"
                  placeholder="Share your vision, timeline, and any other details..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-medium py-4 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
                    </svg>
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <motion.div
                  className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Failed to send message. Please try again or email directly.
                </motion.div>
              )}
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}