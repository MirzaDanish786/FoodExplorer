import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Searchbar = ({onSearch}) => {
  const navigate = useNavigate();
  const handleLogoClick = () =>{
    navigate('/')
  }
    const [query, setQuery] = useState("");
    const handleInput = (e) => {
      setQuery(e.target.value)
    }
    const handleSearch = () => {
      if(query.trim() !== ""){
        onSearch(query)
      }
    }
    const handleKeyDown = (e) => {
      if(e.key === "Enter"){
        e.preventDefault();
        handleSearch();
      }
    }
    
    
    // console.log(query)
    
  return (
    <div className='flex font-mono justify-start items-center mb-8 gap-20 max-lg:gap-10 max-md:flex-col max-md:items-start max-md:gap-2.5'>
      <div className='Logo flex text-4xl font-bold cursor-pointer' onClick={handleLogoClick}>
        <div className='text-orange-500'>Food</div>
        <div className='text-white'>Explorer</div>
      </div>

      <div className='flex w-full gap-3.5'>
      <input className='w-1/2 border-2 border-orange-500 h-9 rounded-sm outline-none px-2.5 max-lg:w-full' value={query} type="text" onChange={handleInput} onKeyDown={handleKeyDown} placeholder='Search your recipe' />
      <button className='bg-orange-500 px-3.5 rounded-sm cursor-pointer hover:bg-orange-700' onClick={handleSearch} >Search</button>
      </div>
    </div>
  )
}

export default Searchbar
