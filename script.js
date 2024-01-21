// para menu hamburguesa
const toggleButton = document.getElementById('boton-menu')
const navWrapper = document.getElementById('nav')

let divTotalPersonajes = document.getElementById('totalPersonajes');
let divCajaPersonajes = document.getElementById('personajes');
//Filtros
let botonFiltroTodo = document.getElementById("filtroTodo");
let botonFiltroMujer = document.getElementById("filtroMujer");
let botonFiltroHombre = document.getElementById("filtroHombre");
let botonFiltroSinGenero = document.getElementById("filtroSinGenero");
let botonFiltroDesconocido = document.getElementById("filtroDesconocido");

let totalPersonajes;
let paginaActual=1;
let totalPaginas=1;

//paginado
let botonPaginaPrincial=document.getElementById('primerPagina');
let botonAnterior=document.getElementById('anterior');
let botonSiguiente=document.getElementById('siguiente');
let botonUltimaPagina=document.getElementById('ultimaPagina');
let etiquetaPaginaActual=document.getElementById('paginaActual');
let TextIrA=document.getElementById('irA');

//funcion para mostrar los personajes en el html
function mostrarenelHtml(arrPersonajes){
    divTotalPersonajes.innerHTML="Total de personajes: "+arrPersonajes.length;
    etiquetaPaginaActual.innerHTML="Página actual: "+paginaActual;
    divCajaPersonajes.innerHTML="";
    
    arrPersonajes.forEach((itemPersonaje) => {

        // divCajaPersonajes.innerHTML+=`
        // <div class="personaje">
        //     <h2>Nombre: ${itemPersonaje.name}</h2>
        //     <p>Genero: ${itemPersonaje.gender}</p>
        //     <img src="${itemPersonaje.image}" alt="${itemPersonaje.name}"/>
        // </div>
        // ` ;

        divCajaPersonajes.innerHTML+=`
        <div class="personaje">
        <div class="imagen">
             <img src="${itemPersonaje.image}" alt="${itemPersonaje.name}">
        </div>
        <div class="datos">
            <h2>Nombre: ${itemPersonaje.name}</h2>
            <p>Especie: ${itemPersonaje.species}</p>
            <p>Genero: ${itemPersonaje.gender}</p>
            <p>Estado: ${itemPersonaje.status}</p>
            <p>Origen: ${itemPersonaje.origin.name}</p>
            <p>Ubicación: ${itemPersonaje.location.name}</p>  
        </div>
        <div class="accion"> 
             <button class="mas" href="${itemPersonaje.origin.url}">Ver más</button>
        </div>
        </div>` ;

    });
};
// deshabilito los botones , luego se ira habilitando segun corresponda
botonPaginaPrincial.disabled=true;
botonAnterior.disabled=true;
botonSiguiente.disabled=true;
botonUltimaPagina.disabled=true;

//pedidos de info con fech
// aqui consumimos los datos del API que luego se guardaran en el arreglo
// totalPaginas para poder ser filtrados cuando el usuario lo solicite.

function pedidoFetch(pagina){
    fetch('https://rickandmortyapi.com/api/character/?page='+pagina)
    .then((data)=>{
        return data.json();
        
    }).then((data)=>{
        console.log(data);
        totalPaginas=data.info.pages;
        TextIrA.value="";
        botonPaginaPrincial.disabled=pagina==1;
        botonAnterior.disabled=pagina===1;
        botonSiguiente.disabled=totalPaginas===pagina;
        botonUltimaPagina.disabled=totalPaginas===pagina;

        totalPersonajes=data.results;
        mostrarenelHtml(totalPersonajes);
    })
}
pedidoFetch(paginaActual);
 

// funciones para el fitro 
// esta funcion asume que ya tenemos el arreglo totalPersonajes 
// y le aplica el filtro deseado

function filtraPersonajes(gender){
    if (gender==''){ 
        mostrarenelHtml(totalPersonajes);
    }
    else{
        let PersonajesFiltro=totalPersonajes.filter((itemPersonaje)=>{
            console.log(itemPersonaje.gender);
            return itemPersonaje.gender===gender;
            }); 
            mostrarenelHtml(PersonajesFiltro);
    }
    // para la hamburguesa luego de consultar directamente oculto el menu
    navWrapper.classList.remove('show')
    toggleButton.classList.remove('close')
}

// aplicando filtros por genero
function filtrarMujer(){
    filtraPersonajes('Female'); 
}

function filtrarHombre(){
    filtraPersonajes('Male');
}


function filtrarSinGenero(){
    filtraPersonajes('Genderless');
}


function filtrarDesconocido(){
    filtraPersonajes('unknown');
}

function filtrarTodo(){
    filtraPersonajes('');    
}


// consultando datos de la pagina deseada
function primerPagina(){
    paginaActual=1;
    pedidoFetch(paginaActual)
};

function anteriorPagina(){
    paginaActual--;
    if (paginaActual<=0){
        paginaActual=1;
    }   
    pedidoFetch(paginaActual)
};

function siguientePagina(){
    paginaActual++;
    if (paginaActual>=totalPaginas){
        paginaActual=totalPaginas;
    }
    pedidoFetch(paginaActual)
};
    
function ultimaPagina(){
    paginaActual=totalPaginas;
    pedidoFetch(paginaActual)
};
 

function irAPagina(){
   paginaActual=parseInt(TextIrA.value) ;
   if (paginaActual>=totalPaginas){
       paginaActual=totalPaginas;
   }
   if (paginaActual<0){
       paginaActual=1;
   } 
   pedidoFetch(paginaActual)
}

// vinculo cada evento a los botones de filtro
 botonFiltroMujer.addEventListener('click',filtrarMujer);
 botonFiltroHombre.addEventListener('click',filtrarHombre);
 botonFiltroSinGenero.addEventListener('click',filtrarSinGenero);
 botonFiltroDesconocido.addEventListener('click',filtrarDesconocido);
 botonFiltroTodo.addEventListener('click',filtrarTodo);

 // vinculo cada evento a los botones de paginado
 botonPaginaPrincial.addEventListener('click',primerPagina);
 botonAnterior.addEventListener('click',anteriorPagina);
 botonSiguiente.addEventListener('click',siguientePagina);
 botonUltimaPagina.addEventListener('click',ultimaPagina);
 TextIrA.addEventListener('change',irAPagina) 


// para la hamburguesa 
// este evento controla el click de la misma haciendo que el menu
// aparezca o desaparezca segun corresponda.
toggleButton.addEventListener('click',() => {
  toggleButton.classList.toggle('close')
  navWrapper.classList.toggle('show')
})

navWrapper.addEventListener('click',e => {
   if(e.target.id === 'nav'){ 
    navWrapper.classList.remove('show')
    toggleButton.classList.remove('close')
  }
})

