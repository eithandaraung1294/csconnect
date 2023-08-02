import React,{ useState, useEffect } from "react";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import { useSearchParams, useLocation } from "react-router-dom";
import {
    ClockIcon,
    BriefcaseIcon,
    BuildingLibraryIcon,
    TagIcon
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import axios from "@/api/axios";
import { PostView, Comment, SimilerPost, Alert } from "@/widgets/cards";
import { usePost } from "@/context/PostContext";
import { useAsync } from "@/hooks/useAsync";
import { CommentForm } from "@/components/comment/CommentForm";

export function PostDetailOld(){
    const { post, rootComments, createLocalComment } = usePost()
    useEffect(()=> {
        // const relPosts = post?.categories.map(item => item.posts.map(el => el));
        // let arr = [];
        // relPosts.map(ele => arr=[...arr,...ele]);
        // const arrayUniqueByKey = [...new Map(arr.map(item => [item['id'], item])).values()];
        // const shuffled = [...arrayUniqueByKey].sort(() => 0.5 - Math.random());
        // console.log("shuffled");
        // console.log(shuffled.slice(0, 3));

    },[post]);
    console.log(post);
    // const [post, setPost] = useState(null);
    const [similerPosts, setSimilerPosts] = useState(null);
    // const [errMsg, setErrMsg] = useState('');
    // const [searchParams, setSearchParams] = useSearchParams();
    // const slug = searchParams.get('b');

    // const url = "/admin/posts";
    // const similerPostsUrl = "/admin/posts/related";

    // useEffect(() => {
    //     const getPost = async () => {
    //         try {
    //             const post = await axios.get(`${url}/${slug}`);
    //             setPost(post?.data);
    //         } catch (error) {
    //             if(error.response.status === 400) {
    //                 setErrMsg(error.response.data.message)
    //             }else{
    //                 setErrMsg("Something Wrong!");
    //             }
    //         }
    //     }
    //     getPost();
    // }, [slug]);

    // useEffect(() => {
    //     const getRelatedPosts = async () => {
    //       try {
    //             let cat = ''
    //             post?.categories.map(item => {
    //                 cat = cat === '' ? `${item.slug}` : `${cat}&${item.slug}`;
    //             });
    //             const sPost = await axios.get(
    //                 similerPostsUrl,
    //                 {params: {cat, limit: 3, selfPostSlug: post?.slug}}
    //                 );
    //                 // console.log(sPost.data)
    //             await setSimilerPosts(sPost?.data);
    //         } catch (error) {
    //             if(error.response.status === 400) {
    //                 setErrMsg(error.response.data.message)
    //             }else{
    //                 setErrMsg("Something Wrong!");
    //             }
    //         }
    //     }
    //     getRelatedPosts();

    // }, [post]);
  
    window.scroll(0, 0);

    return (
        <>
         
          {/* {error && 
            <Alert errMsg={error}/>
          } */}
          <div className="xl:w-6/12 lg:w-9/12 w-full  xl:ml-6 lg:mr-6">
            {/*  post view  */}
            {post !== null ? <PostView post={post}/> : null}
           
            {/*  title  */}
            <div className="flex bg-white px-3 py-2 justify-between items-center rounded-sm mt-8">
                <h5 className="text-base uppercase font-semibold font-roboto">Related post</h5>
                <a href="#"
                    className="text-white py-1 px-3 rounded-sm uppercase text-sm bg-blue-500 border border-blue-500 hover:text-blue-500 hover:bg-transparent transition">
                    see more
                </a>
            </div>

            {/*  similer post  */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                {post?.relatedPosts?.map((similerPost, index) => (
                    <SimilerPost key={index} similerPost ={similerPost}/>
                ))}
            </div>
            {/*  comment  */}
            <div className="grid">
                <CommentForm
                    loading={loading}
                    error={error}
                    onSubmit={onCommentCreate}
                />
            </div>
           
            <Comment/>
          </div>
        </>
    );
}

export default PostDetail;
