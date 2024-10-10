import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import Loader from './Loader'

function OtpInput({ length, submitOtp }) {

    const inputRef = useRef([])
    const [otp, setOtp] = useState(new Array(length).fill(""))

    useEffect(() => {
        if (inputRef.current[0]) {
            inputRef.current[0].focus()
        }
    }, [])

    const handleChange = (e, idx) => {
        const val = e.target.value
        if (val === " ") return
        if (isNaN(val)) return

        const newOtp = [...otp];

        newOtp[idx] = val.substring(val.length - 1);
        setOtp(newOtp);

        // all otp value
        // const optVal = newOtp.join("")
        // if (optVal.length == length) submitOtp(optVal)

        if (val.length && idx < length - 1) {
            inputRef.current[idx + 1].focus()
        }
    }

    const handleClick = (idx) => {
        inputRef.current[idx].setSelectionRange(1, 1);
    }

    const handleKeyClick = (e, idx) => {
        if (e.key == 'Backspace' && idx > 0 && otp[idx] == "" && inputRef.current[idx - 1]) {
            inputRef.current[idx - 1].focus()
        }
    }

    const handleOtpSubmit = async (e) => {
        e.preventDefault()
        const otpValue = otp.join("")
        
        if (otp.every(val => val.trim() !== "")) {
            setOtp(new Array(length).fill(""))
            submitOtp(otpValue)
        } else {
            toast.error("All fields are required")
        }
    }

    return (
        <>
            <Toaster />
            <div className='flex flex-col items-center space-y-5'>
                <div className='flex space-x-2'>
                    {
                        otp.map((val, idx) => (
                            <input type="text"
                                key={idx}
                                ref={(input) => (inputRef.current[idx] = input)}
                                value={val}
                                onChange={(e) => handleChange(e, idx)}
                                onClick={(e) => handleClick(idx)}
                                onKeyDown={(e) => handleKeyClick(e, idx)}
                                className='h-[34px] w-[34px] rounded-md focus:outline-[#1e2ede] text-center text-[18px] font-[poppins]'
                            />
                        ))
                    }
                </div>
                <button onClick={handleOtpSubmit} className='bg-[#1e2ede] hover:bg-[#090c9b]  w-[150px] py-2 rounded-full font-[poppins] font-medium text-white'>Verify</button>
            </div>
            
        </>
    )
}

export default OtpInput