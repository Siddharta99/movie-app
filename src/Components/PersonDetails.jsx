import React, { useEffect, useState } from 'react'
import { asyncloadperson, removeperson } from '../store/actions/personActions';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import HorizontalCards from './partials/HorizontalCards';
import { Outlet } from 'react-router-dom';
import Dropdown from './partials/Dropdown';



const PersonDetails = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const {id} = useParams();
  const {info} = useSelector(state => state.person)
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");
  


  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson)
    }
  }, [id]);

  return info ?  (
    <div className='px-[15%] w-screen bg-[#1f1e24] h-[200vh]'>

    
      {/* Part 1 navigation */}
      <nav className='h-[10vh] items-center w-full text-zinc-100 flex gap-10 text-2xl'>
          
      <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line "></Link>
      </nav>

    <div className='w-full flex  '>
      {/*  Part 2 left poster and details */}
      <div className='w-[35%] '>
      <img className='h-[30vh] w-[80%]  object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]' src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
             alt=''/>

    <hr className='mt-10 mb-5 border-none w-[80%] h-[2px] bg-zinc-500'/>

    {/* Social media links */}
    <div className='text-xl text-white flex gap-x-5'>
     
  
      <a  target='_blank' href={`https://en.wikipedia.org/wiki/${info.externalid.wikidata_id}`}><i className="ri-earth-fill"></i></a>
      <a  target='_blank' href={`https://www.facebook.com//${info.externalid.facebook_id}`}><i className="ri-facebook-circle-fill"></i></a>
      <a  target='_blank' href={`https://www.instagram.com//${info.externalid.instagram_id}`}><i className="ri-instagram-fill"></i></a>
      <a  target='_blank' href={`https://www.twitter.com//${info.externalid.twitter_id}`}><i className="ri-twitter-x-fill"></i></a>
  
  
    </div>

    {/*  Personal Information */}

    <h1 className='text-2xl text-zinc-400 font-semibold my-5'>Person Info</h1>
    <h1 className='text-lg text-zinc-400 font-semibold '>Known For</h1>
    <h1 className=' text-zinc-400 '>{info.detail.known_for_department}</h1>


    <h1 className='text-lg text-zinc-400 font-semibold mt-3'>Gender</h1>
    <h1 className=' text-zinc-400 '>{info.detail.gender === 2 ? "Male" : "Female"}</h1>
    

    <h1 className='text-lg text-zinc-400 font-semibold '>Birthday</h1>
    <h1 className=' text-zinc-400 '>{info.detail.birthday}</h1>

    
    <h1 className='text-lg text-zinc-400 font-semibold '>Place of Birth</h1>
    <h1 className=' text-zinc-400 '>{info.detail.place_of_birth}</h1>
    
    
    <h1 className='text-lg text-zinc-400 font-semibold '>Also Known As</h1>
    <h1 className=' text-zinc-400 '>{info.detail.also_known_as.join(", ")}</h1>
      </div>

      {/* Part 3 right details and information */}

    <div className='w-[80%] ml-[5%]'>

      
    <h1 className='text-5xl text-zinc-400 font-black my-5'>{info.detail.name}</h1>
    <h1 className='text-xl text-zinc-400 font-semibold '>Biography</h1>
    <p className='text-zinc-400 mt-3'>{info.detail.biography}</p>
    
    <h1 className='text-lg text-zinc-400 font-semibold mt-5'>Known For</h1>
    <HorizontalCards data={info.combinedCredits.cast}/>

    <div className='w-full flex justify-between'>
    <h1 className='text-xl text-zinc-400 font-semibold mt-5'>
      Acting
    </h1>

    <Dropdown title="category" options={["tv", "movie"]} func={(e) => setcategory(e.target.value)}/>
    </div>

    <div className='text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-lg shadow-[rgba(255,255,255,0.3)] mt-5 border-2 border-zinc-900 p-5 list-disc'>

      {info[category + "Credits"].cast.map((c,i) => (
        <li key={i} className='hover:text-white p-5 duration-300 cursor-pointer'>
      <Link to={`/${category}/details/${c.id}`} className=''>
        <span className=''>{ c.name || 
          c.original_title || 
          c.title || 
          c.original_name       
}</span>
        <span className='block ml-5 mt-2'>
        {c.character && `Character name: ${c.character}`} </span>
      </Link>
      </li>))}

      
    </div>
    </div>

    </div>








    </div>
  ) : <Loading />;
}

export default PersonDetails