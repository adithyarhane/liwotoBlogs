import React from "react";
import { Link } from "react-router-dom";
import { dateFormat } from "../utils/dateFormat";

const RelatedArticleCard = ({ blog }) => {
  return (
    <div>
      <Link
        to={`/blog/${blog._id}`}
        className="
                    group
                    flex
                    gap-4
                    items-center
                    border
                    border-gray-200
                    rounded-xl
                    p-3
                    hover:shadow-sm
                    transition
                  "
      >
        {/* Image (slightly bigger) */}
        <div className="w-28 h-20 shrink-0 overflow-hidden rounded-lg">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition">
            {blog.title}
          </h4>

          <p className="mt-1 text-xs text-gray-500">
            {dateFormat(blog.createdAt)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default RelatedArticleCard;
