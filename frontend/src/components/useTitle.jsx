import React, { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | liwotoBlogs`;
  }, []);
};

export default useTitle;
