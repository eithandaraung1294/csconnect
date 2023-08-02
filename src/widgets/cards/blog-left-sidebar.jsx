import React,{ useState, useEffect } from "react";
import { Categories, SideBarShowPosts } from '.';
import axios from "@/api/axios";
import { useSearchParams } from "react-router-dom";

export const BlogLeftSideBar = () => {
  const [posts, setPosts] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const url = "/admin/posts/random";
  const slug = searchParams.get('b');

  useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
      const getPosts = async () => {
        try {
            const posts = await axios.get(url, { params: { limit: 4 }}, {
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

  }, [slug]) 
  // console.log(posts);
  return (
      <div className="w-3/12 hidden xl:block">
          {/* categories */}
          <Categories/>
          
          {/* random posts */}
          <div className="w-full mt-8 bg-white shadow-sm rounded-sm p-4 ">
            <h3 className="text-xl font-semibold text-gray-700 mb-3 font-roboto">Random Posts</h3>
            <div className="space-y-4">
              {posts?.map((post, index) => (
                <SideBarShowPosts post={post} key={index}/>
              ))}
            </div>
        </div>
      </div>
  )
}
