import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  Button,
} from "@material-tailwind/react";
import useAuth from "@/hooks/useAuth";
import { Categories, ProfileDropDown, LanguageDropDown } from "../cards";
import {useTranslation} from 'react-i18next'

export function Navbar({ brandName, action }) {
  const {t} = useTranslation()
  const { auth ,logout } = useAuth();
  const [openNav, setOpenNav] = React.useState(false);
  const Base_Url = "http://localhost:5173";

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  }

  const openSidebar = () => {
    document.querySelector('#sidebar').classList.remove('-left-80')
    document.querySelector('#sidebar').classList.add('left-0')
    document.querySelector('#sidebar_wrapper').classList.remove('opacity-0')
    document.querySelector('#sidebar_wrapper').classList.remove('invisible')
  }
  const sidebarWrapper = () => {
    document.querySelector('#sidebar').classList.add('-left-80')
    document.querySelector('#sidebar').classList.remove('left-0')
    document.querySelector('#sidebar_wrapper').classList.add('opacity-0')
    document.querySelector('#sidebar_wrapper').classList.add('invisible')
  }

  return (
    <>
      {/* // <!-- navbar --> */}
      <nav className="shadow-sm">
        <div className="grid grid-cols-2">
          <div className="container px-4 mx-auto flex items-center py-3">
            
              {/* <!-- searchbar --> */}
              
              <div className="text-xl text-gray-700 cursor-pointer lg:hidden block hover:text-blue-500 transition xs:justify-start"
                  id="open_sidebar" onClick={openSidebar} >
                  <i className="fas fa-bars"></i>
              </div>
              {/* <!-- searchbar end --> */}

              {/* <!-- logo --> */}
              <div className="lg:w-44 w-40">
                  <Link
                    to="/home"
                    className="flex items-center font-semibold text-sm  transition hover:text-blue-500"
                  >
                    <img src={`${Base_Url}/img/logo.png`} alt="logo" className="w-full"/>
                  </Link>
                  
              </div>
              {/* <!-- logo end --> */}

              {/* <!-- navlinks --> */}
              <div className="ml-12 lg:flex space-x-5  hidden">
                  <Link
                    to="/home"
                    className="flex items-center font-semibold text-sm  transition hover:text-blue-500"
                  >
                    <span className="mr-2">
                        <i className="fas fa-home"></i>
                    </span>
                    {t('nav.home')}
                  </Link>

                  <Link
                    to="/blog"
                    className="flex items-center font-semibold text-sm  transition hover:text-blue-500"
                  >
                    <span className="mr-2">
                        <i className="fas fa-blog"></i>
                    </span>
                    {t('nav.blog')}
                  </Link>
              </div>
              {/* <!-- navlinks end --> */}
              <div className="relative lg:ml-auto hidden lg:block">
                  <span className="absolute left-3 top-2 text-sm text-gray-500">
                      <i className="fas fa-search"></i>
                  </span>
                  <input type="text"
                      className="block w-full shadow-sm border-none rounded-3xl  pl-11 pr-2 py-2 focus:outline-none bg-gray-50 text-sm text-gray-700 placeholder-gray-500"
                      placeholder="Search"/>
              </div>
              {/* language changing drop down menu */}
          </div>
          <div class="flex flex-row-reverse">
            <div className="container mx-auto flex items-center justify-end">
              <LanguageDropDown />
            </div>
            {/* <div className="mx-auto flex items-center justify-end"> */}
                {auth ? (
                  <div className="relative">
                    <ProfileDropDown />
                  </div>) :
                  (<>
                    <div className="relative lg:ml-auto hidden lg:block">
                      <Link
                        to="/sign-in"
                        className=" text-sm  font-semibold hover:text-blue-500 transition flex items-center"
                      >
                        <span className="mr-2">
                          <i className="far fa-user"></i>
                        </span>
                        {t('nav.login')}
                      </Link>
                    </div>
                    <div className="relative lg:ml-auto hidden lg:block">
                      <Link
                        to="/sign-up"
                        className=" text-sm  font-semibold hover:text-blue-500 transition flex items-center"
                      >
                        <span className="mr-2">
                        <i className="far fa-user"></i>
                        </span>
                        {t('nav.register')}
                      </Link>
                    </div>
                  </>)
                }
            {/* </div> */}
            
          </div>
        </div>
          
          
      </nav>

      {/* Mobile view */}
      <div className="fixed w-full h-full bg-black bg-opacity-25 left-0 top-0 z-10 opacity-0 invisible transition-all duration-500 lg:hidden"
          id="sidebar_wrapper" onClick={sidebarWrapper}>
          <div className="fixed top-0 w-72 h-full bg-white shadow-md z-10 flex flex-col transition-all duration-500 -left-80"
              id="sidebar">

              {/* <!-- searchbar --> */}
              <div className="relative mx-3 mt-3 shadow-sm">
                  <span className="absolute left-3 top-2 text-sm text-gray-500">
                      <i className="fas fa-search"></i>
                  </span>
                  <input type="text"
                      className="block w-full shadow-sm border-none rounded-3xl  pl-11 pr-2 py-2 focus:outline-none bg-gray-50 text-sm text-gray-700 placeholder-gray-500"
                      placeholder="Search"/>
              </div>
               {auth ? (
                  <div className="grid gap-1 grid-row-3">
                    <div className="flex text-gray-400 text-sm items-center">
                      <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white ml-4 mt-3" src={auth?.user.photo || 'img/guest-user.png'} alt="sadf"/>
                    </div>
                    <p className="text-gray-700 block  text-sm ml-4">Signed in as</p>
                    <p className="text-black block  text-md ml-4">{ auth?.user.email }</p>
                    <Link 
                        onClick={()=>setOpen(false)}
                        to='/profile' 
                        className="flex px-4 py-1 uppercase items-center font-semibold text-sm  transition hover:text-blue-500">
                        <span className="mr-2">
                            <i className="fas fa-user"></i>
                        </span>
                        {t('nav.profile')}
                    </Link>
                    <Link 
                        onClick={handleLogout}
                        className="flex px-4 py-1 uppercase items-center font-semibold text-sm  transition hover:text-blue-500">
                        <span className="mr-2">
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </span>
                        {t('nav.logout')}
                    </Link>
                  </div>
                ) :
                (<>
                  <div className="">
                    <Link
                      to="/sign-in"
                      className="flex px-4 py-1 uppercase items-center font-semibold text-sm  transition hover:text-blue-500"
                    >
                      <span className="mr-2">
                        <i className="fa-solid fa-arrow-right-to-bracket"></i>
                      </span>
                      Login
                    </Link>
                 
                    <Link
                      to="/sign-up"
                      className="flex px-4 py-1 uppercase items-center font-semibold text-sm  transition hover:text-blue-500"
                    >
                      <span className="mr-2">
                        <i className="fa-solid fa-registered"></i>
                      </span>
                      Register
                    </Link>
                  </div>
                </>)
              }
              {/* <!-- navlink --> */}
              <h3 className="text-xl font-semibold text-gray-700 mb-1 font-roboto pl-3 pt-3">Menu</h3>
              <div className="">
                  <Link
                    to="/home"
                    className="flex px-4 py-1 uppercase items-center font-semibold text-sm  transition hover:text-blue-500"
                  >
                    <span className="mr-2">
                        <i className="fas fa-home"></i>
                    </span>
                    Home
                  </Link>
                  
                  <Link
                    to="/blog"
                    className="flex px-4 py-1 uppercase items-center font-semibold text-sm  transition hover:text-blue-500"
                  >
                    <span className="mr-2">
                        <i className="fas fa-blog"></i>
                    </span>
                    Blog
                  </Link>
              </div>
              {/* <!-- navlinks end --> */}

              {/* <!-- categories --> */}
              <Categories/>
          </div>
      </div>
    </>
  
  );
}

Navbar.defaultProps = {
  brandName: "CCKL Website",
  action: (
    <a
      href="https://play.google.com/store/apps/details?id=com.king.candycrushsaga"
      target="_blank"
    >
      <Button variant="gradient" size="sm" fullWidth>
        Download App
      </Button>
    </a>
  ),
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
