import React, { useState } from 'react'
import OtpInput from '../components/OtpInput'
import toast, { Toaster } from 'react-hot-toast'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function ResetPassword() {
    const navigate = useNavigate()
    const [otpField, setOtpField] = useState(false)
    const [loader, setLoader] = useState(false)
    const [isVerified, setIsVerified] = useState(false)

    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value)
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        if(password !== newPassword) {
            toast.error("Both password must be same")
            return
        }
        try {
            const response = await axios.post("/api/v1/users/reset-password/new-password", { newPassword })
            if (response.data) {
                toast.success(response.data.message)
                setNewPassword("")
                setPassword("")
                navigate("/login")
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }


    const [email, setEmail] = useState("")

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleEmailSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoader(true)
            const emailResponse = await axios.post("/api/v1/users/reset-password", { email })

            setOtpField(true)
            toast.success(emailResponse.data.message)
            setLoader(false)

        } catch (error) {
            console.error(error.response)
            toast.error(error.response.data.error)
            setLoader(false)
            setOtpField(false)
        }
    }

    const handleOtpVerification = async (otp) => {
        try {
            setLoader(true)
            const otpResponse = await axios.post("/api/v1/users/reset-password/verify-otp", { otp })

            if (otpResponse.data) {
                setLoader(false)
                setIsVerified(true)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
            setLoader(false)
        }
    }
    return (
        <>
            <Toaster toastOptions={{ duration: 4000, style: { fontFamily: "poppins" } }} />

            {isVerified ?
                <div className='w-full h-screen flex items-center justify-center bg-[#000]'>
                    <form className='w-[290px] lg:w-[320px] h-auto bg-[#212121] rounded-3xl flex flex-col justify-between py-8'>
                        <div className='flex flex-col items-center justify-center leading-5 px-4'>
                            <h1 className='font-[poppins] text-white text-[24px]'>Password Reset</h1>
                            <p className='text-[#b9b1b1] font-[montserrat] mt-2'>Enter your new password</p>

                            <input type="text" value={password} onChange={handlePassword} className='w-full bg-[#f7f7ff] placeholder:text-[#414141] focus:outline-none py-2 px-2 mt-5 font-[poppins] rounded-md' placeholder='Password' />

                            <input type="text" value={newPassword} onChange={handleNewPassword} className='w-full bg-[#f7f7ff] placeholder:text-[#414141] focus:outline-none py-2 px-2 mt-5 font-[poppins] rounded-md' placeholder='Re enter password' />

                            <button type='submit' onClick={handlePasswordSubmit} className='bg-[#1e2ede] hover:bg-[#090c9b] py-2 mt-5 rounded-full font-[poppins] font-medium text-white w-full'>Continue</button>
                        </div>
                    </form>
                </div> :
                <div className='w-full h-screen flex items-center justify-center bg-[#000]'>
                    {
                        otpField ?
                            <form className='w-[290px] lg:w-[320px] h-auto bg-[#212121] rounded-3xl flex flex-col justify-between py-8'>
                                <div className='flex flex-col items-center justify-center leading-5'>
                                    <h1 className='font-[poppins] text-white text-[24px]'>OTP Verification</h1>
                                    <p className='text-[#b9b1b1] font-[montserrat] mt-2'>Enter your OTP to verify</p>
                                    <div className='mt-4'>
                                        <OtpInput length={6} submitOtp={handleOtpVerification} />
                                    </div>
                                </div>
                            </form> :
                            <form className='w-[290px] lg:w-[320px] h-auto bg-[#212121] rounded-3xl flex flex-col justify-between py-8'>
                                <div className='flex flex-col items-center justify-center leading-5 px-4'>
                                    <h1 className='font-[poppins] text-white text-[24px]'>Password Reset</h1>
                                    <p className='text-[#b9b1b1] font-[montserrat] mt-2'>Enter email to reset password</p>
                                    <input type="text" value={email} onChange={handleEmail} className='w-full bg-[#f7f7ff] placeholder:text-[#414141] focus:outline-none py-2 px-2 mt-5 font-[poppins] rounded-md' placeholder='Email' />

                                    <button type='submit' onClick={handleEmailSubmit} className='bg-[#1e2ede] hover:bg-[#090c9b] py-2 mt-5 rounded-full font-[poppins] font-medium text-white w-full'>Continue</button>
                                </div>
                            </form>
                    }
                </div>


            }

            <Loader active={loader} />
        </>
    )
}

export default ResetPassword