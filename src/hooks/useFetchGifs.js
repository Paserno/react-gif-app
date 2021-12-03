import { useEffect, useState } from "react";
import { getGif } from '../helpers/getGifs';


export const useFetchGifs = (category) => {

    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {

        getGif(category)
            .then(imgs => {

                setState({
                    data: imgs,
                    loading: false
                });


            });
    }, [category])


    return state;
}

