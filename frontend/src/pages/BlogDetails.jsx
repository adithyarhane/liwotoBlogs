import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, Bookmark } from "lucide-react";
import { useBlogContext } from "../context/BlogContext";
import { dateFormat } from "../utils/dateFormat";
import RelatedArticleCard from "../components/RelatedArticleCard";
import { useAuthContext } from "../context/AuthContext";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { userData, isLoggedIn } = useAuthContext();

  const {
    getBlogById,
    currentBlog,
    blogs,
    isLoading,
    handleLikeBlog,
    handleSaveBlog,
  } = useBlogContext();

  useEffect(() => {
    getBlogById(blogId);
  }, [blogId]);

  if (isLoading || !currentBlog) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-24 animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
        <div className="h-12 w-3/4 bg-gray-200 rounded mb-6" />
        <div className="h-6 w-2/3 bg-gray-200 rounded mb-10" />
        <div className="h-72 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  const {
    _id,
    title,
    description,
    content,
    coverImage,
    author,
    createdAt,
    likes = [],
    saves = [],
  } = currentBlog;

  const isLiked = likes.some((id) => id.toString() === userData?._id);
  const isSaved = saves.some((id) => id.toString() === userData?._id);

  const relatedBlogs =
    (blogs && blogs?.filter((b) => b._id !== _id).slice(0, 4)) || [];

  const handleAction = (e, id, actionFn) => {
    if (!isLoggedIn && !userData && !userData.isAccountVerified) {
      navigate("/login");
    } else {
      actionFn(e, id);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-14">
        {/* ================= MAIN ARTICLE ================= */}
        <article>
          {/* Meta */}
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span className="font-medium text-gray-800">
              {typeof author === "object" ? author.name : ""}
            </span>
            <span>·</span>
            <span>{dateFormat(createdAt)}</span>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="mt-6 text-xl text-gray-600 leading-relaxed">
            {description}
          </p>

          {/* Actions */}
          <div className="mt-8 flex items-center gap-6 text-sm">
            <button
              type="button"
              onClick={(e) => handleAction(e, _id, handleLikeBlog)}
              className={`flex items-center gap-2 transition ${
                isLiked ? "text-emerald-600" : "hover:text-emerald-600"
              }`}
            >
              <Heart size={18} className={isLiked ? "fill-emerald-600" : ""} />
              {likes.length}
            </button>

            <button
              type="button"
              onClick={(e) => handleAction(e, _id, handleSaveBlog)}
              className={`flex items-center gap-2 transition ${
                isSaved ? "text-emerald-600" : "hover:text-emerald-600"
              }`}
            >
              <Bookmark
                size={18}
                className={isSaved ? "fill-emerald-600" : ""}
              />
            </button>
          </div>

          <div className="mt-12 border-t border-gray-200" />

          {coverImage && (
            <div className="my-12">
              <img
                src={coverImage}
                alt={title}
                className="w-full rounded-2xl"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none prose-gray">{`${content}`}</div>
        </article>

        {/* ================= RELATED ================= */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-6">
              More Articles
            </h3>

            <div className="space-y-4">
              {relatedBlogs.map((blog) => (
                <RelatedArticleCard key={blog._id} blog={blog} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetails;
