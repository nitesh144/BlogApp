import type { Blog } from "../hooks";
import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 py-5 w-full max-w-7xl mx-auto">
          <div className="col-span-8">
            <div className=" text-4xl">{blog.title}</div>
            <div className="text-gray-500 pt-2">Post on 2nd November</div>
            <div className=" pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex gap-5">
              <div className="flex justify-center flex-col">
                <Avatar name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-lg font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <span className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
