import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import css from "./MoviesSearch.module.css";

function MoviesSearch() {
    const [params, setSearchParams] = useSearchParams();

    const handleSubmit = e => {
        e.preventDefault();
        const value = e.currentTarget.elements.searchQuery.value;
        if (!value.trim()) {
            toast.error('Please enter a search query!');
        return;
        }
        setSearchParams({ query: value });
        e.currentTarget.reset();
    };

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <input
                className={css.input}
                type="text"
                name="searchQuery"
            />
            <button type="submit" className={css.btn}>
                Search
            </button>
            <Toaster position="top-right" />  
        </form>
    );
};

export default MoviesSearch;