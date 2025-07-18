// carrito, name, neighborhood

export const generateWhatsAppMessage = (carrito, nombre, addressClient ,neighborhood) => {
  let message = "¡Hola! Quiero hacer este pedido:\n\n";
  let total = 0;

  carrito.forEach((prod) => {
    const prodTotal = prod.cantidadCart * prod.precio;
    message += `- ${prod.nombre} ${prod.cantidad} x ${
      prod.cantidadCart
    } - $${prodTotal.toLocaleString()}\n`;
    total += prodTotal;
  });

  message += `\nTotal: $${total.toLocaleString()}\n\n`;
  if (nombre && neighborhood) {
    message += `Mi nombre es ${nombre}.\nMi derección es ${addressClient}. Mi barrio es ${neighborhood}.`;
  }

  return encodeURIComponent(message);
};
