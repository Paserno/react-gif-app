> __Elemento Anterior 👀:__ __[Primeros pasos de React 👣](https://github.com/Paserno/first-react-couterapp)__

<br>

# Gif App ⚛️
Aprendiendo el uso de React... 
* Recordar que si se desea ejecutar esta aplicación, deben de reconstruir los módulos de node así:
````
npm install
````
* Y luego para hacerla correr.
````
npm start
````
<br>

#

### 1.- ⚛️ Inicio del proyecto :
Se creo __GifExpertApp__ ademas de la carpeta __components__ y su componente __AddCategory.js__.
````
📂src/
    📂components/
            AddCategory.js
    GifExpertApp.js
    index.js
    index.css
```` 
*  En el __index.js__ se encuentra el renderizado de la aplicacion y en __GifExpertApp__ se encuentra la construcción principal del proyecto, donde retonramos los elementos __HTML__ que utilizaremos.
* Por otra parte tenemos la carpeta __components__ y su componente __AddCategory.js__.
* Establecemos el estado de __AddCategory.js__, con un __useState__
````
const[inputValue, setInputValue] = useState('Hola Mundo');
````
* Creamos el `input` que utilizaremos, y le asignamos el valor del estado `inputValue`.
````
return (
        <form>
            <input
                type="text"
                value={inputValue}
            />
        </form>
        
    );
````
* Luego la aplicación nos manda un error, diciendo que para cambiar el valor de `input` necesitamos establecerle una propiedad `onChange`.
* Pero Primero creamos una funcion de flecha que tome el valor del `input`.
````
const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
````
* Luego le asignamo la función creada, de esta manera logrando cambiar el valor del `input`.
````
<input
    type="text"
    value={inputValue}
    onChange={handleInputChange}
/>
````
* Posterior a esto se presenta otro problema, que cuando se presiona __Enter__ se refesca toda la pagina, para evitar esto se crea una nueva función.
* Con la propiedad `.preventDefault();`, se evita que se refesque la pagina completa.
````
const handleSubmit = (e) => {
        e.preventDefault();
    }
````
* Esta función se la establecimos al formulario `form`, con un `onSubmit`.
````
<form onSubmit={handleSubmit}>
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
        />
</form>
````
#
### 2. Comunicación entre componentes 💬:
Para esto necesitamos pasarle con elemento, este seria la propiedad `setCategories` del __useState__ que esta dentro de __GifExpertApp.js__.
````
    const [categories, setCategories] = useState([...]);
````
* En el return que renderizamos le mandamos la referencia de la propiedad mencionada "__setCategories__".
````
<h2>GifExpertApp</h2>
            <AddCategory setCategories={setCategories}/>
            <hr/>
````
* Luego vamos a __AddCategory.js__ la que recibira la propiedad que fue enviada por __GifExpertApp.js__.
````
export const AddCategory = ({setCategories}) => {...}
````
* En la función `handleSubmit()` se hará el manejo de la propiedad entregada.
* Realizamos una función de flecha la que establecemos _"la copia del arreglo"_ `[...cats]` que es pasada a traves de la propiedad, y ademas le insertamos el nuevo valor de `inputValue`.
````
const handleSubmit = (e) => {
        e.preventDefault();
        setCategories(cats => [...cats, inputValue]);
    }
````
* Para limpiar el __input__ (textbox) usamos `setInputValue('');` lo cual cada vez que invocamos a la función la que es emitido con el __"Enter"__
````
e.preventDefault();
setCategories(cats => [...cats, inputValue]);
setInputValue('');
````
* Adicionalmente le agregamos una condición para no insertar un string menor a 2 caracteres _(Eliminando los espacios del inicio y el fin `.trim()`)_
````
e.preventDefault();
if( inputValue.trim().length > 2 ){
    setCategories(cats => [...cats, inputValue]);
    setInputValue('');
}
````
Ahora se necesita que la función `setCategories` sea requerida para el uso del componente.
* Para esto requerimos de la importacion del __PropTypes__
````
import PropTypes from 'prop-types';
````
* Nos vamos al final de __AddCategory.js__ y usamoes el componente `AddCategory` y luego definimos nuestro __PropsTypes__.
* Usamos `.func` de función es requerida y que sea obligatoria con `.isRequired`
````
};
AddCategory.propTypes = {
    setCategories: PropTypes.func.isRequired
}
````


#
### 3.- Fetch Api - Obtener las imagenes:
El objetivo es obtener las imagens de Giphy, para esto creamos el componente __GifGrid.js__, la que importaremos en __GifExpertApp.js__.
````
import { GifGrid } from './components/GifGrid';
````
* Luego usamos el elemento `<GifGrid />` y le pasamos la key y category.
````
<ol>
    { 
        categories.map( category => (
            <GifGrid 
            key={category}
            category={category}/>
        ))
    }
