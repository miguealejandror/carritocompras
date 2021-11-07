// Variable
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){

    //Agregar Nuevo elemento al carrito
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina Curso del carito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el Carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = [];
        limpiarHTML();
    });

}

// Funciones
function agregarCurso (e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSelecionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSelecionado);

    }
}
// Eliminar un curso del carrito
function eliminarCurso(e){
    const dataid = e.target.getAttribute('data-id');
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== dataid)
    carritoHTML();
}

// Extraer informacion del curso
function leerDatosCurso(curso){
    //Objeto Curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('.info-card h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizar cantidad 
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })

    } else {
        // Agregando elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];

    }


    carritoHTML();


}

//Muestra el carrito de compras en el Html

function carritoHTML(){

    //Limpiar HTML
    limpiarHTML();

    //Genera el HTML
    articulosCarrito.forEach(curso =>{
        const {imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src = "${imagen}" width = 100>
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>

            <td>

                <a href="#" class="borrar-curso" data-id=${id}> X </a>

            </td>
        
        `;

        //Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
