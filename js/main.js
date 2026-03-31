
/// ==========================
// VARIABLES
// ==========================
let carrito = []

let contenedorCarrito
let totalElemento
let contadorElemento


// ==========================
// CARGAR CARRITO DESDE STORAGE
// ==========================
function cargarCarrito() {
    const data = localStorage.getItem("carrito")

    if (data) {
        carrito = JSON.parse(data)
    } else {
        carrito = []
    }

    renderCarrito()
}


// ==========================
// GUARDAR EN STORAGE
// ==========================
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}


// ==========================
// AGREGAR PRODUCTO
// ==========================
function agregarAlCarrito(id, nombre, precio) {
    const producto = { id, nombre, precio }

    carrito.push(producto)

    guardarCarrito()
    renderCarrito()
}


// ==========================
// ELIMINAR PRODUCTO
// ==========================
function eliminarProducto(index) {
    carrito.splice(index, 1)

    guardarCarrito()
    renderCarrito()
}


// ==========================
// VACIAR CARRITO
// ==========================
function vaciarCarrito() {
    carrito = []

    guardarCarrito()
    renderCarrito()
}


// ==========================
// MOSTRAR TOTAL
// ==========================
function mostrarTotal() {
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0)

    totalElemento.innerText = "Total: $" + total
}


// ==========================
// CONTADOR DE PRODUCTOS
// ==========================
function actualizarContador() {
    contadorElemento.innerText = carrito.length
}


// ==========================
// RENDER DEL CARRITO
// ==========================
function renderCarrito() {
    if (!contenedorCarrito) return

    contenedorCarrito.innerHTML = ""

    carrito.forEach((producto, index) => {
        const div = document.createElement("div")
        div.classList.add("item-carrito")

        div.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            <button class="btn-eliminar">Eliminar</button>
        `

        div.querySelector(".btn-eliminar").addEventListener("click", () => {
            eliminarProducto(index)
        })

        contenedorCarrito.appendChild(div)
    })

    mostrarTotal()
    actualizarContador()
}


// ==========================
// EVENTOS BOTONES PRODUCTOS
// ==========================
function activarBotonesAgregar() {
    const botones = document.querySelectorAll(".btn-agregar")

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = boton.dataset.id
            const nombre = boton.dataset.nombre
            const precio = Number(boton.dataset.precio)

            agregarAlCarrito(id, nombre, precio)
        })
    })
}


// ==========================
// INICIALIZACIÓN
// ==========================
document.addEventListener("DOMContentLoaded", () => {

    contenedorCarrito = document.getElementById("carrito")
    totalElemento = document.getElementById("total")
    contadorElemento = document.getElementById("contador")

    cargarCarrito()
    activarBotonesAgregar()

    const btnVaciar = document.getElementById("vaciar-carrito")
    if (btnVaciar) {
        btnVaciar.addEventListener("click", vaciarCarrito)
    }
})


console.log("JS funcionando")