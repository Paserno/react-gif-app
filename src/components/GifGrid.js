import React from 'react'

export const GifGrid = ({category}) => {

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

    }


    getGif()

    return (
        <div>
            <h3>{category}</h3>
        </div>
    )
}
