import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Soft gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-emerald-50 via-white to-transparent" />

        {/* Radial glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-225 h-225 bg-emerald-200/30 rounded-full blur-3xl" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-medium mb-8">
          ✨ Built for thinkers & creators
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
          Ideas that{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-emerald-700">
            shape thinking
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed">
          Read thoughtful articles. Write meaningful stories. Build clarity
          through words and technology.
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/create-blog"
            className="px-8 py-3 bg-emerald-500 text-white rounded-full font-medium shadow-md hover:bg-emerald-600 hover:shadow-lg transition"
          >
            Start Writing
          </Link>

          <Link
            to="/blogs"
            className="px-8 py-3 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition"
          >
            Explore Blogs
          </Link>
        </div>

        {/* Trust / Meta */}
        <p className="mt-10 text-sm text-gray-500">
          Crafted with MERN stack · Designed for clarity
        </p>
      </div>
    </section>
  );
};

export default Hero;
