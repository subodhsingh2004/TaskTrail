import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import SideMenu from '../pages/SideMenu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/AuthSlice';

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.auth.status)
  const user = useSelector(state => state.auth.user)

  const [menuPopup, setMenuPopup] = useState(false)

  const handleMenuClick = () => {
    setMenuPopup(prev => !prev)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

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

  return (
    <>
      <nav className='fixed w-full z-10 h-[8vh] bg-[#121212] flex items-center justify-between px-3 md:px-5 border-b border-b-gray-700'>
        <h1 className='text-[#1e2ede] font-[poppins] font-medium text-[28px]'>TaskTrail</h1>

        <ul className='hidden sm:flex gap-8 text-[20px] text-white font-jetbrains'>
          {
            navItems.map(buttons => (
              buttons.active ? <li key={buttons.name}>
                <NavLink to={buttons.slug} className={({ isActive }) => `rounded-md text-[18px] px-[10px] py-1 hover:bg-[#313131] ${isActive ? "bg-[#313131]" : null}`}>{buttons.name}</NavLink>
              </li> : null
            ))
          }

        </ul>

        {
          isLogin ? <button onClick={handleLogout} className='hidden sm:block bg-[#1e2ede] text-white px-5 font-jetbrains pt-[3px] pb-[5px] rounded-full '>Logout</button> : <button onClick={() => navigate("/login")} className='hidden sm:block bg-[#1e2ede] text-white px-5 font-jetbrains pt-[3px] pb-[5px] rounded-full '>Login</button>
        }



        <button className='sm:hidden' onClick={handleMenuClick}><MenuIcon sx={{ color: "#f7f7ff" }} /></button>
      </nav>

      <SideMenu active={menuPopup} onClose={handleMenuClick} />
    </>
  )
}

export default Navbar