import React, { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "./Mylinks";
import {useTranslation} from 'react-i18next'
import { useNavData } from "@/context/NavdataContext";

const NavLinks = () => {
  const {t} = useTranslation()
  const [heading, setHeading] = useState("");
  const navData = useNavData();

  return (
    <>
      {navData?.data?.navbar.map((link, index) => (
        <div key={index}>
          <div className="py-7 px-3 text-left md:cursor-pointer group">
            <h1
              className="flex justify-between items-center md:pr-0 pr-5 group"
              onClick={() => {
                heading !== link.title ? setHeading(link.title) : setHeading("");
                // setSubHeading("");
              }}
            >
              {link.title}
             
              {/* <span className="text-xl md:hidden inline">
                <ion-icon
                  name={`${
                    heading === link.name ? "chevron-up" : "chevron-down"
                  }`}
                ></ion-icon>
              </span>
              <span className="text-xl md:mt-1 md:ml-2  md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                <ion-icon name="chevron-down"></ion-icon>
              </span> */}
            </h1>
            {link.navbar_sub_menus && (
              <div>
                <div className="absolute top-20 hidden group-hover:md:block hover:md:block z-10">
                  <div className="py-3">
                    <div
                      className="w-4 h-4 left-3 absolute 
                    mt-1 bg-white rotate-45"
                    ></div>
                  </div>
                  <div className="bg-white p-5">
                    {link.navbar_sub_menus.map((slink, index) => (
                      <li className="text-sm text-gray-600 my-2.5" key={index}>
                        <Link
                          to={`detail?v=${slink.id}`}
                          className="hover:text-blue-500"
                        >
                          {slink.title}
                        </Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Mobile menus */}
          <div
            className={`
            ${heading === link.title ? "md:hidden" : "hidden"}
          `}
          >
            {/* sublinks */}
              {link.navbar_sub_menus.map((slink, index) => (
                <li className="py-3 pl-14" key={index}>
                  <Link
                    to={`detail?v=${slink.id}`}
                   >
                    {slink.title}

                  </Link>
                </li>
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;
