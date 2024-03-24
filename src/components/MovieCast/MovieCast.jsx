import { getMovieCast } from "../../movie-api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from '../../components/Loader/Loader';
import css from "./MovieCast.module.css";

function MovieCast() {
    const { movieId } = useParams();
    const [actors, setActors] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';
    useEffect(() => {
        if (!movieId) return;
        async function getData() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await getMovieCast(movieId);
                setActors(data);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, [movieId]);

    return (
        <div className={css.container}>
            {isLoading && <Loader />}
            {error && <b>Oops! Error HTTP! Reload please!</b>}
            {actors.length > 0 ? (
                <ul>
                    {actors.map(({ cast_id, character, name, profile_path }) => (
                        <li key={cast_id} className={css.item}>
                            <img src={profile_path
                                ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                                : defaultImg}
                                    width={250}
                                    alt={name}
                            />
                            <div>
                                <h2>{name}</h2>
                                <p><b>Character:</b> {character}</p>
                            </div>
                        
                        </li>
                    ))}
                </ul>
                ) : (
                <p>There is no actors for this film</p>
            )}
        </div>
    );
};

export default MovieCast;