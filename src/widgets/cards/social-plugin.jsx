import React from 'react'

export const SocialPlugin = () => {
  return (
    <div className="w-full bg-white shadow-sm rounded-sm p-4 ">
        <h3 className="text-xl font-semibold text-gray-700 mb-3 font-roboto">Social Plugin</h3>
        <div className="flex gap-2">
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
    </div>
  )
}
