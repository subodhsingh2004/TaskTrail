import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, Toaster } from "react-hot-toast"
import axios from "axios";
import OtpInput from '../components/OtpInput'
import Loader from '../components/Loader';

function Signup() {
  const navigate = useNavigate()

  const [otpField, setOtpField] = useState(false)
  const [loader, setLoader] = useState(false)


  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async (e) => {
    e.preventDefault()

    try {
      setLoader(true)
      const userResponse = await axios.post("/api/v1/users/signup", { username, email, password })
      if (userResponse.data) {
        setLoader(false)
        setOtpField(true)
        toast.success(userResponse.data.message)
      }
    } catch (error) {
      console.log(error.response.data.error)
      toast.error(error.response.data.error)
    }

  }

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleOtpVerification = async (otp) => {
    try {
      setLoader(true)
      const otpResponse = await axios.post("/api/v1/users/signup/verify-otp", { email, otp })

      if (otpResponse) {
        console.log(otpResponse.data);
        toast.success(otpResponse.data.message)
        setLoader(false)
        navigate("/")
      }
    } catch (error) {
      console.log(error.response.data.error)
      toast.error(error.response.data.error)
      setLoader(false)
    }
  }
  return (
    <>
      <Toaster toastOptions={{ duration: 4000, style: { fontFamily: "poppins" } }} />

      <div className='w-full h-screen flex items-center justify-center bg-[#000]'>
        {
          otpField ?
            // OTP form
            <form className='w-[290px] lg:w-[320px] h-auto bg-[#212121] rounded-3xl flex flex-col justify-between py-8'>
              <div className='flex flex-col items-center justify-center leading-5'>
                <h1 className='font-[poppins] text-white text-[24px]'>OTP Verification</h1>
                <p className='text-[#b9b1b1] font-[montserrat] mt-2'>Enter your OTP to verify</p>
                <div className='mt-4'>
                  <OtpInput length={6} submitOtp={handleOtpVerification} />
                </div>
              </div>
            </form> :
            // Signup form
            <form className='w-[290px] lg:w-[320px] h-[400px] bg-[#212121] rounded-3xl flex flex-col justify-between'>
              <div className='flex flex-col items-center py-4 px-4'>
                <h1 className='text-white font-[poppins] text-[24px] font-medium'>Signup</h1>
                <p className='text-[#b9b1b1] font-[montserrat]'>Create your account with email</p>

                <div className='mt-8 flex space-y-8 flex-col w-full'>
                  <div className='space-y-5'>
                    <input type="text" value={username} onChange={handleUsername} className='w-full bg-[#f7f7ff] placeholder:text-[#414141] focus:outline-none py-1 px-2 font-[poppins] rounded-md' placeholder='Username' />
                    <input type="email" value={email} onChange={handleEmail} className='w-full bg-[#f7f7ff] placeholder:text-[#414141] focus:outline-none py-1 px-2 font-[poppins] rounded-md' placeholder='Email' />
                    <input type="password" value={password} onChange={handlePassword} className='w-full bg-[#f7f7ff] placeholder:text-[#414141] focus:outline-none py-1 px-2 font-[poppins] rounded-md' placeholder='Password' />
                  </div>
                  <button type='submit' onClick={handleSignup} className='bg-[#1e2ede] hover:bg-[#090c9b] py-2 rounded-full font-[poppins] font-medium text-white'>Signup</button>
                </div>
              </div>

              <div className='bg-[#313131] w-full h-[50px] rounded-b-3xl flex items-center justify-center'>
                <h2 className='text-white font-[montserrat]'>have an account ? <span onClick={() => navigate("/login")} className='font-[poppins] font-medium text-blue-500 underline cursor-pointer'>Login</span></h2>
              </div>
            </form>
        }
      </div>
      <Loader active={loader} />
    </>
  )
}

export default Signup