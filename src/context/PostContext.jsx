import React, { useContext, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useAsync } from "@/hooks/useAsync"
import { getPost } from "@/services/blog-post"
import axios from "../api/axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useAuth from "@/hooks/useAuth";

const Context = React.createContext()

export function usePost() {
  return useContext(Context)
}

export function PostProvider({ children }) {
    const {auth} = useAuth();
    const axiosPirvate = useAxiosPrivate();
    const [searchParams, setSearchParams] = useSearchParams();
    const slug = searchParams.get('b');
   
    const [post, setPost] = useState({});
    const [error, setError] = useState();
    const [comments, setComments] = useState([]);
    const url = "/admin/posts";

    useEffect(() => {
        const getPost = async () => {
            try {
                const post = auth != null 
                            ? await axiosPirvate.get(`${url}/${slug}`) 
                            : await axios.get(`${url}/${slug}`)

                console.log(post);
                // const post = await axiosPirvate.get(`${url}/${slug}`);
                // console.log(post);
                setPost(post.data);
            } catch (error) {
                if(error.response.status === 400) {
                    setError(error.response.data.message)
                }else{
                    setError("Something Wrong!");
                }
            }
        }
        getPost();
    }, [slug])

    const commentsByParentId = useMemo(() => {
        const group = {}
        comments.forEach(comment => {
            group[comment.parent_id] ||= []
            group[comment.parent_id].push(comment)
        })
        return group
    }, [comments])

    useEffect(() => {
        if (post?.comments == null) return
        setComments(post.comments)
    }, [post?.comments])

    const getReplies = (parentId) => {
        return commentsByParentId[parentId]
    }

    const createLocalComment = (comment) => {
        setComments(prevComments => {
            return [comment, ...prevComments]
        })
    }

    function updateLocalComment(id, comment){
        setComments(prevComments => {
            return prevComments.map(cmt => {
                if (cmt.id === id) {
                    return { ...cmt, comment }
                } else {
                    return cmt
                }
            })
        })
    }

    function deleteLocalComment(id) {
        setComments(prevComments => {
            return prevComments.filter(comment => comment.id !== id)
        })
    }

    function toggleLocalCommentLike(id, addLike) {
        setComments(prevComments => {
            return prevComments.map(comment => {
                if (id === comment.id) {
                    if (addLike) {
                        return {
                        ...comment,
                        likeCount: comment.likeCount + 1,
                        likedByMe: true,
                        }
                    } else {
                        return {
                        ...comment,
                        likeCount: comment.likeCount - 1,
                        likedByMe: false,
                        }
                    }
                } else {
                    return comment
                }
            })
        })
    }

    return (
        <Context.Provider
            value={{
                post: {...post},
                rootComments: commentsByParentId[null],
                getReplies,
                createLocalComment,
                updateLocalComment,
                deleteLocalComment,
                toggleLocalCommentLike,
            }}
        >
            {error ? (
                <h1 className="error-msg">{error}</h1>
            ) : (
                children
            )}
        </Context.Provider>
    )
}
