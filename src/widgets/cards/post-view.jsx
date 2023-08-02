import React, { useState } from 'react'
import { fDate } from '@/utils/formatTime';
import { Avatar, Typography } from "@material-tailwind/react";
import { fShortenNumber } from '@/utils/formatNumber';
import { Link } from 'react-router-dom';


export const PostView = ({post}) => {
    const [modalImage, setModalImage] = useState(null);
    const catUrl = "/blog?cat=";

    const openImageModal = (img) => {
        setModalImage(img);
    }

    return (
        <div className="rounded-sm overflow-hidden bg-white shadow-sm">
        <div className="">
            <img src={post?.cover_image} className="w-full h-96 object-cover"/>
        </div>
        <div className="p-4 pb-5">
            <h2 className="block text-2xl font-semibold text-gray-700 font-roboto">
                {post?.title}
            </h2>
            <div className="mt-2 flex space-x-4">
                <div className="flex text-gray-400 text-sm items-center">
                    <span className="mr-2 text-sm">
                        <Avatar src={post?.user.photo} alt="avatar" variant="circular" size="xs"/>
                    </span>
                    { post?.user.username}
                </div>
                <div className="flex text-gray-400 text-sm items-center">
                    <span className="mr-2 text-xs">
                        <i className="far fa-clock"></i>
                    </span>
                    { fDate(post?.createdAt)}
                </div>
            </div>
           
            <div
                dangerouslySetInnerHTML={{
                    __html:post?.description
                }}
            />

            <div className="flex items-center flex-wrap gap-2 mt-5">
                {post?.categories.map((category, index) => (
                    <Link
                        key={index}
                        to={`${catUrl}${category.slug}`}
                        className="px-3 py-1  text-sm border border-gray-200 rounded-sm transition hover:bg-blue-500 hover:text-white"
                    >
                        {category.name}
                    </Link>
                    
                ))}
            </div>
            {/* <a href="" key={index}
                        className="px-3 py-1  text-sm border border-gray-200 rounded-sm transition hover:bg-blue-500 hover:text-white">
                            {category.name}
                    </a> */}
            {/* image list */}
           
            <div className="mt-5 pt-5 grid gap-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 border-t border-gray-200">
                {post?.image.map((img, index) => (
                    <img onClick={() => openImageModal(img)} key={index} className="w-full aspect-square transform hover:scale-110 transition duration-500" src={img}  />

                ))}
            </div>
            
            
            <div className="mt-5 pt-5 border-t border-gray-200 grid gap-4 grid-cols-2">
                <div className='flex gap-1 justify-start'>
                    <a href="#"
                        className="w-8 h-8 rounded-sm flex items-center justify-center border border-gray-400 text-base text-gray-800">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#"
                        className="w-8 h-8 rounded-sm flex items-center justify-center border border-gray-400 text-base text-gray-800">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#"
                        className="w-8 h-8 rounded-sm flex items-center justify-center border border-gray-400 text-base text-gray-800">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#"
                        className="w-8 h-8 rounded-sm flex items-center justify-center border border-gray-400 text-base text-gray-800">
                        <i className="fab fa-pinterest-p"></i>
                    </a>
                    <a href="#"
                        className="w-8 h-8 rounded-sm flex items-center justify-center border border-gray-400 text-base text-gray-800">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
                
                <div className='flex gap-4 justify-end'>
                    <a href="#"
                        className="w-8 h-8 rounded-sm flex items-center text-base text-gray-800">
                        <i className="far fa-eye"></i>
                            {fShortenNumber(post?.view_count)}
                    </a>
                    <a href="#"
                        className="w-8 h-8 rounded-sm flex items-center text-base text-gray-800">
                        <i className="far fa-comment"></i>
                            {fShortenNumber(post?.commentCount)}
                    </a>
                </div>
            </div>

            {/* image modal box */}
            <div id="modal"
                className={`${!modalImage && 'hidden'} fixed top-0 left-0 z-80 w-screen h-screen bg-black/70 flex justify-center items-center`}>

                <a className="fixed z-90 top-6 right-8 text-white text-5xl font-bold cursor-pointer"
                    onClick={() => setModalImage(null)}>&times;</a>

                <img id="modal-img" className="max-w-[800px] max-h-[600px] object-cover" src={modalImage}/>
            </div>

        </div>
    </div>
    )
}
