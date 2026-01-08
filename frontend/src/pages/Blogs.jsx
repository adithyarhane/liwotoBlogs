import { useState } from "react";
import { useBlogContext } from "../context/BlogContext";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Blogs = () => {
  const { blogs, isLoading } = useBlogContext();
  const [filter, setFilter] = useState("latest");

  // sort blogs based on filter
  const sortedBlogs = blogs
    ? [...blogs].sort((a, b) => {
        if (filter === "latest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (filter === "popular") {
          return (b.likes?.length || 0) - (a.likes?.length || 0);
        }
        return 0;
      })
    : [];

  const featuredBlogs = sortedBlogs.slice(0, 2);
  const otherBlogs = sortedBlogs.slice(2);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* ===== FEATURED BLOGS ===== */}
      <section className="max-w-7xl mx-auto px-4 py-4 pb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Featured Articles
        </h2>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-64 bg-white border border-gray-200 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {featuredBlogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog._id}`}
                className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="h-64 w-full object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold leading-snug">
                    {blog.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-200 line-clamp-2">
                    {blog.description}
                  </p>
                  <div className="mt-3 text-xs text-gray-300">
                    {blog.author.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ===== MAIN BLOG FEED ===== */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {filter === "latest" ? "Latest Articles" : "Popular Articles"}
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => setFilter("latest")}
              className={`text-sm px-3 py-1.5 border rounded-md transition ${
                filter === "latest"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              Latest
            </button>

            <button
              onClick={() => setFilter("popular")}
              className={`text-sm px-3 py-1.5 border rounded-md transition ${
                filter === "popular"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              Popular
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-65 bg-white border border-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : otherBlogs.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="text-lg font-medium text-gray-900">
              No more articles
            </h3>
            <p className="mt-2 text-gray-600">
              New blogs will appear here soon.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherBlogs.map((blog) => (
              <Card key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Blogs;
