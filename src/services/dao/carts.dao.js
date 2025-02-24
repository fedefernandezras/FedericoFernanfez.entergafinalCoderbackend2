import { cartModel } from '../../model/cart.model.js';
import mongoose from "mongoose";

class CartDao {
  async getAll() {
    return await cartModel.find();
  }

  async getById(id) {
    return await cartModel.findById(id).populate("products.product"); 
  }

  async create(data) {
    return await cartModel.create(data);
  }

  async update(id, data) {
    return await cartModel.findByIdAndUpdate(id, { $set: data }, { new: true });  
  }

  async delete(id) {
    return await cartModel.findByIdAndDelete(id);
  }

  async deleteProductInCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    if (!cart) throw new Error(`Carrito con id ${cid} no encontrado`);

    cart.products = cart.products.filter(
      (product) => product.product.toString() !== pid
    );
    await cart.save();

    return cart;
  }

  async deleteAllProductsInCart(cid) {
    const cart = await cartModel.findById(cid);
    if (!cart) throw new Error(`Carrito con id ${cid} no encontrado`);

    cart.products = [];
    await cart.save();

    return cart;
  }

  async updateCartProducts(cid, products) {
    const cart = await cartModel.findById(cid);
    if (!cart) throw new Error(`Carrito con id ${cid} no encontrado`);

    cart.products = products;
    await cart.save();

    return cart;
  }

  async updateProductQuantity(cid, pid, quantity) {
    const updatedCart = await cartModel.findOneAndUpdate(
      { _id: cid, "products.product": new mongoose.Types.ObjectId(pid) },  
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    );

    if (!updatedCart) {
      throw new Error(`Producto con id ${pid} no encontrado en el carrito ${cid}`);
    }

    return updatedCart;
  }
}

export const cartDao = new CartDao();