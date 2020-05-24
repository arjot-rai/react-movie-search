import React, {useState} from "react"
import ReactDOM from "react-dom"
import MovieCard from "./movieCard.js"

function SearchMovies(){

    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])

    const searchMovies = async(e) => {
        e.preventDefault();

        const url = `https://api.themoviedb.org/3/search/movie?api_key=abedaca77a5a93cef3a9659c2d5f7414&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try{
            const res = await fetch(url)
            const data = await res.json()
            setMovies(data.results)
        } catch(err){
            console.error(err)
        }
    }
    return(
        <>
            <form className="form" onSubmit={searchMovies}>
                <label htmlFor="query" className="label">Movie Name</label>
                <input className="input" type="text" 
                    name="query" 
                    placeholder="Enter movie name(i.e. Jurassic Park)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}>
                </input>
                <button type="submit" className="button">Submit</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => {return(
                    <MovieCard key={movie.id} movie={movie} />
                )})}
            </div>
        </>
    )

}

export default SearchMovies