import React, { useState } from 'react';

const GifExpertApp = () => {

    // const categories = ['Iron Man', 'Superman', 'Thor']; 
    const [categories, setCategories] = useState(['Iron Man', 'Superman', 'Thor']);

    const handleAdd = () =>{
        // setCategories([...categories, 'Spiderman']);
        setCategories(cats => [...cats, 'Spiderman']);

    }

    return (
        <>
            <h2>GifExpertApp</h2>
            <hr/>

            <button onClick={handleAdd}>Agregar</button>

            <ol>
                { 
                    categories.map( category => {
                        return <li key={ category }> {category}</li>
                    })
                }
            </ol>

        </>
    );
}


export default GifExpertApp;