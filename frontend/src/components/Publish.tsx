import axios from "axios";
import Appbar from "./Appbar";
import { BACKEND_URL } from "../config";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const Publish = () => {
    const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleClick = async() => {
    const response =await axios.post(`${BACKEND_URL}/api/v1/blog`, {
      title,
      content: description,
    },{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    });
    navigate(`/blog/${response.data.id}`)
  };
  return (
    <div>
      <Appbar />
      <div className="max-w-5xl mx-auto py-16">
        <div className="flex flex-col gap-5 ">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
            required
          />
          <div className="">
            <TextEditor
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 border-gray-200">
              <button
                onClick={handleClick}
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                Publish Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <div>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-200">
          <div className="px-4 py-2 bg-gray-200 rounded-t-lg ">
            <label className="sr-only">Your comment</label>
            <textarea
              onChange={onChange}
              id="comment"
              className="w-full h-48 p-4 text-sm text-gray-900 focus:outline-none bg-gray-200 border-0 focus:ring-0 "
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
