import React, { useState, useEffect } from 'react'
import { GifGridItem } from './GifGridItem';

export const GifGrid = ({category}) => {

    const [images, setImages] = useState([]);


    useEffect( () => {
        getGif();
    }, [] ) // un Arreglo vacio, se va a disparar una sola vez del useEffect


    const getGif = async() => {
        const url = 'https://api.giphy.com/v1/gifs/search?q=Goku&limit=10&api_key=fom8J2Gk6HSbvB8qZ4FpKEJCiaZg7H0Q';
        const resp = await fetch(url);
        const {data} = await resp.json();

        const gifs = data.map( img => {
            return {
                id: img.id,
                title: img.title,
                url: img.images?.downsized_medium.url
            }

        });

        console.log(gifs);
        setImages( gifs);
    }


    // getGif()

    return (
        <div>
            <h3>{category}</h3>
            
                {
                    images.map(img => (
                        <GifGridItem 
                        key={img.id}
                        { ...img }
                        />
                    ))
                }
            
        </div>
    )
}
