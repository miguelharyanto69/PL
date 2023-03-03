import axios from "axios"
import { ReactReduxContext } from "react-redux";

export const fetchMovies = async (url,setMovies) => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${url}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
        setMovies(data.results);
    } catch(err) { 
       return err;
    }
}

export const fetchMovie = async (id,setMovies) => {
     try {
         const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
         setMovies(data);
         console.log(data);
     } catch(err) {
         return err;
     }
}

export const fetchPersons = async (setPersons) => {
     try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
        console.log(data);
        setPersons(data.results);
     } catch(err) {
        return err;
     }
}