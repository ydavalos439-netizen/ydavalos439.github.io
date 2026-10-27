function agregarAlCarrito(producto){
  let memoria = JSON.parse(localStorage.getItem("queques")) || [];

  const indiceProducto = memoria.findIndex(item => item.id === producto.id);

  if(indiceProducto === -1){
    memoria.push({...producto, cantidad: 1});
  } else {
    memoria[indiceProducto].cantidad += 1;
  }

  localStorage.setItem("queques", JSON.stringify(memoria));

  // 🔢 Actualizar contador del carrito
  actualizarContadorCarrito(memoria);

  console.log("Carrito actualizado:", memoria);
}
function actualizarContadorCarrito(memoria){
  // Sumar todas las cantidades
  const total = memoria.reduce((acum, item) => acum + item.cantidad, 0);

  // Mostrar el total en el span
  document.getElementById("cuenta-carrito").textContent = total;
}
window.addEventListener("DOMContentLoaded", () => {
  const memoria = JSON.parse(localStorage.getItem("queques")) || [];
  actualizarContadorCarrito(memoria);
});
