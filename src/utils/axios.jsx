import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers:  {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGU4OTRkNGZlODNkMWY1YmQyYjhlYzgzZjdhNGUwZiIsInN1YiI6IjY2MTBmZDJmZGY4NmE4MDE3ZTUzNjFlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PYB2SwOX0gnruj4LDQ_wo5w4KLKXj6kfpu1yYHMdzEY'
      }
})

export default instance;