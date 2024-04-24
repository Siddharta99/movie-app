import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "../../utils/axios"
import noimage from "/noimage.jpeg"

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  
  const GetSearches = async() => {
    try {
      const {data} = await axios.get(`/search/multi?query=${query}`);
      
      setsearches(data.results);
     
      
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className='w-full h-[10vh] relative flex  mx-auto items-center ml-[10%]'>
      <i className="text-3xl text-zinc-400 ri-search-line"></i>
      <input onChange={(e) => setquery(e.target.value)}
      value={query}
       className='w-[50%]  p-3 text-xl outline-none border-none bg-transparent text-zinc-200' type="text" placeholder="search anything" />
       {query.length > 0 && (
      <i onClick={() => setquery("")} className="text-3xl  text-zinc-400 ri-close-fill"></i>

       )}

      <div className='w-[50%] z-[100] max-h-[50vh] bg-zinc-100 absolute top-[90%] overflow-auto'>
        {searches.map((s, i) => (
          <Link to={`/${s.media_type}/details/${s.id}`} key={i} className='p-10 hover:text-black hover:bg-zinc-300 duration-300 text-zinc-600 font-semibold flex justify-start border-b-2 border-zinc-100 items-center  w-[100%]'>
          <img className='w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg' src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`: noimage} alt='' />
          <span>{s.name || s.original_title || s.title || s.original_name}</span>
        </Link>
        ))}
        
      </div>
    </div>
  )
}

export default Topnav