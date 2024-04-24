import React from 'react'
import { Link } from 'react-router-dom'
import noimage from '/noimage.jpeg'

const HorizontalCards = ({data}) => {
  // console.log(data)
  return (
            
        <div className='w-[100%] flex overflow-y-hidden  p-5'>
            {data.length > 0 ? data.map((d, i) =>(
                 <Link to={`/${d.media_type}/details/${d.id}`} key={i} className='min-w-[15%] bg-zinc-900 h-[40vh] mr-5 mb-5 mt-3'>
                 <img className='w-full  object-cover' src={d.backdrop_path || d.poster_path ? `https://image.tmdb.org/t/p/original/${
                    d.backdrop_path || d.poster_path})`: noimage}
                     alt='' />

          <div className='text-white h-[55%] overflow-y-auto'>
          <h1 className='text-xl font-semibold'>
                    {d.name || d.original_title || d.title || d.original_name}</h1>

                    <p className=''>
        {d.overview.slice(0, 50)}...
        <span className="text-blue-.00">more</span>

        </p>
          </div>
            
            </Link>)) : <h1 className='text-3xl text-white font-black text-center mt-5'>Nothing to show</h1>}
        </div>
    
  )
}

export default HorizontalCards