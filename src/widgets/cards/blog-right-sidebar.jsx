import React,{ useState, useEffect } from "react";
import { TagCategories, SocialPlugin, SideBarShowPosts} from '.'
import axios from "@/api/axios";

export const BlogRightSideBar = () => {
  const [posts, setPosts] = useState(null);
  const url = "/admin/posts/popular";

  useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
      const getPosts = async () => {
        try {
            const posts = await axios.get(url, { params: { limit: 5 }}, {
                signal: controller.signal
            });
            if(isMounted) setPosts(posts.data);
        } catch (error) {
            console.log(error);
        }
      }
      getPosts();
      return () => {
        isMounted = false;
        controller.abort();
      }

  }, []) 
  // console.log(posts);

  return (
      <div className="lg:w-3/12 w-full mt-8 lg:mt-0">
        {/* social Plugin */}
        <SocialPlugin/>

        {/* popular posts */}
        <div className="w-full mt-8 bg-white shadow-sm rounded-sm p-4 ">
            <h3 className="text-xl font-semibold text-gray-700 mb-3 font-roboto">Popular Posts</h3>
            <div className="space-y-4">
              {posts?.map((post, index) => (
                <SideBarShowPosts post={post} key={index}/>
              ))}
            </div>
        </div>

        {/* categories */}
        {/* <TagCategories/> */}
      </div>
  )
}
