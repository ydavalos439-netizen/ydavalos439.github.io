const contenedortarjetas = document.getElementById("productos-container");

function creartarjetaproductosinicio(productos) {
    productos.forEach(producto => {
        const nuevoproducto = document.createElement("div");
        nuevoproducto.className = "tarjeta-producto"; 
        nuevoproducto.innerHTML = `
       <img src="./img/productofotos/${producto.id}.jpg">
        <h3>${producto.nombre}</h3>
        <p>Precio: ${producto.precio ? producto.precio:"No disponible"}</p>
        <button>agregar al carrito</button>
        `;
        contenedortarjetas.appendChild(nuevoproducto);
        nuevoproducto.getElementsByTagName("button")[0].addEventListener("click",()=> agregarAlCarrito(producto))
    });
}
creartarjetaproductosinicio(productos);
    


