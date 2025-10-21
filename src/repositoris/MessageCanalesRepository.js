import { canalesMensajes } from "../model/canalesMnesages.js";

export class MessageRepository {
  // Crear un mensaje en un canal
  static async create(channelId, userId, content) {
    try {
      const nuevo = await canalesMensajes.create({
        channel: channelId,
        user: userId,
        content,
      });
      console.log(`[SERVER]: mensaje creado exitosamente`);
      return nuevo;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo crear el mensaje ${error.message}`
      );
    }
  }

  // Obtener todos los mensajes de un canal
  static async getAll(channelId) {
    try {
      const mensajes = await canalesMensajes
        .find({ channel: channelId })
        .populate("user", "name email");
      console.log(mensajes);
      return mensajes;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo traer la lista de mensajes ${error.message}`
      );
    }
  }

  // Obtener un mensaje por su ID dentro de un canal
  static async getById(messageId, channelId) {
    try {
      const mensaje = await canalesMensajes
        .findOne({ _id: messageId, channel: channelId })
        .populate("user", "name email");
      if (!mensaje) {
        console.log("[SERVER]: mensaje no encontrado en el canal");
        return null;
      }
      console.log(mensaje);
      return mensaje;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo traer el mensaje ${error.message}`
      );
    }
  }

  // Eliminar un mensaje por ID dentro de un canal
  static async deleteById(messageId, channelId) {
    try {
      const eliminado = await canalesMensajes.findOneAndDelete({
        _id: messageId,
        channel: channelId,
      });
      if (!eliminado) {
        console.log(
          "[SERVER]: mensaje no encontrado para eliminar en el canal"
        );
        return null;
      }
      console.log(`[SERVER]: mensaje eliminado del canal`);
      return eliminado;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo eliminar el mensaje ${error.message}`
      );
    }
  }

  // Actualizar un mensaje dentro de un canal
  static async updateById(messageId, channelId, data) {
    try {
      const actualizado = await canalesMensajes.findOneAndUpdate(
        { _id: messageId, channel: channelId },
        data,
        { new: true }
      );
      if (!actualizado) {
        console.log(
          "[SERVER]: mensaje no encontrado para actualizar en el canal"
        );
        return null;
      }
      console.log(`[SERVER]: mensaje actualizado`);
      return actualizado;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo actualizar el mensaje ${error.message}`
      );
    }
  }
}
