import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"

function SideMenu({ active, onClose }) {
    const navigate = useNavigate()
    const isLogin = useSelector(state => state.auth.status)
    const user = useSelector(state => state.auth.user)
    const [popup, setPopup] = useState(false)

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Tasks",
            slug: "/tasks",
            active: isLogin
        },
        {
            name: "Profile",
            slug: `/profile/${user?._id}`,
            active: isLogin
        }
    ]

    const handleLogin = () => {
        navigate("/login")
        onClose()
    }

    const handleLogout = () => {
        navigate("/")
        onClose()
    }

    return (
        <>
            <div className={`fixed z-20 transition-transform duration-500 ${active ? 'transform translate-x-0' : 'transform translate-x-full'} right-0 top-0 h-screen w-[100vw] bg-[#121212]`}>
                <div className='flex flex-col px-3 pt-3 pb-5 justify-between h-full'>
                    <div className='flex flex-col'>
                        <div className='w-full flex justify-between leading-none'>
                            <h1 className='text-[#1e2ede] font-[poppins] font-medium text-[28px]'>TaskTrail</h1>
                            <button onClick={onClose}><CloseIcon sx={{ color: "#f7f7ff" }} /></button>
                        </div>

                        <div className='flex w-full justify-center mt-10 px-6'>
                            <ul className='sm:flex space-y-2 w-full flex flex-col items-center text-[20px] text-white font-jetbrains'>
                                {
                                    navItems.map(buttons => (
                                        buttons.active ? <li key={buttons.name} onClick={onClose} className='w-full flex justify-center'>
                                            <NavLink to={buttons.slug} className={({ isActive }) => `rounded-md block w-full text-center py-[2px] hover:bg-[#313131] ${isActive ? "bg-[#313131]" : null}`}> {buttons.name} </NavLink>
                                        </li> : null
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    {/* Login button */}
                    {
                        isLogin ? <div className='flex w-full justify-center mt-8 px-6'>
                            <button onClick={handleLogout} className='sm:block bg-[#1e2ede] text-white w-full font-jetbrains pt-[3px] pb-[5px] rounded-md'>Logout</button>
                        </div> : <div className='flex w-full justify-center mt-8 px-6'>
                            <button onClick={handleLogin} className='sm:block bg-[#1e2ede] text-white w-full font-jetbrains pt-[3px] pb-[5px] rounded-md'>Login</button>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}

export default SideMenu