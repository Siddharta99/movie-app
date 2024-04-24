import React from 'react'
import { Link } from 'react-router-dom'
import noimage from '/noimage.jpeg'


const Cards = ({data, title}) => {
  
  return (
    
    <div className='flex flex-wrap w-full px-[5%] p-[3%]'>
        {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`} className='relative w-[25vh] mr-[5%] mb-[5%]' key={i}>
            <img className='h-[25vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]' src={c.backdrop_path || 
            c.poster_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${c.backdrop_path || 
            c.poster_path || c.profile_path}` : noimage}
             alt=''/>
             <h1 className='text-2xl text-zinc-400 mt-3 font-semibold'>
            {c.name || 
            c.original_title || 
            c.title || 
            c.original_name}

             </h1>
      {c.vote_average && (
        <div className='text-white w-[6vh] absolute right-[-10%] bottom-[30%] rounded-full h-[6vh] flex justify-center items-center bg-yellow-600 text-xl font-semibold'>
      {(c.vote_average * 10).toFixed()} <sup>%</sup></div>

      ) }
      
        </Link>))}
    </div>
  )
}

export default Cards