import { Button } from '@material-tailwind/react'
import React, {useState} from 'react'
import useAuth from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import {useTranslation} from 'react-i18next'

export const ProfileDropDown = () => {
    const {t} = useTranslation()
    const [open, setOpen] = useState(false);
    const { auth, logout } = useAuth();
    const handelLogout = (e) => {
        e.preventDefault();
        setOpen(false);
        logout();
    }
    return (
        <div className="px-3 inline-block">
            <div>
                <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src={auth?.user.photo || '/img/guest-user.png'} alt="sadf" onClick={()=> setOpen(!open)}/>
            </div>
            <div className={`${!open && 'hidden'} absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="py-1" role="none">
                    <p className="text-gray-700 block px-4 text-sm ml-4" role="menuitem" >Signed in as</p>
                    <p className="text-black block px-4 py-2 text-md ml-4" role="menuitem" tabIndex="-1" id="menu-item-0">{ auth?.user.email }</p>
                    <hr />
                    <Link 
                        onClick={()=>setOpen(false)}
                        to='/profile' 
                        className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">
                        <span className="mr-2">
                            <i className="fas fa-user"></i>
                        </span>
                        {t('nav.profile')}
                    </Link>
                    <Link 
                        onClick={handelLogout}
                        className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">
                        <span className="mr-2">
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </span>
                        {t('nav.logout')}
                    </Link>
                </div>
            </div>
        </div>
    )
}
