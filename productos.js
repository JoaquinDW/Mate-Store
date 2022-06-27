// Aca se encuentran los productos a los que se hace referencia en el script principal
class nuevosProductos{
    constructor(id,nombre,precio,imagen,stock){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen
        this.stock = true
    }
    vender(){
        this.stock = false
    }
}

let producto1 = new nuevosProductos(1,"Yerba Canarias",1100,"img/canarias2.webp",true)
let producto2 = new nuevosProductos(2,"Yerba Baldo",1840,"img/baldo3.png",true)
let producto3 = new nuevosProductos(3,"Yerba Cruz de malta",590,"img/cruzdemalta.jpg" ,true)
let producto4 = new nuevosProductos(4,"Yerba Amanda",560,"img/amanda.jpg" ,true)
let producto5 = new nuevosProductos(5,"Yerba Playadito",600,"img/playadito.png" ,true)
let producto6 = new nuevosProductos(6,"Yerba Romance",740,"img/romance.webp" ,true)

const PRODUCTOS = [
    producto1,
    producto2,
    producto3,
    producto4,
    producto5,
    producto6,
]

