import React from 'react'
import govtgujlogo from '../Assets/govtguj.png'

const header = () => {
  return (
    <div className='flex items-center justify-start pt-4 pl-10 pr-10'>
       <div className='flex gap-4 items-center justify-center'>
        <img src={govtgujlogo} alt="" className='w-12' />
        <h2>GOVERNMENT <br /> OF GUJARAT</h2>
       </div>
    </div>
  )
}

export default header
