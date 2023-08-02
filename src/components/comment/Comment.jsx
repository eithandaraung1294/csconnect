import { IconButton } from "../icon/IconButton"
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa"
import { usePost } from "@/context/PostContext"
import { Avatar } from "@material-tailwind/react";
import { CommentList } from "./CommentList"
import { useState } from "react"
import { useAsyncFn } from "@/hooks/useAsync"
import { createComment, deleteComment, toggleCommentLike, updateComment } from "@/services/comment"
import { CommentForm } from "./CommentForm"
import useAuth from "@/hooks/useAuth";
import './style.css';
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
})

export function Comment({
    id,
    comment,
    user,
    createdAt,
    likeCount = null,
    likedByMe = null,
}) {
    const [areChildrenHidden, setAreChildrenHidden] = useState(false)
    const [isReplying, setIsReplying] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState('');
    const {
        post,
        getReplies,
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
        toggleLocalCommentLike,
    } = usePost()
    const createCommentFn = useAsyncFn(createComment)
    const updateCommentFn = useAsyncFn(updateComment)
    const deleteCommentFn = useAsyncFn(deleteComment)
    const toggleCommentLikeFn = useAsyncFn(toggleCommentLike)
    const childComments = getReplies(id)
    const {auth} = useAuth();
    const axiosPirvate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = `${location?.pathname}${location?.search}`

    const checkLogin = () => {
        if(!auth){
            navigate("/sign-in", { state: { from:{pathname}}})
            return;
        } 
        return true;
    }

    const onCommentReply = async (comment) => {
        checkLogin();
        try{
            const newComment = await axiosPirvate.post(
                `/admin/posts-comments/${post?.id}/comments`,
                JSON.stringify({comment, parent_id:id})
                );
            setIsReplying(false)
            createLocalComment(newComment.data);
            setError('')
        }catch(error){
            if(error.response.status == 400) setError(error.response.data.message)
            else setError("Something wrong!")
        }
    }

    const onCommentUpdate = async (comment) => {
        checkLogin();
        try{
            const newComment = await axiosPirvate.put(
                `/admin/posts-comments/${post?.id}/comments/${id}`,
                JSON.stringify({comment})
                );
            setIsEditing(false)
            updateLocalComment(id, newComment.data.comment);
            setError('')
        }catch(error){
            if(error.response.status == 400) setError(error.response.data.message)
            else setError("Something wrong!")
        }
    }

    const onCommentDelete = async () => {
        checkLogin();
        try{
            const comment = await axiosPirvate.delete(
                `/admin/posts-comments/${post?.id}/comments/${id}`);
            deleteLocalComment(comment.data);
            setError('')
        }catch(error){
            if(error.response.status == 400) setError(error.response.data.message)
            else setError("Something wrong!")
        }
    }

    const onToggleCommentLike = async () => {
        checkLogin();
        try{
            const like = await axiosPirvate.post(
                `/admin/posts-comments/${post?.id}/comments/${id}/toggleLike`);
            
            console.log(like.data.addLike);
            toggleLocalCommentLike(id, like.data.addLike);
            setError('')
        }catch(error){
            if(error.response.status == 400) setError(error.response.data.message)
            else setError("Something wrong!")
        }
    }

  return (
    <>
        <div className="comment">
            <div className="header">
                <span className="mr-2 text-sm">
                    <Avatar src={user.photo || '/img/guest-user.png'} alt="avatar" variant="circular" size="xs"/>
                    <span className="name">{user.username}</span>
                </span>
                <span className="date">
                    {dateFormatter.format(Date.parse(createdAt))}
                </span>
            </div>
            {isEditing ? (
                <CommentForm
                    autoFocus
                    initialValue={comment}
                    onSubmit={onCommentUpdate}
                    loading={updateCommentFn.loading}
                    error={updateCommentFn.error}
                />
            ) : (
                <div className="message">{comment}</div>
            )}
            <div className="footer">
                <IconButton
                    onClick={onToggleCommentLike}
                    disabled={toggleCommentLikeFn.loading}
                    Icon={likedByMe ? FaHeart : FaRegHeart}
                    aria-label={likedByMe ? "Unlike" : "Like"}
                >
                    {likeCount}
                </IconButton>
                <IconButton
                    onClick={() => setIsReplying(prev => !prev)}
                    isActive={isReplying}
                    Icon={FaReply}
                    aria-label={isReplying ? "Cancel Reply" : "Reply"}
                />
                {user.id === auth?.user.id && (
                    <>
                    <IconButton
                        onClick={() => setIsEditing(prev => !prev)}
                        isActive={isEditing}
                        Icon={FaEdit}
                        aria-label={isEditing ? "Cancel Edit" : "Edit"}
                    />
                    <IconButton
                        disabled={deleteCommentFn.loading}
                        onClick={onCommentDelete}
                        Icon={FaTrash}
                        aria-label="Delete"
                        color="danger"
                    />
                    </>
                )}
            </div>
            {deleteCommentFn.error && (
                <div className="error-msg mt-1">{deleteCommentFn.error}</div>
            )}
        </div>
        {isReplying && (
            <div className="mt-1 ml-3">
                <CommentForm
                    autoFocus
                    onSubmit={onCommentReply}
                    loading={createCommentFn.loading}
                    error={createCommentFn.error}
                />
            </div>
        )}
        {childComments?.length > 0 && (
            <>
                <div
                    className={`nested-comments-stack ${
                    areChildrenHidden ? "hide" : ""
                    }`}
                >
                    <button
                        className="collapse-line"
                        aria-label="Hide Replies"
                        onClick={() => setAreChildrenHidden(true)}
                    />
                    <div className="nested-comments">
                        <CommentList comments={childComments} />
                    </div>
                </div>
                <button
                    className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
                    onClick={() => setAreChildrenHidden(false)}
                >
                    Show Replies
                </button>
            </>
        )}
        <div className="error-msg">{error}</div>
    </>
  )
}
