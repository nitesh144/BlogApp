// import React from 'react'

import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return <div>
        <BlogSkeleton/>
    </div>;
  }
  return (
    <div className="">
      <Appbar />
      <div className="flex justify-center">
        <div className="flex flex-col justify-center py-5">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"2nd feb 2025"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
