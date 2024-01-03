
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

botonPaginaPrincial.disabled=true;
botonAnterior.disabled=true;
botonSiguiente.disabled=true;
botonUltimaPagina.disabled=true;

//pedidos de info con fech
function pedidoFetch(pagina){
    fetch('https://rickandmortyapi.com/api/character/?page='+pagina)
    .then((data)=>{
        return data.json();
        
    }).then((data)=>{
        console.log(data);
        totalPaginas=data.info.pages;

        botonPaginaPrincial.disabled=pagina==1;
        botonAnterior.disabled=pagina===1;
        botonSiguiente.disabled=totalPaginas===pagina;
        botonUltimaPagina.disabled=totalPaginas===pagina;

        totalPersonajes=data.results;
        mostrarenelHtml(totalPersonajes);
    })
}
pedidoFetch(paginaActual);

//eventos
// 1- traer elemento al que queremos agregar evento.
// 2- crear funcion que se ejecute cuando se dispare el evento.
// 3- creamos el evento, conectando todo

// funciones para el fitro 
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
}

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
    if (paginaActual>=totalPersonajes){
        paginaActual=totalPersonajes
    }
    pedidoFetch(paginaActual)
};
    
function ultimaPagina(){
    paginaActual=totalPaginas;
    pedidoFetch(paginaActual)
};
 //crear evento
 //evenotHTML.addEventListener('tipo de evento','funcion a llamar')

 botonFiltroMujer.addEventListener('click',filtrarMujer);
 botonFiltroHombre.addEventListener('click',filtrarHombre);
 botonFiltroSinGenero.addEventListener('click',filtrarSinGenero);
 botonFiltroDesconocido.addEventListener('click',filtrarDesconocido);
 botonFiltroTodo.addEventListener('click',filtrarTodo);

 botonPaginaPrincial.addEventListener('click',primerPagina);
 botonAnterior.addEventListener('click',anteriorPagina);
 botonSiguiente.addEventListener('click',siguientePagina);
 botonUltimaPagina.addEventListener('click',ultimaPagina);
 

