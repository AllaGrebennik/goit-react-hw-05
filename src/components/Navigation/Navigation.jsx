import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const linkClassName = ({ isActive }) => {
    return clsx(css.link, isActive && css.isActive);
};

function Navigation() {
    return (
        <nav className={css.nav}>
            <NavLink to="/" className={linkClassName}>
                Home
            </NavLink>
            <NavLink to="/movies" className={linkClassName}>
                Movies
            </NavLink>
        </nav>
    );
};

export default Navigation;