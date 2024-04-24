import React from 'react'
import { Link } from 'react-router-dom'
const Header = ({data}) => {
 return (
    <div style={{
      background: `linear-gradient(rgba(0,0,0,.4),  rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
      backgroundPosition: 'center',
      backgroundSize:'cover',
      backgroundRepeat: "no-repeat" 
      }}
       className='w-full h-[60vh] flex flex-col items-start justify-end p-[5%]'>
        <h1 className='text-5xl font-black text-white w-[70%]'>
        {data.name || data.original_title || data.title || data.original_name}</h1>

        <p className='w-[70%] text-white mt-3 mb-3'>
        {data.overview.slice(0, 200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link>

        </p>
        <p className='text-white '>
        <i className="text-yellow-400 ri-megaphone-fill"></i> {" "}
        {data.release_date || "No Information"}
        <i className="text-yellow-500 ml-5   ri-album-fill"></i> {data.media_type.toUpperCase()}
        </p>
        <Link to={`${data.media_type}/details/${data.id}/trailer`} className='bg-[#6556CD] p-1 mt-2 text-white font-semibold'>Watch Trailer</Link>
       </div>
  )
}

export default Header