import React from 'react'
import { fDate } from '@/utils/formatTime';
import { fShortenNumber } from '@/utils/formatNumber';
import { Link } from "react-router-dom";

export const SimilerPost = ({similerPost}) => {
    const url = "/blog/watch?b=";
    return (
        <div className="rounded-sm bg-white p-3 pb-5 shadow-sm">
            <Link to={`${url}${similerPost?.slug}`} className="block rounded-md overflow-hidden">
                <img src={similerPost?.cover_image}
                    className="w-full h-40 object-cover transform hover:scale-110 transition duration-500"/>
            </Link>
            <div className="mt-3">
                <Link to={`${url}${similerPost?.slug}`}>
                    <h2
                        className="block text-base font-semibold text-gray-700 hover:text-blue-500 transition font-roboto">
                        {similerPost?.title.substring(0,40)}
                    </h2>
                </Link>
                
                <div className="grid gap-1 grid-cols-3">
                    <div className="flex text-gray-400 text-sm items-center col-span-2">
                        <span className="mr-1 text-xs"><i className="far fa-clock"></i></span>
                        {fDate(similerPost?.createdAt)}
                    </div>
                    <div className="flex space-x-3 justify-end">
                        <div className="flex text-gray-400 text-sm items-right">
                            <span className="mr-2 text-xs">
                                <i className="far fa-eye"></i>
                            </span>
                            {fShortenNumber(similerPost?.view_count)}
                        </div>
                        <div className="flex text-gray-400 text-sm items-right">
                            <span className="mr-2 text-xs">
                                <i className="far fa-comment"></i>
                            </span>
                            {fShortenNumber(similerPost?.commentCount)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
