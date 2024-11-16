import React, { useState } from 'react'
import {AiOutlineMinus,AiOutlinePlus} from 'react-icons/ai'

const FaqItem = ({item}) => {
    const [isOpen,setIsOpen] =useState(false)
    const toggleAcoordion=()=>{
        setIsOpen(!isOpen);
    }
  return (
    <div className='p-3 lg:p-4 rounded-[12px] bg-slate-800 border border-solid border-purple-200 mb-5 cursor-pointer'>
        <div onClick={toggleAcoordion}className="flex items-center justify-between gap-5">
            <h4 className='text-[16px] leading-6 text-gray-200
             lg:text-[22px] lg:leadin-8 '>{item.question}</h4>
             <div className={`${isOpen ? 'bg-purple-200 text-black border-none':'text-white'}  w-7 h-7 lg:w-8 lg:h-8 border border-solid border-purple-200 rounded-full flex items-center justify-center `}>{isOpen?<AiOutlineMinus/>:<AiOutlinePlus/>}</div>
        </div>
        {
            isOpen &&
            <div className="mt-4"><p className='text-[14px] leading-6 lg:text-[16px] font-[400] lg:leading-7 text-gray-400 text-justify'>{item.content}</p></div>
        }
    </div>

  )
}

export default FaqItem