import { useEffect, useState } from "react";
import { getTrandingMovies } from "../../movie-api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from '../../components/Loader/Loader';
import css from "./HomePage.module.css";

function HomePage() {
    const [trandingMovies, setTrandingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await getTrandingMovies();
                setTrandingMovies(data);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, []);
    return (
        <div>
            <h1 className={css.title}>Trendig today</h1>
            {isLoading && <Loader />}
            {error && <b>Oops! Error HTTP! Reload please!</b>}
            <MovieList movies={trandingMovies} />
        </div>
    );
}

export default HomePage;