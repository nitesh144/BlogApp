
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id }= useParams();
  const {loading,blog}= useBlog({
    id: id || ""
  });
  if(loading){
    return <div className="">
      <Spinner/>
    </div>
  }
  return <div>
      <FullBlog blog={blog}/>
    </div>
  
}

export default Blog