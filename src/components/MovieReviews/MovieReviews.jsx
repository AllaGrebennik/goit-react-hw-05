import { getMovieRewiews } from "../../movie-api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from '../../components/Loader/Loader';
import css from "./MovieReviews.module.css";

function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!movieId) return;
        async function getData() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await getMovieRewiews(movieId);
                setReviews(data);
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
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map(({ id, author, content }) => (
                        <li key={id}>
                            <h3>Autor: {author}</h3>
                        	<p>{content}</p>                           
                        </li>
                    ))}
                </ul>
            ) : (
                <p>There is no reviews for this film</p>
            )}
        </div>
    );
};

export default MovieReviews;