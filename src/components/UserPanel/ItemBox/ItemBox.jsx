import React from 'react'

const ItemBox = ({imaSrc,title,subtitle}) => {
  return (
    <div className='flex gap-4 md:gap-2 items-center lg:justify-center'>
        <div>
            <img src={imaSrc} alt="title" className='w-9 h-9 md:w-10 md:h-10 xl:w-11 xl:h-11'/>
        </div>
        <div className='flex flex-col gap-2'>
            <span className='font-bold text-base'>{title}</span>
            <span className='text-xs text-gray-400'>{subtitle}</span>
        </div>
    </div>
  )
}

export default ItemBox