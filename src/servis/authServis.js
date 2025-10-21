import bcrypt from "bcrypt";
import { UserRepository } from "../repositoris/usuerRepository.js";

export class AuthService {
  static async register(name, email, password) {
    // tu código actual del register...
  }

  static async login(email, password) {
    try {
      const user = await UserRepository.findByEmail(email);
      if (!user) {
        return { success: false, message: "Usuario no encontrado" };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { success: false, message: "Contraseña incorrecta" };
      }

      return {
        success: true,
        message: "Inicio de sesión exitoso",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      console.error("[LOGIN ERROR]:", error.message);
      return { success: false, message: "Error al iniciar sesión" };
    }
  }
}
