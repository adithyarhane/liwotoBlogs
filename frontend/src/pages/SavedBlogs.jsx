import { useEffect } from "react";
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogContext } from "../context/BlogContext";
import Card from "../components/Card";
import useTitle from "../components/useTitle";

const SavedBlogs = () => {
  useTitle("Saved blogs");
  const { getSavedBlogs, savedBlogs, isLoading, blogs } = useBlogContext();

  useEffect(() => {
    getSavedBlogs();
  }, [blogs]);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* ===== HEADER ===== */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Bookmark size={20} />
            </div>

            <div>
              <h1 className="text-3xl font-semibold text-gray-900">
                Saved Articles
              </h1>
              <p className="mt-1 text-gray-600">
                Articles you`ve bookmarked to read later
              </p>
            </div>
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
        {!isLoading && savedBlogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
              <Bookmark size={28} />
            </div>

            <h3 className="text-xl font-medium text-gray-900">
              No saved articles yet
            </h3>
            <p className="mt-2 text-gray-600 max-w-sm">
              When you save articles, they’ll appear here for easy access later.
            </p>

            <Link
              onClick={() => scrollTo(0, 0)}
              to="/blogs"
              className="mt-6 inline-flex items-center px-5 py-2.5 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition"
            >
              Explore blogs
            </Link>
          </div>
        )}

        {/* SAVED BLOGS GRID */}
        {!isLoading && savedBlogs.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedBlogs.map((blog) => (
              <Card key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedBlogs;
