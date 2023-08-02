import React,{ useState, useEffect } from "react";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
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
import { useAsyncFn } from "@/hooks/useAsync";
import { CommentForm } from "@/components/comment/CommentForm";
import { createComment } from "@/services/comment";
import { CommentList } from "@/components/comment/CommentList";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useAuth from "@/hooks/useAuth";

export function PostDetail(){

    const location = useLocation();
    const navigate = useNavigate()
    const {auth} = useAuth();
    const axiosPirvate = useAxiosPrivate();
    const { post, error, rootComments, createLocalComment } = usePost();
    const [commentError, setCommentError] = useState();
    const pathname = `${location?.pathname}${location?.search}`

    const onCommentCreate = async (comment) => {
        if(!auth){
            navigate("/sign-in", { state: { from:{pathname}}})
            return;
        } 
        try{
            const newComment = await axiosPirvate.post(
                `/admin/posts-comments/${post?.id}/comments`,
                JSON.stringify({comment})
                );
            createLocalComment(newComment.data);
        }catch(error){
            setCommentError(error);
        }
    }
   
    // window.scroll(0, 0);
    return (
        <>
         
          {/* {error && 
            <Alert errMsg={error}/>
          } */}
          <div className="xl:w-6/12 lg:w-9/12 w-full  xl:ml-6 lg:mr-6">
            {/*  post view  */}
            { Object.keys(post).length !== 0 ? <PostView post={post}/> : null }
           
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
            <div className="p-4 bg-white rounded-sm shadow-sm mt-8">
                <CommentForm
                    loading={false}
                    error={error}
                    onSubmit={onCommentCreate}
                />
                <div className="error-msg">{commentError}</div>

            </div>
                {rootComments != null && rootComments.length > 0 && (
                    <div className="mt-4">
                        <CommentList comments={rootComments} />
                    </div>
                )}
          </div>
        </>
    );
}

export default PostDetail;
