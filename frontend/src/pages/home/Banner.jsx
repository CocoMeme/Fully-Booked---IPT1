import React from 'react'
import bannerImg from "../../assets/banner.png"

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>

        <div className='md:w-1/2 w-full flex items-center md:justify-end'>
            <img src={bannerImg} alt="" />
        </div>           
        
        <div className='md:w-1/2 w-full'>

            <div className='flex items-center mb-10'>
                <div className='mr-4'>
                    <img src="/android-chrome-512x512.png" alt="" className='size-20'/>
                </div>
                <div>
                    <h1 className='font-extrabold text-7xl mb-0'>
                        <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">FULLY</span>
                        &nbsp;
                        <span className="bg-gradient-to-r from-green-300 to-green-700 bg-clip-text text-transparent">BOOKED</span>
                    </h1>
                </div>
            </div>

            <div className='ml-6'>
                <h1 className='md:text-5xl text-lg font-medium mb-7'>Newly Released Books!</h1>
                <h3 className='mb-5'>This is a project done by <strong>Andrei Co</strong> & <strong>Rean Joy Cicat</strong>.</h3>
                <p className='mb-10'>
                    Its time to update your reading list with some of the latest and greatest releases in the literary world. 
                    From heart-pumping thrillers to captivating memoirs, this weeks new releases offer something for everyone
                </p>
                <button className='btn-special shadow-md'>
                    Shop Now!
                </button>
            </div>
        </div>

    </div>
  )
}

export default Banner