</ol>
````
* Tomamos la propiedad __category__.
````
export const GifGrid = ({category}) => { ... }
````
* Creamos la clase que obtendra el url de la api a consumir.
* Nos aseguramos que la url este correcta, (Verificamos con Postman).
* Hacemos la desestructuración de la api con `const {data}`.
````
const getGif = async() => {
    const url = 'https://api.giphy.com/v1/gifs/search?q=Goku&limit=10&api_key=xxxxxxxxxxxxxx';
    const resp = await fetch(url);
    const {data} = await resp.json();
    }
````
* Luego retornamos un objeto litarario, para buscar los elementos que nos interesan, como el id, title y un url que nos acomode.
````
const gifs = data.map( img => {
            return {
                id: img.id,
                title: img.title,
                url: img.images?.downsized_medium.url
            }
        });
````
* Realizamos el return de la componente __GifGrid.js__.
````
  return (
        <div>
            <h3>{category}</h3>
        </div>
    )
````
* Retornara el elemento que tengamos en el __useState__ de __GifExportApp.js__
````
 const [categories, setCategories] = useState(['Goku']);
````
#
### 4.- useEffect: 
Resulta que la función `getGif()`, es renderizada siempre que haya un evento en la pagina, para esto es necesario el uso de useEffect, para que no se este ejecutando siempre y producir un potencial bucle.
* Realizamos la Imporacion de __useEffect__.
````
import React, { useState, useEffect } from 'react'
````
* Realizamos un contador para verificar.
````
const [count, setCount] = useState(0);
````
* Con el `<h4>` vemos el contador del __useState__.
* Ademas colocamos el boton con el evento __onClick__, comprobando que siempre que se inicia el evento del clic se ejecuta la funcion `getGif()`.
````
<div>
            <h3>{category}</h3>
            <h4>{count}</h4>
            <button onClick={ () => setCount( count + 1) } >count</button>
        </div>
````
* Para esto se invoca el __useEffect__, para evitar el problema.
* Colocamos la función `getGif();`.
* Ponemos un arreglo vacio `[]`, esto lo que porovoca es que se disparara una sola vez la función colocada en el __useEffect__.
````
useEffect( () => {
        getGif();
    }, [] ) 

````
#
### 5.- Mostrar los titulos de las imagenes (Gif) 🖼️:
Ya no es necesario el contador del __Punto 4__ ya que era para demostrar que era necesario el uso de __useEffect__, en esta ocasion lo eliminaremos, para continuar con el siguiente punto.
* Remplazamos el __useState count__ y lo remplazamos por uno de __images__.
````
const [images, setImages] = useState([]);
````
* Le pasamos el __.map()__ que hicimos el __Punto 3: Fetch Api - Obtener las imagenes:__ a nuestro nuevo `setImages`.
````
setImages( gifs);
````
* Luego creamos un nuevo componente que se denomino __GifGridItem.js__.
* Para luego invocarlo y pasarle algunas porpiedades, remplazando lo que hicimos en el __Punto 4__.
* No olvidar importarlo.
* Realizamos un `.map()` para manipular los elementos del arreglo.
* Le asignamo la key con los valores de id que tiene la propia api por cada Gif, luego le mandamos el operador spread `{...img}` para realizar una copia superficial del objeto y realizar la manipulación de este.

````
{
    images.map(img => (
        <GifGridItem 
        key={img.id}
        { ...img }
        />
    ))
}
````
Como habiamos mencionado se creeo __GifGridItem.js__ ahora nos vamos a manipular el componente.
* Primero le pasamos las propiedades, en este caso haciendo una desestructuracion de elementos `( {title, url} )`.
````
export const GifGridItem = ( {title, url} ) => {...}
````
* Realizamos el return correspondiente.
* Creando una imagen, la que se le pasara al __scr el url__ y creamos un parrafo con el __titulo__.
````
return (
        <div>
            <img src={url} alt={title}/>
            <p> {title} </p>
        </div>
    )
