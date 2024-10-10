import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

function Loader({ active = false }) {
    return (

        active ? <div className='fixed z-10 top-0 w-full h-screen flex items-center justify-center backdrop-blur-sm bg-[#212121] bg-opacity-25'>
            <CircularProgress size={60} sx={{color: "#1e2ede"}} />
        </div> : null

    )
}

export default Loader