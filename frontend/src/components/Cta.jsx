import React from "react";
import { Link } from "react-router-dom";

const Cta = () => {
  return (
    <div>
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Ready to share your story?
          </h2>
          <p className="mt-4 text-gray-600">
            Write articles that help others think clearly.
          </p>

          <Link
            to="/create-blog"
            onClick={() => scrollTo(0, 0)}
            className="inline-block mt-8 px-8 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition"
          >
            Write your first blog
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Cta;
