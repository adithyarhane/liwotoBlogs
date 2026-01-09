import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImagePlus, Save } from "lucide-react";
import { useBlogContext } from "../context/BlogContext";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import useTitle from "../components/useTitle";

const EditBlog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { userData } = useAuthContext();

  useTitle(`Edit blog - ${blogId}`);

  const { getBlogById, currentBlog, updateBlog, isLoading } = useBlogContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  // Fetch blog
  useEffect(() => {
    getBlogById(blogId);
  }, [blogId]);

  // Prefill form
  useEffect(() => {
    const setBlogDataInput = () => {
      if (currentBlog) {
        // 🚫 Prevent non-author editing
        if (currentBlog.author._id !== userData?._id) {
          toast.error("You are not allowed to edit this blog");
          navigate("/");
          return;
        }

        setTitle(currentBlog.title);
        setDescription(currentBlog.description);
        setContent(currentBlog.content);
        setTags(currentBlog.tags.join(", "));
      }
    };
    setBlogDataInput();
  }, [currentBlog]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setCoverImage(file);
  };

  const handleSubmit = async (isPublished) => {
    if (!userData?.isAccountVerified) {
      toast.error("Your account is not verified.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("isPublished", isPublished);

    // ✅ Normalize tags
    formData.append(
      "tags",
      JSON.stringify(
        tags
          .split(",")
          .map((t) => t.trim().toLowerCase().replace(/\s+/g, "-"))
          .filter(Boolean)
      )
    );

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }
    if (!title || !description || !content) {
      toast.error("title, description, content are required.");
    } else {
      updateBlog(blogId, formData);
    }
  };

  if (!currentBlog) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-4" />
        <div className="h-5 bg-gray-200 rounded mb-8" />
        <div className="h-72 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* ===== HEADER ===== */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSubmit(false)}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              <Save size={16} />
              Save Draft
            </button>

            <button
              onClick={() => handleSubmit(true)}
              disabled={isLoading}
              className={`px-5 py-2 rounded-lg text-sm font-medium text-white transition
                ${
                  isLoading
                    ? "bg-emerald-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
            >
              {isLoading ? "Saving…" : "Update"}
            </button>
          </div>
        </div>
      </div>

      {/* ===== FORM ===== */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <form className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-8">
          {/* COVER IMAGE */}
          <label className="block cursor-pointer">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-500 transition">
              {coverImage ? (
                <img
                  src={URL.createObjectURL(coverImage)}
                  alt="Cover preview"
                  className="mx-auto max-h-60 rounded-lg object-cover"
                />
              ) : (
                <img
                  src={currentBlog.coverImage}
                  alt="Current cover"
                  className="mx-auto max-h-60 rounded-lg object-cover"
                />
              )}
            </div>
          </label>

          {/* TITLE */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog title"
            className="w-full text-3xl font-semibold outline-none border-b border-gray-200 focus:border-emerald-500 pb-2"
          />

          {/* DESCRIPTION */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Short description"
            className="w-full text-lg text-gray-700 outline-none resize-none border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-emerald-500"
          />

          {/* CONTENT */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            placeholder="Write your article..."
            className="w-full leading-relaxed outline-none resize-none border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-emerald-500"
          />

          {/* TAGS */}
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="react, node, mongodb"
            className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </form>
      </main>
    </div>
  );
};

export default EditBlog;
