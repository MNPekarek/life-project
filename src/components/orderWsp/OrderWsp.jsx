// carrito, name, neighborhood

export const generateWhatsAppMessage = (carrito, nombre, neighborhood) => {
  let message = "¡Hola! Quiero hacer este pedido:\n\n";
  let total = 0;

  carrito.forEach((prod) => {
    const prodTotal = prod.cantidad * prod.precio;
    message += `- ${prod.nombre} x ${
      prod.cantidad
    } - $${prodTotal.toLocaleString()}\n`;
    total += prodTotal;
  });

  message += `\nTotal: $${total.toLocaleString()}\n\n`;
  if (nombre && neighborhood) {
    message += `Mi nombre es ${nombre}.\nMi barrio es ${neighborhood}.`;
  }

  return encodeURIComponent(message);
};
