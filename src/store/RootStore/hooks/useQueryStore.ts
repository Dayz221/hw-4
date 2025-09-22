import { useLocation } from "react-router"
import rootStore from "..";
import { useEffect } from "react";

export const useQueryStore = () => {
    const location = useLocation();

    useEffect(() => {
        rootStore.query.setParams(location.search)
    }, [location.search])
}