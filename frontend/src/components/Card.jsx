import { Bookmark, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { dateFormat } from "../utils/dateFormat";
import { useAuthContext } from "../context/AuthContext";
import { useBlogContext } from "../context/BlogContext";

const Card = ({ blog }) => {
  const { userData } = useAuthContext();
  const isLiked = blog.likes.filter((id) => id === userData._id);

  return (
    <article
      className="
        group
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-sm
        hover:shadow-lg
        transition
        flex
        flex-row-reverse
        md:flex-col
      "
    >
      {/* IMAGE */}
      <div
        className="
          w-28
          sm:w-32
          md:w-full
          aspect-4/3
          md:aspect-auto
          md:h-52
          shrink-0
          relative
        "
      >
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="
            absolute inset-0
            w-full
            h-full
            object-cover
            rounded-r-2xl
            md:rounded-none
            group-hover:scale-105
            transition
            duration-500
          "
        />
      </div>

      {/* CONTENT */}
      <div
        className="
          flex
          flex-col
          justify-between
          gap-3
          p-4
          md:p-6
          flex-1
        "
      >
        {/* Title & Description */}
        <div>
          <Link
            to={`/blog/${blog._id}`}
            onClick={() => scrollTo(0, 0)}
            className="
              block
              text-[15px]
              md:text-xl
              font-semibold
              text-gray-900
              group-hover:text-emerald-600
              transition
              line-clamp-2
            "
          >
            {blog.title}
          </Link>

          <p
            className="
              mt-2
              text-sm
              text-gray-600
              leading-relaxed
              line-clamp-2
              md:line-clamp-3
            "
          >
            {blog.description}
          </p>
        </div>

        {/* META + ACTIONS */}
        <div className="flex items-center justify-between">
          <div className="text-xs md:text-sm text-gray-500">
            {blog.author.name} · {dateFormat(blog.createdAt)}
          </div>

          <div className="flex items-center gap-4">
            {isLiked.length === 1 ? (
              <button className="cursor-pointer flex items-center gap-1 text-emerald-600  transition text-xs md:text-sm">
                <Heart className="fill-emerald-600" size={15} />
                {blog.likes.length}
              </button>
            ) : (
              <button className="cursor-pointer flex items-center gap-1 text-gray-500  transition text-xs md:text-sm">
                <Heart size={15} />
                {blog.likes.length}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
