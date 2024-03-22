import { Suspense, useEffect, useRef, useState } from "react";
import { useParams, Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { getMovieById } from "../../movie-api";
import Loader from '../../components/Loader/Loader';
import css from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
    const location = useLocation();
    const backLinkRef = useRef(location.state ?? "/");
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
	const defaultImg = '<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>';

    useEffect(() => {
        if (!movieId) return;
        async function getData() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await getMovieById(movieId);
                setMovie(data);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, [movieId]);

    return (
        <>
            <div className={css.container}>
                {isLoading && <Loader />}
                {error && <b>Oops! Error HTTP! Reload please!</b>}
                <Link to={backLinkRef.current}>Go back</Link>
                {movie && ( 
                    <div className={css.details}>
                        <div>
                            <img src={movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                : defaultImg}
                                width={250}
                                alt="poster"
                            />
                        </div>
                        <div className={css.info}>
                            <h1> {movie.original_title} ({movie.release_date.slice(0, 4)}) </h1>
                            <p>User score: {Math.round(movie.vote_average * 10)}%</p>
                            <h2>Overview</h2>
                            <p>{movie.overview}</p>
                            <h2>Genres</h2>
                            {movie.genres.map((genre) => (
                                <p key={genre.id}>{genre.name}</p>
                            ))}
                        </div>
                    </div>
                )}     
            </div>
            <div className={css.infoAdd}>
                <h3>Aditional infomation</h3>
                <ul>
                    <li>
                        <NavLink to="cast">Cast</NavLink>
                    </li>
                    <li>
                        <NavLink to="reviews">Reviews</NavLink>
                    </li>
                </ul>
            </div>       
            <Suspense fallback={<div>LOADING SUB COMPONENT...</div>}>
                <Outlet />
            </Suspense>   
        </>
    );
};

export default MovieDetailsPage;