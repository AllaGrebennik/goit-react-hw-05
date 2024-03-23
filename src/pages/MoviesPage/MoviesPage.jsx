import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchMovies } from "../../movie-api";
import MovieList from "../../components/MovieList/MovieList";
import MoviesSearch from "../../components/MoviesSearch/MoviesSearch";
import Loader from '../../components/Loader/Loader';

function MoviesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchMovies, setSearchMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const query = searchParams.get("query") ?? "";
    
    useEffect(() => {
        if (!query) return;
        async function getData() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await getSearchMovies(query);
                setSearchMovies(data);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, [query]);

    return (
        <>
            <MoviesSearch />
            {isLoading && <Loader />}
            {error && <b>Oops! Error HTTP! Reload please!</b>}
            {searchMovies.length > 0 ? (
                <MovieList movies={searchMovies} />
                      ) : (
                <p>There is no movies for this query</p>
            )}
        </>
    );
};

export default MoviesPage;



