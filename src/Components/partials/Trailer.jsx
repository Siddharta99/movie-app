import React from 'react'
import ReactPlayer from 'react-player'
import {useSelector} from "react-redux";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Notfound   from '../Notfound';

const Trailer = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const category = pathname.includes("movie") ? "movie" : 'tv'; 
  const ytvideo = useSelector(state => state[category].info.videos);
  
  return ytvideo ? (
    <div className='absolute w-screen h-screen flex items-center justify-center top-0 left-0 z-[100] bg-[rgba(0,0,0,.9)] text-zinc-500'>
    <Link onClick={() => navigate(-1)} 

    className="hover:text-[#6556CD] absolute ri-close-fill text-3xl text-white right-[5%] top-[5%]"></Link>
    <ReactPlayer controls height={400} width={800} url={`https://www.youtube.com/watch?v=${ytvideo.key}`}/></div>
  ) : <Notfound />
}

export default Trailer