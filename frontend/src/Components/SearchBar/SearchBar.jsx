import React from 'react'
import {FaMagnifyingGlass} from "react-icons/fa6"
import { IoMdClose } from "react-icons/io";

const SearchBar = ({value,onChange,handleSearch,onClearSearch}) => {
  return (
    <div className='w-40 sm:w-60 md:w-80 flex items-center px-4 rounded-md bg-slate-100'>
        <input type="text"
        placeholder='Search Notes ...'
        className='w-full text-xs bg-transparent py-[11px] outline-none'
        value={value}
        onChange={onChange} />

       {value && <IoMdClose className='cursor-pointer text-xl text-slate-500
        hover:text-black mr-3 ' onClick={onClearSearch}/>}

        <FaMagnifyingGlass className='cursor-pointer text-xl text-slate-500 hover:text-black mr-3'
         onClick={handleSearch}/>

    </div>
  )
}

export default SearchBar