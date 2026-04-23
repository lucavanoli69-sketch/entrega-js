
// VARIABLES


let carrito = []
let productos = []

let contenedorCarrito
let totalElemento
let contadorElemento
let contenedorProductos



// FETCH PRODUCTOS (JSON)


function cargarProductos() {
    const ruta = window.location.pathname.includes("pages") ? "../json/productos.json" : "./json/productos.json";
    
    fetch(ruta) 
        .then(res => {
            if (!res.ok) throw new Error("Error HTTP: " + res.status);
            return res.json();
        })
        .then(data => {
            productos = data
            renderProductos()
        })
        .catch(error => console.error("Error cargando productos:", error))
}



// RENDER PRODUCTOS


function renderProductos() {
    if (!contenedorProductos) return

    contenedorProductos.innerHTML = ""

    productos.forEach(prod => {
        contenedorProductos.innerHTML += `
            <div class="producto">
                <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 100%; max-width: 180px; display: block; margin: 0 auto 10px; border-radius: 8px;">
                <h3>${prod.nombre}</h3>
                <p>$${prod.precio}</p>
                <button class="btn-agregar"
                    data-id="${prod.id}"
                    data-nombre="${prod.nombre}"
                    data-precio="${prod.precio}">
                    Agregar al carrito
                </button>
            </div>
        `
    })

    activarBotonesAgregar()
}



// CARRITO


function cargarCarrito() {
    const data = localStorage.getItem("carrito")

    try {
        carrito = data ? JSON.parse(data) : []
    } catch (e) {
        carrito = []
    }

    renderCarrito()
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function agregarAlCarrito(id, nombre, precio) {
    const producto = { id, nombre, precio }

    carrito.push(producto)

    guardarCarrito()
    renderCarrito()
}

function eliminarProducto(index) {
    carrito.splice(index, 1)

    guardarCarrito()
    renderCarrito()
}

function vaciarCarrito() {
    carrito = []

    guardarCarrito()
    renderCarrito()
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío")
    } else {
        alert("Compra realizada con éxito")
        vaciarCarrito()
    }
}



// UI CARRITO


function mostrarTotal() {
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0)
    totalElemento.innerText = "Total: $" + total
}

function actualizarContador() {
    contadorElemento.innerText = carrito.length
}

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



// EVENTOS


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



// INIT


document.addEventListener("DOMContentLoaded", () => {

    contenedorCarrito = document.getElementById("carrito")
    totalElemento = document.getElementById("total")
    contadorElemento = document.getElementById("contador")
    contenedorProductos = document.getElementById("contenedor-productos")

    cargarCarrito()
    cargarProductos()

    const btnVaciar = document.getElementById("vaciar-carrito")
    if (btnVaciar) {
        btnVaciar.addEventListener("click", vaciarCarrito)
    }

    const btnFinalizar = document.getElementById("finalizar-compra")
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", finalizarCompra)
    }
})