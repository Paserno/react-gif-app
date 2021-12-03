import React from 'react'
import { useFetchGifs } from '../hooks/useFetchGifs'
import { GifGridItem } from './GifGridItem';
// import { getGif } from '../helpers/getGifs';

export const GifGrid = ({ category }) => {

    // const [images, setImages] = useState([]);
    const { data:images, loading } = useFetchGifs(category);


    // useEffect(() => {
    //     getGif( category )
    //         .then( imgs => setImages(imgs));
    // }, [ category ]) // un Arreglo vacio, se va a disparar una sola vez del useEffect



    // getGif()

    return (
        <>
            <h3>{category}</h3>

            { loading && <p>Loading</p>}

            <div className="card-grid">

                {
                    images.map(img => (
                        <GifGridItem
                            key={img.id}
                            {...img}
                        />
                    ))
                }

            </div>
        </>
    )
}
