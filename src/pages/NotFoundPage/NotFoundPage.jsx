import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

function NotFoundPage() {
    return (
        <div className={css.container}>
            <> <p>Oops! Not found!</p>
            <Link to="/">Back to home page!</Link>
            </>
           
        </div>
    );
};

export default NotFoundPage;