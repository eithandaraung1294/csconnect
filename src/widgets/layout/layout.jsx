import React from 'react'
import { Outlet } from 'react-router-dom';
// import Navbar from './navbar';
import Navbar from '@/components/navbar/Navbar';
// import { Footer } from "@/widgets/layout";

export function Layout(){
  return (
    <>
      <section
        className="h-screen bg-Hero bg-cover
        font-[Poppins] md:bg-top bg-center"
      >
          <Navbar/>
        
          <Outlet />
      </section>
        
        {/* <div className="bg-blue-gray-50/50">
            <Footer />
        </div> */}
    </>
  )
}

export default Layout;