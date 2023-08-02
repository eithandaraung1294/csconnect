import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Typography,
  CardHeader,
} from "@material-tailwind/react";
import { fDate } from '@/utils/formatTime';
import { fShortenNumber } from '@/utils/formatNumber';

import { UsersIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export function BlogPostCard({ post }) {
  const blogDetailUrl = `/blog/watch?b=${post.slug}`;

  return (
    <div className="rounded-sm bg-white p-4 pb-5 shadow-sm">
      <Link
        to={blogDetailUrl}
        className="block rounded-md overflow-hidden"
      >
        <img src={post?.cover_image}
          className="w-full h-60 object-cover transform hover:scale-110 transition duration-500"/>
      </Link>
    
      <div className="mt-3">
          {/* <div className="mt-2 flex space-x-3 justify-end">
            <div className="flex text-gray-400 text-sm items-left">
              <span className="mr-2 text-xs">
                  <i className="far fa-clock"></i>
              </span>
              {fDate(post.createdAt)}
            </div>
          </div> */}
          <Link
            to={blogDetailUrl}
            className="block rounded-md overflow-hidden"
          >
            <h2
              className="block text-xl font-semibold text-gray-700 hover:text-blue-500 transition font-roboto">
              {post?.title.length > 40 ? `${post?.title.substring(0,45)}..` : post?.title}
            </h2>
          </Link>
        
          {/* <div className="flex space-x-3 justify-end">
            <div className="flex text-gray-800 text-sm items-right">
              <span className="mr-2 text-xs">
                  <i className="far fa-eye"></i>
              </span>
              {fShortenNumber(post?.view_count)}
            </div>
            <div className="flex text-gray-800 text-sm items-right">
              <span className="mr-2 text-xs">
                  <i className="far fa-comment"></i>
              </span>
              {fShortenNumber(post?.commentCount)}
            </div>
          </div> */}
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
    </div>
  );
}

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default BlogPostCard;
