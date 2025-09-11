import { getLightColorFromImage } from '@/lib/helper'
import React, { useEffect, useState } from 'react'

const ResumeSummaryCard = ({
    title, 
    imgUrl, 
    lastUpdate,
    onSelect
}) => {

  const [bgColor , setbgColor] = useState("#ffffff")

  useEffect(()=>{
    if (imgUrl){
      getLightColorFromImage(imgUrl)
      .then((color) =>{
        setbgColor(color)
      })
      .catch(()=>{
        setbgColor("#ffffff")
      })
    }
},[imgUrl])
  return (
    <div className='text-white h-[300px] flex flex-col items-center justify-between bg-[#0c0c0c] rounded-lg border boder-gray-200 hover:border-blue-400 overflow-hidden cursor-pointer'
    style={{backgroundColor : bgColor}} onClick={onSelect}>
      <div className='p-4'>
        {imgUrl ? (
          <img src={imgUrl} alt="" className='w-[100%] h-[200px] rounded ' />
        ) :(
          <div>

          </div>
        )}

      </div>
      <div className="w-full bg-[#0c0c0c] px-4 py-4">
        <h5 className='text-sm font-medium truncate overflow-hidden whitespace-nowrap'>{title}</h5>
        <p className="text-xs font-medium text-gray-500 mt-0.5">
          Last Updated: {lastUpdate}
        </p>
      </div>
    </div>
  )
}

export default ResumeSummaryCard