import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, Save } from "lucide-react";
import { useBlogContext } from "../context/BlogContext";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import useTitle from "../components/useTitle";

const CreateBlog = () => {
  useTitle("Create your blog");
  const navigate = useNavigate();
  const { userData } = useAuthContext();
  const { createBlog, isLoading } = useBlogContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setCoverImage(file);
  };

  const handleSubmit = async (isPublished) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("isPublished", isPublished);
    formData.append(
      "tags",
      JSON.stringify(
        tags
          .split(",")
          .map((tag) => tag.trim().toLowerCase().replace(/\s+/g, "-"))
          .filter(Boolean)
      )
    );

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }
    if (!userData.isAccountVerified) {
      toast.error("Your account is not Verified.");
    } else if (!title || !description || !content) {
      toast.error("title, descripiton, content are required.");
    } else {
      createBlog(formData);
    }
  };

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
              {isLoading ? "Saving…" : "Publish"}
            </button>
          </div>
        </div>
      </div>

      {/* ===== FORM ===== */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <form className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-8">
          {/* COVER IMAGE UPLOAD */}
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
                <div className="flex flex-col items-center gap-2 text-gray-500">
                  <ImagePlus size={32} />
                  <p className="text-sm font-medium">Upload cover image</p>
                  <p className="text-xs text-gray-400">
                    JPG, PNG, WEBP (max 5MB)
                  </p>
                </div>
              )}
            </div>
          </label>

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full text-lg px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of the article"
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              required
            />
          </div>

          {/* CONTENT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article here..."
              rows={12}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              required
            />
          </div>

          {/* TAGS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="react, node, mongodb"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">
              Separate tags with commas
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateBlog;
