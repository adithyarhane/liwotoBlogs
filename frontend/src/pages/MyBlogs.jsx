import { useEffect } from "react";
import { PenSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogContext } from "../context/BlogContext";
import Card from "../components/Card";

const MyBlogs = () => {
  const { getMyBlogs, myBlogs, isLoading, blogs } = useBlogContext();

  useEffect(() => {
    getMyBlogs();
  }, [blogs]);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* ===== HEADER ===== */}
      <header className="relative bg-white border-b border-gray-200 overflow-hidden">
        {/* subtle accent */}
        <div className="absolute -top-32 right-0 w-125 h-125 bg-emerald-100/40 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                <PenSquare size={22} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                  My Articles
                </h1>
                <p className="max-w-2xl text-gray-600 leading-relaxed">
                  Articles you’ve written and published. Manage, review, and
                  improve your work from one place.
                </p>
              </div>
            </div>

            <Link
              to="/create-blog"
              className="mt-4 inline-flex w-fit items-center px-5 py-2.5 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition"
            >
              Write new article
            </Link>
          </div>
        </div>
      </header>

      {/* ===== CONTENT ===== */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* LOADING */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-65 bg-white border border-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && myBlogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
              <PenSquare size={28} />
            </div>

            <h3 className="text-xl font-medium text-gray-900">
              You haven’t written any articles yet
            </h3>
            <p className="mt-2 text-gray-600 max-w-sm">
              Start sharing your ideas and knowledge with the community.
            </p>

            <Link
              to="/create-blog"
              className="mt-6 inline-flex items-center px-5 py-2.5 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition"
            >
              Write your first blog
            </Link>
          </div>
        )}

        {/* BLOG GRID */}
        {!isLoading && myBlogs.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBlogs.map((blog) => (
              <Card key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBlogs;
