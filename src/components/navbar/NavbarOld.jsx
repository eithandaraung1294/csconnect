import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../public/img/logo.png";
import NavLinks from "./NavLinks";
import {useTranslation} from 'react-i18next'
import useAuth from "@/hooks/useAuth";
import { Categories, ProfileDropDown, LanguageDropDown } from "../../widgets/cards";

const Navbar = () => {
  const {t} = useTranslation()
  const { auth ,logout } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white">
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between">
          <Link
            to="/home"
            className="flex items-center font-semibold text-sm  transition hover:text-blue-500"
          >
            <img src={Logo} alt="logo" className="md:cursor-pointer h-14" />
          </Link>
          <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
            <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
          </div>
        </div>
        <ul className="md:flex hidden items-center gap-1 font-[Poppins]">
          <NavLinks />
          <li>
            <Link to="/blog" className="px-3 inline-block">
              {t('nav.blog')}
            </Link>
          </li>
          <li>
            <Link to="/" className="px-3 inline-block">
              {t('nav.community-voice')}
            </Link>
          </li>
          <li>
            <Link to="/" className="px-3 inline-block">
              {t('nav.resources')}
            </Link>
          </li>
          <li>
            <Link to="/" className="px-3 inline-block">
              {t('nav.get-involved')}
            </Link>
          </li>
        </ul>
        <div className="md:block hidden">
          {auth ? (
              <ProfileDropDown />
            ) :
            (<>
                <Link
                  to="/sign-in"
                  className="px-3 inline-block"
                >
                  <span className="mr-2">
                    <i className="far fa-user"></i>
                  </span>
                  {t('nav.login')}
                </Link>
                <Link
                  to="/sign-up"
                  className="px-3 inline-block"
                >
                  <span className="mr-2">
                  <i className="far fa-user"></i>
                  </span>
                  {t('nav.register')}
                </Link>
            </>)
          }
          
          <LanguageDropDown />
          
        </div>
        {/* Mobile nav */}
        <ul
          className={`
            md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
            duration-500 ${open ? "left-0" : "left-[-100%]"} z-10
          `}
        >
          
          {auth? 
            (
              <>
              <div className="py-3  font-semibold md:pr-0 pr-5 flex justify-between items-center md:pr-0 pr-5">
                <div>
                  <p className="text-gray-700 block px-4 text-sm" role="menuitem" >Signed in as</p>
                  <p className="py-3 px-3 inline-block" role="menuitem" tabIndex="-1" id="menu-item-0">{ auth?.user.email }</p>
                </div>
                <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src={auth?.user.photo || 'img/guest-user.png'} alt="sadf"/>
              </div>

                <li>
                  <Link 
                    to='/profile' 
                    className="py-3 px-3 inline-block">
                    {t('nav.profile')}
                  </Link>
                </li>
                <li>
                  <Link 
                    onClick={logout}
                    className="py-3 px-3 inline-block">
                    {t('nav.logout')}
                  </Link>
                </li>
              </>
            ) 
            :
            (
            <>
              <li>
                <Link to="/sign-in" 
                  onClick={() => setOpen(false)} 
                  className="py-3 px-3 inline-block">
                  {t('nav.login')}
                </Link>
              </li>
              <li>
                <Link to="/sign-up" 
                  onClick={() => setOpen(false)}  
                  className="py-3 px-3 inline-block">
                  {t('nav.register')}
                </Link>
              </li>
            </>
            )}
          
          <li>
            <Link to="/" className="py-3 px-3 inline-block">
              Home
            </Link>
          </li>
          <NavLinks />
          <li>
            <div className="py-3 font-semibold md:pr-0 pr-5 flex justify-between items-center md:pr-0 pr-5">
            <button style={{ "background":"red" }} className="bg-primary text-white  px-6 py-2 rounded-full">
              Get Started
            </button>
              <LanguageDropDown />
            </div>
          </li>
          <div className="py-5">
            
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
