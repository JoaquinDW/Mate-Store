//Ecomerce de productos materos (Yerbas, mates, etc)
//  Variables Globales
const contenedor = document.getElementById("productos");
const tablaCarrito = document.getElementById("tablaCarrito");
let carrito =   [];
const botonVaciar = document.getElementById('vaciar')
const botonPagar = document.getElementById("pagar")

//Eventos
window.onscroll = function(){
    scroll = document.documentElement.scrollTop;
    header = document.getElementById("header");
    scroll > 30 ? header.classList.add("nav-mod") : header.classList.remove("nav-mod") // Operador Ternario
}

const guardarEnLocalStorage = window.localStorage;
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    cargarProductos(carrito, tablaCarrito, true);
    }
})

botonVaciar.addEventListener('click', () => {
    swal("Estas seguro de vaciar el carrito?", {
        buttons: {
          cancel: "Cancelar",
          catch: {
            text: "Continuar",
            value: "vaciar",
          },
        },
      })
      .then((value) => {
        switch (value) {
       
          case "defeat":
            swal("Pikachu fainted! You gained 500 XP!");
            break;
       
          case "vaciar":
            carrito = [] 
            cargarProductos(carrito, tablaCarrito, true)
            actualizarCarrito()
            swal({
                title: "Exito",
                text: "Se vacio correctamente",
                icon: "success",
                button: "Continuar",
              });
              break;
        }
      });
}) 
botonPagar.addEventListener('click', () =>{
    pagar()
})

//Funciones
const getCard = (item) => {
    return (
        `
        <div class="card" style="width: 18rem;">
            <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
            <div class="card-body">
                <h5 class="card-title">${item.nombre}</h5>
                <p class="card-text">$${item.precio}</p>
                <button onclick=agregarCarrito(${item.id}) class="btn ${item.stock ? 'btn-primary' : 'btn-secondary'}" ${!item.stock ? 'disabled' : '' } >Agregar al carrito</button>
            </div>
        </div>
    `);
};

const getRow = (item) => {
    return(
        `
    <tr>
        <th scope="row">${item.id}</th>
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precio * item.cantidad} ($${item.precio})</td>
        <td><img style="width:20px" src="${item.imagen}" alt="imagen"></td>
    </tr>
        `
    )
}

//funcion para renderizar cada producto
const cargarProductos = (data, nodo, esTabla) => {
    let acumulador = "";
    data.forEach((el) => {
        acumulador += esTabla ? getRow(el) : getCard(el); // Operador Ternario
    })
    nodo.innerHTML = acumulador;

};

const agregarCarrito = (id) => {
    const seleccion = PRODUCTOS.find(item => item.id === id);
    const busqueda = carrito.findIndex(el => el.id === id);
    
    if (busqueda === -1) {
        carrito.push({
            id: seleccion.id,
            nombre: seleccion.nombre,
            precio: seleccion.precio,
            cantidad: 1,
            imagen: seleccion.imagen,
        })
    } else {
        carrito[busqueda].cantidad = carrito[busqueda].cantidad + 1
    }
    
    cargarProductos(carrito, tablaCarrito, true);
    actualizarCarrito() 
}
cargarProductos(PRODUCTOS, contenedor, false);

const actualizarCarrito = () => {
        localStorage.setItem('carrito', JSON.stringify(carrito))
}

//Pagar
const pagar = async () => {

    const productosToMap = carrito.map(item => {
        let nuevoElemento = 
        {
            title: item.nombre,
            description: item.descripcionn,
            picture_url: item.img,
            category_id: item.id,
            quantity: item.cantidad,
            currency_id: "ARS",
            unit_price: item.precio
        }
        return nuevoElemento
    })
    let response = await fetch("https://api.mercadopago.com/checkout/preferences", {

        method: "POST",
        headers: {
            Authorization: "Bearer TEST-7123062078814175-060116-2a1d8478598f485f8a4dad517ea055c5-389442168"
        },
        body: JSON.stringify({
            items: productosToMap
        })
    })
    let data = await response.json()
    console.log(data)
    window.open(data.init_point, "_blank")
}
