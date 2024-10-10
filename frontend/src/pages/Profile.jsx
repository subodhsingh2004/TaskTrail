import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Profile() {
    const userInfo = useSelector(state => state.auth.user)

    return (
        <>
            <div className='h-screen pt-[15vh] w-full bg-gradient1 flex items-start justify-center'>

                <div className='flex flex-col w-[250px] space-y-5'>
                    <div>
                        <div className='flex w-full justify-between items-center space-x-2'>
                            <AccountCircleIcon sx={{ color: "#fff", fontSize: "100px", margin: 0 }} />
                            <div className='leading-tight w-full flex flex-col items-center'>
                                <h1 className='text-white text-center font-[poppins] font-medium text-[30px] sm:text-[36px] text-clip'>{userInfo?.username}</h1>
                                <h3 className='font-jetbrains text-gray-500'>{userInfo?.email}</h3>
                            </div>
                        </div>
                    </div>

                    <div className='w-full space-y-2'>
                        <ul className='w-full flex'>
                            <li className='text-white text-center w-full font-[poppins] border border-1 border-[#414141] hover:bg-[#313131] cursor-pointer rounded-md py-1'><NavLink to={'/reset-password'}>Reset Password</NavLink></li>
                        </ul>
                        <button className='bg-[#ff4c4c] py-1 rounded-md font-[poppins] font-medium w-full'>Delete Account</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Profile