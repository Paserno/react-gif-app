import React, { useState, useEffect } from 'react'
import { getGif } from '../helpers/getGifs';
import { GifGridItem } from './GifGridItem';

export const GifGrid = ({ category }) => {

    const [images, setImages] = useState([]);


    useEffect(() => {
        getGif( category )
            .then( imgs => setImages(imgs));
    }, [ category ]) // un Arreglo vacio, se va a disparar una sola vez del useEffect



    // getGif()

    return (
        <>
            <h3>{category}</h3>
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
