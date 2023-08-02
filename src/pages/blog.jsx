import React,{ useEffect, useState } from 'react'
import ReactPaginate from "react-paginate";
import { useSearchParams, useLocation } from "react-router-dom";
import axios from '@/api/axios';
import { BlogPostCard } from '@/widgets/cards';
import "../utils/pagination.css";


export const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const cat = searchParams.get('cat');
  
  let limit = 4;
  const getPostUrl = "/admin/posts/all";
  const getPostByCatUrl = "/admin/posts/by-category";

  useEffect(() => {
    const getPosts = async () => {
      const res = cat ? 
                await axios.get(`${getPostByCatUrl}?page=0&size=${limit}&cat=${cat}`) :
                await axios.get(`${getPostUrl}?page=0&size=${limit}`);
      setPosts(res.data.data);
      const total = cat ? res.data.total.total_row : res.data.total;
      setPageCount(Math.ceil(total / limit));
    };
    getPosts();

  }, [cat]);

  const fetchPosts = async (currentPage) => {
    const res = cat ? 
                await axios.get(`${getPostByCatUrl}?page=${currentPage}&size=${limit}&cat=${cat}`) :
                await axios.get(`${getPostUrl}?page=${currentPage}&size=${limit}`);
    
    return res.data.data;
  }

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected;

    const dataFromServer = await fetchPosts(currentPage);
    setPosts(dataFromServer);
    // scroll to the top
    //window.scrollTo(0, 0)
  };
  console.log(posts)
  window.scroll(0, 0);
  return (
    <>
      <div className="xl:w-6/12 lg:w-9/12 w-full  xl:ml-6 lg:mr-6">
        
        <div className="flex bg-white px-3 py-2 justify-between items-center rounded-sm mb-5">
            <h5 className="text-base uppercase font-semibold font-roboto">
              {cat ? `Viewing Category- ${cat}`: 'Viewing All Posts'}
            </h5>
            {/* <a href="#"
                className="text-white py-1 px-3 rounded-sm uppercase text-sm bg-blue-500 border border-blue-500 hover:text-blue-500 hover:bg-transparent transition">
                see more
            </a> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

          {posts?.map((post, index) => (
            <BlogPostCard key={index} post={post}/>
          ))}

        </div>

        {/* pagination */}
        <div className="mt-4">
          <ReactPaginate
              breakLabel="..."
              nextLabel={<i className="fa-solid fa-forward"></i>}
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              pageCount={pageCount}
              previousLabel={<i className="fa-solid fa-backward"></i>}
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="active"
          />
        </div>
        
      </div>
    </>
  )
}
