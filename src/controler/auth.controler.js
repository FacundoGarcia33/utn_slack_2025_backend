import { AuthService } from "../servis/authServis.js";
import { UserRepository } from "../repositoris/usuerRepository.js";

class authControles {
  // 🧾 REGISTRO
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      console.log("[REGISTER BODY]:", req.body);

      // Validaciones básicas
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) return res.status(400).json({ error: "Email requerido" });
      if (!emailRegex.test(email))
        return res.status(400).json({ error: "Formato de email inválido" });
      if (!name || name.length < 3)
        return res.status(400).json({ error: "Nombre demasiado corto" });
      if (!password || password.length < 6)
        return res.status(400).json({ error: "Contraseña demasiado corta" });

      const result = await AuthService.register(name, email, password);

      if (result.success) {
        return res.status(201).json({ success: true, message: result.message });
      } else {
        return res.status(400).json({ success: false, error: result.message });
      }
    } catch (error) {
      console.error("[REGISTER ERROR]:", error.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  // 🔑 LOGIN
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log("[LOGIN BODY]:", req.body);

      const result = await AuthService.login(email, password);

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message,
          user: result.user,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: result.message || "Email o contraseña incorrectos",
        });
      }
    } catch (error) {
      console.error("[LOGIN ERROR]:", error.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async veryfiEmail(req, res) {
    try {
      const { email } = req.params;
      const user = await UserRepository.findByEmail(email);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Usuario no encontrado" });
      }

      user.veryfiedEmail = true;
      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "Email verificado correctamente" });
    } catch (error) {
      console.error("[VERIFY EMAIL ERROR]:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Error al verificar el email" });
    }
  }
}

export default authControles;
