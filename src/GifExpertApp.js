import React, { useState } from 'react';
import { AddCategory } from './components/AddCategory';
import { GifGrid } from './components/GifGrid';

const GifExpertApp = () => {

    
    const [categories, setCategories] = useState(['Goku']);

    // const handleAdd = () =>{
    //     // setCategories([...categories, 'Spiderman']);
    //     setCategories(cats => [...cats, 'Spiderman']);
    // }

    return (
        <>
            <h2>Gif Pasernin</h2>
            <AddCategory setCategories={setCategories}/>
            <hr/>


            <ol>
                { 
                    categories.map( category => (
                        <GifGrid 
                            key={category}
                            category={category}/>
                    ))
                }
            </ol>

        </>
    );
}


export default GifExpertApp;