````
#
### 6.- Clases en CSS3:
Se agregaron las clases correspondientes para ver de una mejor forma las imagenes (gif) entregadas
* En el `div` de __GifGridItem.js__ se le agrego una clase `card`.
````
<div className="card">
````
* En el `div` de __GifGrid.js__ tambien se agrego la clase `card-grid`.
* Ademas se intercambio posicion con el `<h3>`.
````
<h3>{category}</h3>
<div className="card-grid">
````
#
### 7.- 📂 Helpres - getGif:
Para realizar una mayor modularidad del codigo, extraemos la funcion __getGifs de GifGrid.js__ y le creamos una 📂 carpeta llamada __helpers__ para crear un achivo JS y colocar su peticion fetch de la API de __Giphy__
* Copiamos el elemento de __GifGrid.js__ y lo insertamos en __getGifs.js__.
* Realizamos la exportacion correspondiente `export`.
* Y solicitamos la propiedad `category`.
````
export const getGif = async ( category ) => {...}
````
* En la busqueda `.../search?q=` le agregamos la propiedad `category`.
* Agregamos la funcion propia de JS `encodeURI()` lo que devuelve una nueva cadena que representa la cadena proporcionada codificada como un "URI".
````
const url = `https://api.giphy.com/v1/gifs/search?q=${ encodeURI(category) }&limit=10&api_key=XXXXXXXXXXXXXXXX`;
````
* Realizamos el retorno de la __map()__ __gifs__
````
return gifs;
````
Modificamos el __useEffect__ de __GifGrid.js__.
* Le mandamos la propiedad `category`.
* No olvidar importar __getGif__.
* Como es una promesa necesitamos el `.then` y llamamos el `setImages` para luego mandarle las imagenes(gif) `imgs`.
* Necesitamos poner una dependencia, que en este caso seria `[ category ]` y esta la colocamos al final del __useEffect__ _(para que no salga el Warning de dependencia)_
````
useEffect(() => {
    getGif( category )
        .then( imgs => setImages(imgs));
}, [ category ])
````
#
### 8.- Custom Hooks 🎣:
Crearemos un Custom Hooks, creando la capreta __📂 hooks__ donde se almacenaran los Hooks personalizados, ademas creamos en la carpeta mencionada __useFetchGitfs.js__ que lo utilizaremos.
* Realizamos la exportacion de hooks custom.
````
export const useFetchGifs = () => {...}
````
* Se crea el __useState__, con la importación correspondiente de React ⚛️.
````
const [state, setState] = useState({
        data: [],
        loading: true
    });
````
* Colocamos un `setTimeout` con 3s.
* Utilizamos el __setState__ y regresamos un arreglo y un false.
````
setTimeout(() => {
        setState({
            data: [1,2,3,4,5,6,7],
            loading: false
        })
    }, 3000);
````
*  Retonramos el __state__
````
return state; 
````
Luego importamos nuestro __Custom Hooks 🎣__ en __GifGrid.js__
* Realizamos la desestructuración del elemento.
* Comentamos todos los elementos __Hooks__ _(useState y useEffect)_.
````
    const { loading } = useFetchGifs();
````
* En el return, despues del `<h3>`, insertamos __loading__ con una operación ternario.
````
{ loading ? 'Cargando...' : 'Data Cargada.'}
````
#
### 9.- useFetchGif - obtener imagen y carga:
...
#
# Testing - Probando la aplicación de Gif App

Se realizará los test de la aplicación de __Gif__, elementos utilizados

* [Enzyme - React 17](https://github.com/wojtekmaj/enzyme-adapter-react-17)
* [Enzyme to JSON](https://www.npmjs.com/package/enzyme-to-json)
#
### 1.- Configurar el ambiente de prueba
Nos vamos a la documentación de __[Enzyme - React 17](https://github.com/wojtekmaj/enzyme-adapter-react-17)__ y __[Enzyme to JSON](https://www.npmjs.com/package/enzyme-to-json)__, para la instalación y implementación
* Realizamos la importaciones de ambos __Enzyme__.
````
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {createSerializer} from 'enzyme-to-json';
````
* Colocamos la configuración que se necesita en la documentación.
````
Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
````
Luego creamos 2 carpetas para almacenar los test y otra para los componentes que se probaran
* Se crea ambas carpetas `tests/components/GifGridItem.test.js`.

Ahora Realizaremos se hará los __test__ en `tests/components/GifGridItem.test.js`
* Realizamos la importaciones que utilizaremos.
````
import React from 'react';
import {shallow} from 'enzyme';
import { GifGridItem } from "../../components/GifGridItem"
````
* Realizamos la descripión de la prubea general. 
````
describe('Pruebas en <GifGridItem >', () => {
    ...
})
````
* Realizamos el primer test con su descripción, el cual sacara una imagen al contenido de `<GifGridItem />`.
````
test('debe de mostrar el componente correctamente ', () => {
        
        const wrapper = shallow( <GifGridItem /> )
        expect( wrapper ).toMatchSnapshot();
    });
````
#