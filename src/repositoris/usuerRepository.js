import { User } from "../model/usuer.model.js";

export class UserRepository {
  static async create(name, email, password) {
    try {
      const existe = await User.findOne({ email });
      if (existe) {
        console.log(`[SERVER]: el email "${email}" ya está registrado`);
        return null; // Devuelve null si ya existe
      }

      const nuevo = await User.create({ name, email, password });
      console.log(`[SERVER]: usuario ${nuevo.name} creado exitosamente`);
      return nuevo;
    } catch (error) {
      console.error(
        "[SERVER ERROR]: no se pudo crear el usuario",
        error.message
      );
      throw error; // Re-lanzamos el error para que lo maneje el AuthService
    }
  }

  static async getAll() {
    try {
      const users = await User.find();
      console.log("[SERVER]: Lista de usuarios:", users);
      return users;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo traer la lista de usuarios ${error.message}`
      );
    }
  }

  static async getByid(user_id) {
    try {
      const user = await User.findById(user_id);
      if (user) {
        console.log(`El usuario: ${user.name} fue encontrado`);
      } else {
        console.log(`[SERVER]: no se encontró usuario con id "${user_id}"`);
      }
      return user;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo encontrar el usuario ${error.message}`
      );
    }
  }

  static async findByEmail(email) {
    try {
      const user = await User.findOne({ email });
      if (user) {
        console.log(`[SERVER]: usuario con email "${email}" encontrado`);
      } else {
        console.log(`[SERVER]: no se encontró usuario con email "${email}"`);
      }
      return user;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo buscar usuario por email ${error.message}`
      );
      throw error;
    }
  }
}
