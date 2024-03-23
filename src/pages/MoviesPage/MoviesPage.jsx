import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchMovies } from "../../movie-api";
import MovieList from "../../components/MovieList/MovieList";
import MoviesSearch from "../../components/MoviesSearch/MoviesSearch";
import Loader from '../../components/Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

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
                if (data.length===0) {
                    toast.error('There is no movies for this query');
                    return;
                }           
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
            <MovieList movies={searchMovies} />
            <Toaster position="top-right" />  
        </>
    );
};

export default MoviesPage;