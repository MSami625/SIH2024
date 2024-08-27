import React from 'react'

const Hero = () => {
  return (<>
    <div className=' w-full flex justify-left  items-center gap-4 pb-24 pt-10'>
       <div className="max-w-[50%] flex justify-start flex-col items-start">
          <span className='text-[4.6vw] font-semibold text-gray-800 leading-tight'>Write a Title Here. Click to Add and <br></br> Edit Title Text.</span>
          <p className=' text-[1.5vw] pt-5 pb-5 font-light '>This is a space to welcome visitors to the site. Add an engaging image or video. </p>
          <button className="rounded-full px-11 py-3 duration-300 cursor-pointer bg-black text-white border-2 hover:border-[#968f8f] hover:bg-white hover:text-black active:scale-[0.95]">
            Click Me
          </button>
       </div>
       <div>
          <img src="https://via.placeholder.com/500" alt="placeholder" />
       </div>
    </div>
    </>
  )
}

export default Hero
