import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const ACCESS_KEY={Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDEzODZjYTg4MDZiYTZmOGIxZTUyM2RlNzZlMDc0MiIsInN1YiI6IjY1ZmMyNjdlN2Y2YzhkMDE3YzZjYTU0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-pZRNbjiODkMZ_DG812kEm0v7xeZDvGeQGezSyzwP8g"}
        
export const getTrandingMovies = async () => {
    const response = await axios.get("/trending/movie/week", {
        headers: ACCESS_KEY,
        params: {
            language: "en-US"
        },
    });
    return response.data.results;
};

export const getSearchMovies = async (searchQuery) => {
    const response = await axios.get("/search/movie", {
        headers: ACCESS_KEY,
        params: {
            query: searchQuery,
            include_adult: "false",
            language: "en-US"
        },
    });
    return response.data.results;
};

export const getMovieById = async (movieId) => {
    const response = await axios.get(`/movie/${movieId}`, {
        headers: ACCESS_KEY,
        params: {
            language: "en-US"
        },
    });
    return response.data;
};

export const getMovieCast = async (moviId) => {
    const response = await axios.get(`/movie/${moviId}/credits`, {
        headers: ACCESS_KEY,
        params: {
            language: "en-US"
        },
    });
    return response.data.cast;
};

export const getMovieRewiews = async (moviId) => {
    const response = await axios.get(`/movie/${moviId}/reviews`, {
        headers: ACCESS_KEY,
        params: {
            language: "en-US"
        },
    });
    return response.data.results;
};