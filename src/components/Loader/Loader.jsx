import { ThreeDots } from 'react-loader-spinner'
import css from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={css.loader}>
            <ThreeDots
                visible={true}
                height="40"
                width="40"
                color="rgb(25, 25, 125)"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default Loader;