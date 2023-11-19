import React from 'react';
import "./Search.css";
import { BiSearch } from 'react-icons/bi'

export default function Search({value, onChange}) {
  return (
    <div className='search'>
      <div className="iconsea">
        <BiSearch />
      </div>
      <input 
        type="text" 
        placeholder='search by name' 
        value={value}
        onChange={onChange}
        className='input'
      />
    </div>
  )
}
