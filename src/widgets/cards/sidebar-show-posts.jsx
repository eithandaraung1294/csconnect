import React from 'react'
import { Link } from "react-router-dom";
import { fDate } from '@/utils/formatTime';
import { fShortenNumber } from "@/utils/formatNumber";

export const SideBarShowPosts = ({post}) => {
    const catUrl = "/blog/watch?b=";

    return (
        <Link to={`${catUrl}${post?.slug}`} className="flex group">
            <div className="flex-shrink-0">
                <img src={post.cover_image} className="h-14 w-20 rounded object-cover"/>
            </div>
            <div className="flex-grow pl-3">
                <h5
                    className="text-md leading-5 block font-roboto font-semibold  transition group-hover:text-blue-500">
                    {post.title.substring(0,40)}
                </h5>
                <div className="grid gap-1 grid-cols-3">
                    <div className="flex text-gray-400 text-sm items-center col-span-2">
                        <span className="mr-1 text-xs"><i className="far fa-clock"></i></span>
                        {fDate(post?.createdAt)}
                    </div>
                    <div className="flex space-x-3 justify-end">
                        <div className="flex text-gray-400 text-sm items-right">
                            <span className="mr-2 text-xs">
                                <i className="far fa-eye"></i>
                            </span>
                            {fShortenNumber(post?.view_count)}
                        </div>
                        <div className="flex text-gray-400 text-sm items-right">
                            <span className="mr-2 text-xs">
                                <i className="far fa-comment"></i>
                            </span>
                            {fShortenNumber(post?.commentCount)}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
