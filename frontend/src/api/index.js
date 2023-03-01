import axios from "axios"

export const fetchMovies = async (url,setMovies) => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${url}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
        setMovies(data.results);
    } catch(err) { 
       return err;
    }
}