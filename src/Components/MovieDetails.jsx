import React, { useEffect } from 'react'
import { asyncloadmovie, removemovie } from '../store/actions/movieActions';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import HorizontalCards from './partials/HorizontalCards';
import { Outlet } from 'react-router-dom';

const MovieDetails = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const {id} = useParams();
  const {info} = useSelector(state => state.movie)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie)
    }
  }, [id]);
  return info ? (
    <div style={{
      background: `linear-gradient(rgba(0,0,0,.4),  rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path })`,
      backgroundPosition: 'center',
      backgroundSize:'cover',
      backgroundRepeat: "no-repeat" 
      }} className='w-screen relative h-[190vh] px-[10%] '>

      {/* Part 1 navigation */}
      <nav className='h-[10vh] items-center w-full text-zinc-100 flex gap-10 text-2xl'>
          
      <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line "></Link>
      <a target='_blank' href={info.detail.homepage}><i className="ri-external-link-fill"></i></a>
      <a  target='_blank' href={`https://en.wikipedia.org/wiki/${info.externalid.wikidata_id}`}><i className="ri-earth-fill"></i></a>
      <a  target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}>imdb</a>
      </nav>


      

      {/* Part 2 Poster and details */}
      <div className='w-full flex '>
      <img className='h-[25vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]' src={`https://image.tmdb.org/t/p/original/${info.detail.backdrop_path || 
            info.detail.poster_path}`}
             alt=''/>
  
      <div className='content ml-[5%] text-white'>
        <h1 className='text-5xl font-black text-white '>{ info.detail.name || 
          info.detail.original_title || 
          info.detail.title || 
          info.detail.original_name       
}
        <small className='text-2xl font-bold text-zinc-300'>({info.detail.release_date.split("-")[0]})</small>

</h1>

        <div className='flex text-white gap-x-5 mt-5 mb-8 items-center '>
        <span className='text-white w-[6vh]  rounded-full h-[6vh] flex justify-center items-center bg-yellow-600 text-xl font-semibold'>
      {(info.detail.vote_average * 10).toFixed()} <sup>%</sup></span>

          <h1 className='font-semibold text-2xl w-[60px] leading-6'>User Score</h1>
          <h1>{info.detail.release_date}</h1>
          <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
          <h1>{info.detail.runtime}min</h1>
        </div>

      
        <h1 className='text-2xl font-semibold italic text-zinc-200'>{info.detail.tagline}</h1>

      
        <h1 className='text-2xl mb-3 mt-5'>Overview</h1>
        <p>{info.detail.overview}</p>

        
        <h1 className='text-2xl mb-3 mt-5'>Movie Translated</h1>
        <p className='mb-[5%]'>{info.translations.join(", ")}</p>
        <Link className=' p-2 px-6 py-4  bg-[#6556cd] rounded-lg' to={`${pathname}/trailer`}><i className="text-xl mr-3  ri-play-fill"></i> Play Trailer</Link>
      </div>

      </div>
      <>
      {/* Part 3 Available on Platform */}

      <div className='w-[80%] flex flex-col gap-y-5  '>
      
      {info.watchproviders && 
        info.watchproviders.flatrate && (<div className='flex gap-x-10 items-center text-white'>

          <h1>Available on Platforms</h1>
          {info.watchproviders.flatrate.map((w) => (
          <img 
          title={w.provider_name}
        className='w-[5vh] h-[5vh] object-cover rounded-md'
        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              alt=""
            />)) 
}
        </div>)}



        {info.watchproviders && 
        info.watchproviders.rent && (<div className='flex gap-x-10 items-center text-white'>

          <h1>Available on Rent</h1>
          {info.watchproviders.rent.map((w) => (
          <img
          title={w.provider_name} 
        className='w-[5vh] h-[5vh] object-cover rounded-md bg-black'
        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              alt=""
            />)) 
}
        </div>)}

       

        

        {info.watchproviders && 
        info.watchproviders.buy && (<div className='flex gap-x-10 items-center text-white'>

          <h1>Available to Buy</h1>
          {info.watchproviders.buy.map((w) => (
          <img 
          title={w.provider_name}
        className='w-[5vh] h-[5vh] object-cover rounded-md'
        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              alt=""
            />)) 
}
        </div>)}
      </div>
      {/* Part 4 Recommendations and Similar Stuff */}
    <hr className='mt-10 mb-5 border-none h-[2px] bg-zinc-500'/>
    <h1 className='text-3xl font-bold text-white'>Recommendations & Similar stuff</h1>
    <HorizontalCards data={
      info.recommendations.length > 0 ? info.recommendations : info.similar
    }/>
      <Outlet/>
      </>

</div>    
  ) : <Loading/>

}

export default MovieDetails