# Gif App
Aprendiendo el uso de React... 
### 1.- Inicio del proyecto:
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
### 4. ABCD: 

#