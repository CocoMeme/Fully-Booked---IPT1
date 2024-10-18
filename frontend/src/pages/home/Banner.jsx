import React from 'react'
import bannerImg from "../../assets/banner.png "

const Banner = () => {
  return (
    <div>
        <div>
            <h1 className='md:text-5xl text-2xl font-medium mb-7'>Welcom to Fully Booked!</h1>
            <p className='mb-10'>
                Its time to update your reading list with some of the latest and greatest releases in the literary world. 
                From heart-pumping thrillers to captivating memoirs, this weeks new releases offer something for everyone
            </p>
            <button className='btn-primary'>
                Shop Now!
            </button>
        </div>
        <div>
            <img src={bannerImg} alt="" />
        </div>   
    </div>
  )
}

export default Banner