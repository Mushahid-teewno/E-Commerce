import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Scroll = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top
    }, [pathname]); // Runs when the route changes

    return null;
};

export default Scroll;
