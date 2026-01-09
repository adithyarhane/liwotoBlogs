import { BookOpen, PenTool, Users, ShieldCheck } from "lucide-react";
import useTitle from "../components/useTitle";

const About = () => {
  useTitle("About");
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* ===== HERO ===== */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            About <span className="text-emerald-600">LiwotoBlogs</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            LiwotoBlogs is a modern publishing platform built for writers,
            developers, and creators who value clarity, simplicity, and
            meaningful content.
          </p>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Our Mission
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              The goal of LiwotoBlogs is to provide a clean and distraction-free
              space where ideas matter more than noise. We believe writing
              should feel natural, calm, and focused — not overwhelming.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Whether you’re sharing technical knowledge, personal stories, or
              creative ideas, LiwotoBlogs gives you the tools to write, publish,
              and grow.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6">
            <div className="flex items-start gap-4">
              <PenTool className="text-emerald-600" />
              <div>
                <h4 className="font-medium text-gray-900">
                  Writer-first experience
                </h4>
                <p className="text-sm text-gray-600">
                  Minimal UI designed to keep you focused on writing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <BookOpen className="text-emerald-600" />
              <div>
                <h4 className="font-medium text-gray-900">
                  Quality over quantity
                </h4>
                <p className="text-sm text-gray-600">
                  Thoughtful content, not endless feeds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Users className="text-emerald-600" />
              <div>
                <h4 className="font-medium text-gray-900">Community-driven</h4>
                <p className="text-sm text-gray-600">
                  Built for readers and writers who care about ideas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECHNOLOGY ===== */}
      <section className="bg-white border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">
            Built with Modern Technology
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-center text-gray-600">
            LiwotoBlogs is engineered using modern web technologies to ensure
            performance, scalability, and security.
          </p>

          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {["MongoDB", "Express", "React", "Node.js"].map((tech) => (
              <div
                key={tech}
                className="bg-gray-50 border border-gray-200 rounded-xl py-6 text-center font-medium text-gray-800"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST & SECURITY ===== */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 text-emerald-700 mb-4">
                <ShieldCheck />
                <span className="font-medium">Secure & Reliable</span>
              </div>

              <p className="text-gray-700 leading-relaxed">
                We use secure authentication, protected APIs, and cloud-based
                storage to ensure your content and data remain safe.
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold text-gray-900">
              Built with Trust in Mind
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              From authentication to image uploads, every part of LiwotoBlogs is
              designed with best practices in mind. Your work stays yours —
              always.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER CTA ===== */}
      <section className="bg-emerald-600">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center text-white">
          <h2 className="text-3xl font-semibold">
            Start writing your story today
          </h2>
          <p className="mt-4 text-emerald-100">
            Join LiwotoBlogs and share ideas that matter.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
