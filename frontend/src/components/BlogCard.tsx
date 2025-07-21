import { Link } from "react-router-dom";

interface BlogCardProp {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProp) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b-2 border-slate-200 pb-4 cursor-pointer">
        <div className="flex">
          <div className="flex items-center">
            <Avatar name={authorName} />
          </div>
          <div className="font-extralight pl-2">{authorName}</div>
          <div className=" flex flex-col justify-center pl-2">
            <div className="h-1 w-1 rounded-full bg-slate-500"></div>
          </div>
          <div className="pl-2 font-thin text-slate-400">{publishedDate}</div>
        </div>
        <div className="text-xl font-thin">{title}</div>
        <div className="text-slate-500 font-thin">
          {content.slice(0, 100) + "..."}
        </div>
        <div>{`${Math.ceil(content.length / 100)} minute(s) read`}</div>
      </div>
    </Link>
  );
};

export default BlogCard;

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-4 h-4 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="text-xs text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}
