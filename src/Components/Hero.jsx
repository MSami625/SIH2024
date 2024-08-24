import React from 'react'

const Hero = () => {
  return (<>
    <div className='ml-[8vw] mr-[8vw] w-full flex justify-left  items-center gap-4'>
       <div className="max-w-[50%] flex justify-start flex-col items-start pt-[8%]">
          <span className='text-[5vw] font-semibold text-gray-800 leading-tight'>Write a Title Here. Click to Add and <br></br> Edit Title Text.</span>
          <p className=' text-[1.5vw] pt-5 pb-5 font-light '>This is a space to welcome visitors to the site. Add an engaging image or video. </p>
          <button className="rounded-full px-11 py-3 duration-300 cursor-pointer bg-black text-white border-2 hover:border-[#968f8f] hover:bg-white hover:text-black active:scale-[0.95]">
            Click Me
          </button>
       </div>
       <div>
          <img src="https://via.placeholder.com/400" alt="placeholder" />
       </div>
    </div>
    </>
  )
}

export default Hero
