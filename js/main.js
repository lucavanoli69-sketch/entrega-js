// CONSTRUCTOR DE PRENDAS
function Prenda(nombre, precio, talle) {
    this.nombre = nombre;
    this.precio = precio;
    this.talle = talle;
}

// CREAR ALGUNAS PRENDAS
const prenda1 = new Prenda("Remera", 25, "M");
const prenda2 = new Prenda("Buzo", 40, "L");
const prenda3 = new Prenda("Campera", 80, "XL");

// ARRAY DE LA TIENDA
const tienda = [];
tienda.push(new Prenda("Pantalón", 50, "M"));
tienda.push(prenda1, prenda2, prenda3);


// FUNCION PARA MOSTRAR PRODUCTOS
function mostrarPrendas(arr) {

    console.log(" PRENDAS DISPONIBLES ");

    for (let i = 0; i < arr.length; i++) {

        console.log(
            i + " - " +
            arr[i].nombre +
            " | Talle: " +
            arr[i].talle +
            " | $" +
            arr[i].precio
        );

    }

}


// FUNCION PARA REALIZAR LA COMPRA
function comprarPrenda(arr) {

    let opcion = parseInt(prompt("Ingrese el número de la prenda que desea comprar"));

    if (opcion >= 0 && opcion < arr.length) {

        let cantidad = parseInt(prompt("Ingrese la cantidad"));

        let total = arr[opcion].precio * cantidad;

        alert(
            "Producto: " + arr[opcion].nombre +
            "\nTalle: " + arr[opcion].talle +
            "\nCantidad: " + cantidad +
            "\nTotal: $" + total
        );

        console.log("Compra realizada correctamente");

    } else {

        alert("Producto no válido");

    }

}


// FUNCION PRINCIPAL DEL SIMULADOR
function iniciarSimulador() {

    let cliente = prompt("Ingrese su nombre");

    alert("Bienvenido a Tienda Catalina " + cliente);

    let continuar = true;

    do {

        mostrarPrendas(tienda);

        comprarPrenda(tienda);

        continuar = confirm("¿Desea realizar otra compra?");

    } while (continuar);

    alert("Gracias por visitar Tienda Catalina");

}


// EJECUTAR EL SIMULADOR
iniciarSimulador();