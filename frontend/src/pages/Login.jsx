import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { login } from '../slices/AuthSlice'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import Loader from '../components/Loader'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoader(true)
        try {
            const loginResponse = await axios.post("/api/v1/users/login", { email, password })

            if (loginResponse.data) {
                toast.success("Login Successfully")
                dispatch(login(loginResponse.data.data))
                setLoader(false)
                navigate("/")
            }
        } catch (error) {
            toast.error(error.response.data.error)
            setLoader(false)
        }
    }
    return (
        <>
            <div className='w-full h-screen flex items-center justify-center bg-[#000]'>
                <form onSubmit={handleLogin} className='w-[290px] lg:w-[320px] h-[400px] bg-[#212121] rounded-3xl flex flex-col justify-between'>
                    <div className='flex flex-col items-center py-4 px-4'>
                        <h1 className='text-white font-[poppins] text-[24px] font-medium'>Login</h1>
                        <p className='text-[#b9b1b1] font-[montserrat] text-[16px] text-center'>Login with your email and pass</p>

                        <div className='mt-8 flex space-y-8 flex-col w-full'>
                            <div className='space-y-5'>
                                <input type="email" required value={email} onChange={handleEmail} className='w-full bg-[#f7f7ff] placeholder:text-[#414141] focus:outline-none py-1 px-2 font-[poppins] rounded-md' placeholder='Email' />
                                <input type="password" required value={password} onChange={handlePassword} className='w-full bg-[#f7f7ff] placeholder:text-[#414141] focus:outline-none py-1 px-2 font-[poppins] rounded-md' placeholder='Password' />
                            </div>
                            <div className='w-full space-y-1'>
                                <button type='submit' className='bg-[#1e2ede] w-full py-2 rounded-full font-[poppins] font-medium text-white'>Login</button>
                                <h2 onClick={() => navigate("/reset-password")} className='cursor-pointer font-[montserrat] text-sm text-[#f7f7ff]'>Forgot Password ?</h2>
                            </div>
                        </div>
                    </div>

                    <div className='bg-[#313131] w-full h-[50px] rounded-b-3xl flex items-center justify-center'>
                        <h2 className='text-white font-[montserrat]'>Don't have an account ? <span onClick={() => navigate("/signup")} className='font-[poppins] font-medium cursor-pointer text-blue-500 underline'>Signup</span></h2>
                    </div>
                </form>
            </div>
            <Loader active={loader} />
        </>
    )
}

export default Login