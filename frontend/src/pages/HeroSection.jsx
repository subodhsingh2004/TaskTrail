import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

function HeroSection() {
    const navigate = useNavigate()
    const loginStatus = useSelector(state => state.auth.status)
    
    return (
        <>
            <div className='w-full h-screen bg-gradient1 flex justify-center items-center'>

                <div className='w-[90%] flex flex-col items-center'>

                    <h1 className='hidden md:block md:text-[40px] text-center lg:text-[60px] text-white font-[poppins] font-medium'>Stay Organized, Stay Productive</h1>
                    <h1 className=' text-[36px] leading-10 text-white font-[poppins] font-medium md:hidden'>Stay Organized <br /> Stay Productive</h1>

                    <h2 className='text-gray-500 mt-2 sm:mt-0 font-[montserrat] font-medium text-[16px] sm:text-[30px]'>Your ultimate To-Do List manager</h2>

                    <p className='text-[#f7f7ff] font-jetbrains lg:w-[680px] mt-5 sm:text-[20px] leading-tight '>Easily track tasks and priortize your day. Whether it's for work, school or personal projets, Our intutive interface keep you focused and on top of your goals</p>

                    {loginStatus ? <button onClick={() => navigate('/tasks')} className='bg-[#1e2ede] text-white font-jetbrains py-1 px-3 rounded-md text-[18px] mt-16 hover:bg-[#090c9b] duration-150'>Your Tasks</button> : <button onClick={() => navigate('/signup')} className='bg-[#1e2ede] text-white font-jetbrains py-1 px-3 rounded-md text-[18px] mt-16 hover:bg-[#090c9b] duration-150'>Get Started</button>}

                </div>

            </div>
        </>
    )
}

export default HeroSection