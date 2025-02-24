import Ticket from "../model/ticket.model.js";


export const createTicket = async (purchaser, amount) => {
  try {
    console.log("Datos para el ticket:", { purchaser, amount }); 

    if (!purchaser) {
      throw new Error("El comprador (purchaser) es requerido");
    }

    const ticket = new Ticket({
      amount,
      purchaser
    });

    await ticket.save();
    return ticket;
  } catch (error) {
    console.error("Error al generar el ticket:", error);
    throw new Error("Error al generar el ticket: " + error.message);
  }
};