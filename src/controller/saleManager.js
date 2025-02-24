import { cartDao } from "../services/dao/carts.dao.js";
import { productDao } from "../services/dao/products.dao.js";
import { createTicket } from "../services/ticket.service.js";

export const purchaseCart = async (req, res) => {
  if (!req.user) {
    console.log("Usuario no autenticado:", req.user); 
    return res.status(401).json({ status: "error", message: "Usuario no autenticado" });
  }

  const { cid } = req.params;

  try {
    const cart = await cartDao.getById(cid);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }
    
    console.log("Carrito de compras antes de procesar:", cart.products); 
    
    let totalAmount = 0;
    let purchasedProducts = [];
    let remainingProducts = [];
    
    for (let item of cart.products) {
      if (item.quantity <= 0) {
        console.log(`El producto con ID ${item.product} tiene cantidad 0 o menor, se omite.`);
        continue; 
      }
      
      console.log("Producto en carrito:", item); 

      const product = await productDao.getById(item.product);

      if (product) {
        console.log(`Stock disponible para el producto ${product.name}: ${product.stock}`); 

        if (product.stock >= item.quantity) {
          console.log(`Suficiente stock para ${product.name}, comprando ${item.quantity}`);
          product.stock -= item.quantity;
          await product.save();

          totalAmount += product.price * item.quantity;
          purchasedProducts.push(item);
        } else {
          console.log(`No hay suficiente stock para ${product.name}, cantidad en carrito: ${item.quantity}, stock disponible: ${product.stock}`);
          remainingProducts.push(item);
        }
      } else {
        console.log(`Producto con ID ${item.product} no encontrado.`);
        remainingProducts.push(item);
      }
    }

    
    cart.products = remainingProducts;
    await cart.save();
    console.log("Carrito después de actualización:", cart);

    if (purchasedProducts.length > 0) {
      
console.log("Email del usuario:", req.user?.email);
      const ticket = await createTicket(req.user.email, totalAmount);
      return res.json({ status: "success", message: "Compra realizada", ticket, remainingProducts });
    }

    if (remainingProducts.length === cart.products.length) {
      return res.json({
        status: "error",
        message: "Todos los productos del carrito están fuera de stock",
      });
    }

    res.json({ status: "error", message: "No se pudo procesar la compra por falta de stock" });
  } catch (error) {
    console.error("Error en la compra: ", error);
    res.status(500).json({ status: "error", message: "Error en la compra" });
  }
};