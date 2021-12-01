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