export const saveOrderToDB = async (carrito, name, addressClient, neighborhood) => {
  const orderData = {
    customerName: name,
    address: addressClient,
    neighborhood,
    items: carrito.map((prod) => ({
      title: prod.title,
      quantity: prod.quantity,
      cantidadCart: prod.cantidadCart,
      price: prod.price,
      total: prod.cantidadCart * prod.price,
    })),
    total: carrito.reduce((acc, prod) => acc + prod.cantidadCart * prod.price, 0),
    createdAt: new Date().toISOString(),
    status: "pendiente",
  };

  try {
    const res = await fetch("https://life-project-api-db-production.up.railway.app/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) throw new Error("Error al guardar el pedido");
  } catch (err) {
    console.error("Error al guardar en MongoDB:", err);
  }
};