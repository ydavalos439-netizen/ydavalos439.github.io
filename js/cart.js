const contenedortarjetas = document.getElementById("productos-container");

function creartarjetaproductosinicio() {
    const productos = JSON.parse(localStorage.getItem("queques")) || [];
    contenedortarjetas.innerHTML = ""; // limpiar antes de renderizar

    if (productos.length > 0) {
        productos.forEach(producto => {
            const nuevoproducto = document.createElement("div");
            nuevoproducto.className = "tarjeta-producto";
            nuevoproducto.innerHTML = `
                <img src="./img/productofotos/${producto.id}.jpg">
                <h3>${producto.nombre}</h3>
                <p>Precio: ${producto.precio ? producto.precio : "No disponible"}</p>
                <div>
                  <button class="btn-restar">-</button>
                  <span class="cantidad">${producto.cantidad}</span>
                  <button class="btn-sumar">+</button>
                </div>
            `;
            contenedortarjetas.appendChild(nuevoproducto);

            // Botones
            nuevoproducto.querySelector(".btn-restar").addEventListener("click", () => modificarCantidad(producto.id, -1));
            nuevoproducto.querySelector(".btn-sumar").addEventListener("click", () => modificarCantidad(producto.id, 1));
        });
    } else {
        contenedortarjetas.innerHTML = "<p>No hay productos en el carrito.</p>";
    }

    actualizartotales();
}

function modificarCantidad(idProducto, cambio) {
    let productos = JSON.parse(localStorage.getItem("queques")) || [];
    const indice = productos.findIndex(p => p.id === idProducto);

    if (indice !== -1) {
        productos[indice].cantidad += cambio;
        if (productos[indice].cantidad <= 0) {
            productos.splice(indice, 1);
        }
        localStorage.setItem("queques", JSON.stringify(productos));
        creartarjetaproductosinicio();
    }
}

function actualizartotales() {
    const productos = JSON.parse(localStorage.getItem("queques")) || [];
    let unidades = 0;
    let precio = 0;

    productos.forEach(producto => {
        unidades += producto.cantidad;
        precio += producto.precio * producto.cantidad;
    });

    const cuentaCarrito = document.getElementById("cuenta-carrito");
    if (cuentaCarrito) cuentaCarrito.textContent = unidades;

    // Crear o actualizar el bloque de totales + botones
    let totalesDiv = document.getElementById("totales");
    if (!totalesDiv) {
        totalesDiv = document.createElement("div");
        totalesDiv.id = "totales";
        document.querySelector("main").appendChild(totalesDiv);
    }

    totalesDiv.innerHTML = `
        <p>Total unidades: ${unidades}</p>
        <p>Total a pagar: $${precio}</p>
        <div class="acciones">
            <button id="btn-finalizar">Finalizar compra</button>
            <button id="btn-reiniciar">Reiniciar carrito</button>
        </div>
    `;

    // Eventos de los botones
    document.getElementById("btn-finalizar").addEventListener("click", () => {
        alert("¡Gracias por tu compra! 🛍️");
        localStorage.removeItem("queques");
        creartarjetaproductosinicio();
    });

    document.getElementById("btn-reiniciar").addEventListener("click", () => {
        localStorage.removeItem("queques"); // limpia el carrito
        creartarjetaproductosinicio();      // refresca la vista sin productos
    });
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", creartarjetaproductosinicio);
