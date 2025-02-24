import jwt from "jsonwebtoken";



export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: "error", message: "Usuario no autenticado" });
    }
  
    
    const token = authHeader.split(" ")[1]; 
    console.log("Token extraído:", token); 
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded); 
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ status: "error", message: "Token inválido" });
    }
  };